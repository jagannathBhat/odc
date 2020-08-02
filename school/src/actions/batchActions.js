import PouchDB from 'pouchdb'

import { BATCH_ADD, STUDENT_ADD, SUBJECT_ADD } from './types'

// database to store all batches
const batchDB = new PouchDB('batch')
// database to store all students
const studentDB = new PouchDB('student')
// database to store all subjects
const subjectDB = new PouchDB('subject')

// initialise all databases
batchDB.info()
studentDB.info()
subjectDB.info()

// action to add a batch
export const batchAdd = data => async dispatch => {
	try {
		// add batch info to batch database
		batchDB.post({ name: data.batch }).then(res => {
			const batchID = res.id
			// add batch info to batch reducer
			dispatch({
				type: BATCH_ADD,
				payload: { name: data.batch, _id: batchID, _rev: res.rev },
			})
			// add student info to student database
			data.student.map((student, index) =>
				studentDB
					.post({ batch: batchID, name: student, rollno: index + 1 })
					.then(res =>
						// add student info to student reducer
						dispatch({
							type: STUDENT_ADD,
							payload: {
								batch: batchID,
								name: student,
								rollno: index + 1,
								_id: res.id,
								_rev: res.rev,
							},
						})
					)
			)
			// add subject info to subject database
			data.subject.map((subject, index) =>
				subjectDB.post({ batch: batchID, name: subject }).then(res =>
					// add subject info to subject reducer
					dispatch({
						type: SUBJECT_ADD,
						payload: {
							batch: batchID,
							name: subject,
							_id: res.id,
							_rev: res.rev,
						},
					})
				)
			)
		})
	} catch (err) {
		console.error(err)
	}
}
