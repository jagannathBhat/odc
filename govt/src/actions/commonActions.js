import { AUTH_UPDATE, USER_ADD, USER_INIT } from './types'
import {
	dbAllDocs,
	dbPost,
	getUserType,
	TYPE_SCHOOL,
} from '../components/misc/db'
import store from '../store'

const exitApp = () => window.location.assign('/')

// fetch all data to initialise the reducers
export const reducerInit = () => async dispatch => {
	try {
		// fetch and store data
		dbAllDocs({ attachments: true, include_docs: true }).then(({ rows }) =>
			dispatch({ payload: rows.map(row => row.doc), type: USER_INIT })
		)
	} catch (err) {
		console.error(err)
	}
}

// function to initialise user info
export const userInit = () => async dispatch => {
	try {
		const username = store.getState().auth.username
		if (getUserType(username) === TYPE_SCHOOL) exitApp()

		const docs = store.getState().user

		for (let i in docs)
			if (docs[i].username === username) {
				dispatch({ payload: { user: docs[i] }, type: AUTH_UPDATE })
				return
			}

		for (let i in docs)
			if (docs[i].accounts.includes(username)) {
				let data = {
					accounts: [],
					type: getUserType(username),
					username,
				}

				const result = await dbPost(data)
				data = { ...data, id: result.id, rev: result.rev }
				dispatch({ payload: data, type: USER_ADD })
				dispatch({ payload: { user: data }, type: AUTH_UPDATE })
				return
			}
		exitApp()
	} catch (err) {
		console.error(err)
	}
}
