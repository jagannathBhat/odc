import PouchDB from 'pouchdb'

import { MARK_ADD } from './types'
import { markDBUrl } from '../components/misc/db'

// database to store all marks
const markDB = new PouchDB(markDBUrl)

// initialise database
markDB.info()

// action to add a mark
export const marksAdd = ({ marks, subject, test }) => async dispatch => {
	try {
		markDB
			.post({ name: test, subject: subject, marks: [...marks] })
			.then(res => {
				// add student info to student reducer
				dispatch({
					payload: {
						name: test,
						subject: subject,
						marks: [...marks],
						_id: res.id,
						_rev: res.rev,
					},
					type: MARK_ADD,
				})
			})
	} catch (err) {
		console.error(err)
	}
}
