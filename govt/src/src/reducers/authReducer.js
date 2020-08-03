import { AUTH_UPDATE } from '../actions/types'

const initialState = {}

export default (state = initialState, action) => {
	switch (action.type) {
		case AUTH_UPDATE:
			return { ...state, ...action.payload }
		default:
			return state
	}
}
