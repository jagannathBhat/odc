import { AUTH_UPDATE } from './types'

export const authUpdate = data => async dispatch => {
	try {
		dispatch({ payload: data, type: AUTH_UPDATE })
	} catch (err) {
		console.error(err)
	}
}
