import PouchDB from 'pouchdb'

import { TEST_ADD } from './types'
import { testDBUrl } from '../components/misc/db'

// database to store all tests
const testDB = new PouchDB(testDBUrl)

// initialise database
testDB.info()

// action to add a test
export const marksAdd = data => async dispatch => {
	try {
		testDB
			.post({ name: data.test, subject: data.subject, marks: [...data.marks] })
			.then(res => {
				// add student info to student reducer
				dispatch({
					payload: {
						name: data.test,
						subject: data.subject,
						marks: [...data.marks],
						_id: res.id,
						_rev: res.rev,
					},
					type: TEST_ADD,
				})
			})
	} catch (err) {
		console.error(err)
	}
}
