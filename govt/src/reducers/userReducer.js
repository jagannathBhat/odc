import { ACC_ADD, USER_ADD, USER_INIT } from '../actions/types'

const initialState = []

export default (state = initialState, { payload, type }) => {
	switch (type) {
		case ACC_ADD: {
			return [
				state.map(user => {
					if (user._id === payload._id) return payload
					return user
				}),
			]
		}
		case USER_ADD:
			return [...state, payload]
		case USER_INIT:
			return payload
		default:
			return state
	}
}
