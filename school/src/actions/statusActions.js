import { STATUS_UPDATE } from './types'

export const statusUpdate = data => async dispatch => {
	try {
		dispatch({
			payload: data,
			type: STATUS_UPDATE,
		})
	} catch (err) {
		console.error(err)
	}
}
