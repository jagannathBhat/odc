import { MARK_ADD } from './types'
import { dbPost, TYPE_MARK } from '../components/misc/db'

// action to add a mark
export const marksAdd = ({ marks, subject, test }) => async dispatch => {
	try {
		const data = {
			marks: [...marks],
			name: test,
			subject: subject,
			type: TYPE_MARK,
		}

		dbPost(data).then(res => {
			// add student info to student reducer
			dispatch({
				payload: { ...data, _id: res.id, _rev: res.rev },
				type: MARK_ADD,
			})
		})
	} catch (err) {
		console.error(err)
	}
}
