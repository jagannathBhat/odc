import {
	AUTH_UPDATE,
	BATCH_INIT,
	MARK_INIT,
	STUDENT_INIT,
	SUBJECT_INIT,
	USER_ADD,
	USER_INIT,
} from './types'
import {
	dbAllDocs,
	dbPost,
	dbSync,
	getUserType,
	TYPE_BATCH,
	TYPE_SCHOOL,
	TYPE_STUDENT,
	TYPE_SUBJECT,
	TYPE_MARK,
} from '../components/misc/db'
import store from '../store'

// exit the dashboard to login
const exitApp = () => window.location.assign('/')

// find all schools that come under an account
const findSchools = (accounts, docs) => {
	if (accounts.length === 0) return []

	const user = findUser(docs, accounts.shift())
	if (user) {
		if (user.type === TYPE_SCHOOL) {
			accounts.unshift(user.username)
			return accounts
		}
		accounts.push(...user.accounts)
	}

	return findSchools(accounts, docs)
}

// find user doc with username
const findUser = (docs, username) => {
	for (let i in docs) if (docs[i].username === username) return docs[i]
	return null
}

// fetch all data to initialise user reducer
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

// fetch all data to initialise the school reducers
const schoolReducerInit = (dispatch, school) => {
	try {
		console.log(school)
		// reducers for school data
		const reducers = [
			{ action: BATCH_INIT, type: TYPE_BATCH },
			{ action: MARK_INIT, type: TYPE_MARK },
			{ action: STUDENT_INIT, type: TYPE_STUDENT },
			{ action: SUBJECT_INIT, type: TYPE_SUBJECT },
		]

		// fetch and store data
		dbAllDocs({ attachments: true, include_docs: true }, school).then(
			result => {
				console.log(result)
				for (let i in reducers) {
					const payload = result.rows
						.filter(row => row.doc.type === reducers[i].type)
						.map(row => row.doc)
					dispatch({ payload, type: reducers[i].action })
				}
			}
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
		const user = findUser(docs, username)

		if (user) {
			dispatch({ payload: { user }, type: AUTH_UPDATE })
			const schools = findSchools([...user.accounts], docs)
			for (let i in schools) {
				schoolReducerInit(dispatch, schools[i])
				dbSync(schools[i])
			}
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
				data = { ...data, _id: result.id, _rev: result.rev }
				dispatch({ payload: data, type: USER_ADD })
				dispatch({ payload: { user: data }, type: AUTH_UPDATE })
				return
			}
		exitApp()
	} catch (err) {
		console.error(err)
	}
}
