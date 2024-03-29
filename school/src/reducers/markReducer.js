import { MARK_ADD, MARK_INIT } from '../actions/types'

const initialState = []

export default (state = initialState, action) => {
	switch (action.type) {
		case MARK_ADD:
			return [...state, action.payload]
		case MARK_INIT:
			return action.payload
		default:
			return state
	}
}
