import store from '../store'
import { dbPut } from '../components/misc/db'
import { ACC_ADD } from './types'

// action to add a user
export const userAdd = ({ username }) => async dispatch => {
	try {
		let user = store.getState().auth.user
		const accounts = [...user.accounts, username]
		user = { ...user, accounts }
		dbPut(user).then(result => {
			dispatch({
				payload: { ...user, _rev: result.rev },
				type: ACC_ADD,
			})
		})
	} catch (err) {
		console.error(err)
	}
}
