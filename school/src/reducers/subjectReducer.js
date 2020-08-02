import { SUBJECT_ADD, SUBJECT_INIT } from '../actions/types'

const initialState = []

export default (state = initialState, action) => {
	switch (action.type) {
		case SUBJECT_ADD:
			return [...state, action.payload]
		case SUBJECT_INIT:
			return action.payload
		default:
			return state
	}
}
