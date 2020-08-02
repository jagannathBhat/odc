import { STUDENT_ADD, STUDENT_INIT } from '../actions/types'

const initialState = []

export default (state = initialState, action) => {
	switch (action.type) {
		case STUDENT_ADD:
			return [...state, action.payload]
		case STUDENT_INIT:
			return action.payload
		default:
			return state
	}
}
