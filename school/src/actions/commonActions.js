import PouchDB from 'pouchdb'

import {
	BATCH_ADD,
	BATCH_INIT,
	MARK_INIT,
	STUDENT_ADD,
	STUDENT_INIT,
	SUBJECT_ADD,
	SUBJECT_INIT,
} from './types'
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

// action to add a batch
export const batchAdd = data => async dispatch => {
	try {
		// add batch info to batch database
		batchDB.post({ name: data.batch }).then(res => {
			const batchID = res.id
			// add batch info to batch reducer
			dispatch({
				payload: { name: data.batch, _id: batchID, _rev: res.rev },
				type: BATCH_ADD,
			})
			// add student info to student database
			if (data.student && data.student.length > 0)
				data.student.map((student, index) =>
					studentDB
						.post({ batch: batchID, name: student, rollno: index + 1 })
						.then(res =>
							// add student info to student reducer
							dispatch({
								payload: {
									batch: batchID,
									name: student,
									rollno: index + 1,
									_id: res.id,
									_rev: res.rev,
								},
								type: STUDENT_ADD,
							})
						)
				)
			// add subject info to subject database
			if (data.subject && data.subject.length > 0)
				data.subject.map((subject, index) =>
					subjectDB.post({ batch: batchID, name: subject }).then(res =>
						// add subject info to subject reducer
						dispatch({
							payload: {
								batch: batchID,
								name: subject,
								_id: res.id,
								_rev: res.rev,
							},
							type: SUBJECT_ADD,
						})
					)
				)
		})
	} catch (err) {
		console.error(err)
	}
}

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
