import { AUTH_UPDATE, USER_INIT } from './types'
import { dbAllDocs } from '../components/misc/db'
import store from '../store'

// fetch all data to initialise the reducers
export const reducerInit = () => async dispatch => {
	try {
		// fetch and store data
		dbAllDocs({ attachments: true, include_docs: true }).then(result => {
			dispatch({
				payload: result.rows.map(row => row.doc),
				type: USER_INIT,
			})

			const user = result.rows.filter(
				row => row.doc.username === store.getState().auth.username
			)[0].doc
			dispatch({
				payload: { user },
				type: AUTH_UPDATE,
			})
		})
	} catch (err) {
		console.error(err)
	}
}
