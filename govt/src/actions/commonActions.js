import PouchDB from 'pouchdb'

import { BATCH_INIT, MARK_INIT, STUDENT_INIT, SUBJECT_INIT } from './types'
import {
	batchDBUrl,
	subjectDBUrl,
	studentDBUrl,
	markDBUrl,
} from '../components/misc/db'

// database to store all batches
const batchDB = new PouchDB(batchDBUrl)
// database to store all students
const studentDB = new PouchDB(subjectDBUrl)
// database to store all subjects
const subjectDB = new PouchDB(studentDBUrl)
// database to store all marks
const markDB = new PouchDB(markDBUrl)

// initialise all databases
batchDB.info()
studentDB.info()
subjectDB.info()
markDB.info()

// fetch all data to initialise the reducers
export const reducerInit = data => async dispatch => {
	try {
		// fetch batches
		batchDB.allDocs({ include_docs: true, attachments: true }).then(result =>
			dispatch({
				payload: result.rows.map(row => row.doc),
				type: BATCH_INIT,
			})
		)

		// fetch students
		studentDB.allDocs({ include_docs: true, attachments: true }).then(result =>
			dispatch({
				payload: result.rows.map(row => row.doc),
				type: STUDENT_INIT,
			})
		)

		// fetch subjects
		subjectDB.allDocs({ include_docs: true, attachments: true }).then(result =>
			dispatch({
				payload: result.rows.map(row => row.doc),
				type: SUBJECT_INIT,
			})
		)

		// fetch marks
		markDB.allDocs({ include_docs: true, attachments: true }).then(result =>
			dispatch({
				payload: result.rows.map(row => row.doc),
				type: MARK_INIT,
			})
		)
	} catch (err) {
		console.error(err)
	}
}
