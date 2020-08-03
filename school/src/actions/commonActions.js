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
	dbAllDocs,
	dbPost,
	TYPE_BATCH,
	TYPE_STUDENT,
	TYPE_SUBJECT,
	TYPE_MARK,
} from '../components/misc/db'

// action to add a batch
export const batchAdd = data => async dispatch => {
	try {
		const batchData = { name: data.batch, type: TYPE_BATCH }

		// add batch info to batch database
		dbPost(batchData).then(res => {
			const batchID = res.id

			// add batch info to batch reducer
			dispatch({
				payload: { ...batchData, _id: batchID, _rev: res.rev },
				type: BATCH_ADD,
			})

			// add student info to student database
			if (data.student && data.student.length > 0)
				data.student.map((student, index) => {
					const studentData = {
						batch: batchID,
						name: student,
						rollno: index + 1,
						type: TYPE_STUDENT,
					}

					return dbPost(studentData).then(res =>
						// add student info to student reducer
						dispatch({
							payload: { ...studentData, _id: res.id, _rev: res.rev },
							type: STUDENT_ADD,
						})
					)
				})

			// add subject info to subject database
			if (data.subject && data.subject.length > 0)
				data.subject.map(subject => {
					const subjectData = {
						batch: batchID,
						name: subject,
						type: TYPE_SUBJECT,
					}

					return dbPost(subjectData).then(res =>
						// add subject info to subject reducer
						dispatch({
							payload: { ...subjectData, _id: res.id, _rev: res.rev },
							type: SUBJECT_ADD,
						})
					)
				})
		})
	} catch (err) {
		console.error(err)
	}
}

// fetch all data to initialise the reducers
export const reducerInit = data => async dispatch => {
	try {
		// reducers
		const reducers = [
			{ action: BATCH_INIT, type: TYPE_BATCH },
			{ action: MARK_INIT, type: TYPE_MARK },
			{ action: STUDENT_INIT, type: TYPE_STUDENT },
			{ action: SUBJECT_INIT, type: TYPE_SUBJECT },
		]

		// fetch and store data
		dbAllDocs({ attachments: true, include_docs: true }).then(result => {
			for (let i in reducers) {
				const payload = result.rows
					.filter(row => row.doc.type === reducers[i].type)
					.map(row => row.doc)
				dispatch({ payload, type: reducers[i].action })
			}
		})
	} catch (err) {
		console.error(err)
	}
}
