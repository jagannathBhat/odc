import { STUDENT_INIT } from '../actions/types'

const initialState = []

export default (state = initialState, action) => {
	switch (action.type) {
		case STUDENT_INIT:
			return [...state, ...action.payload]
		default:
			return state
	}
}
