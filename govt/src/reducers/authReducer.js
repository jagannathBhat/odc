import { ACC_ADD, AUTH_UPDATE } from '../actions/types'

const initialState = {}

export default (state = initialState, { payload, type }) => {
	switch (type) {
		case ACC_ADD: {
			return { ...state, user: payload }
		}
		case AUTH_UPDATE:
			return { ...state, ...payload }
		default:
			return state
	}
}
