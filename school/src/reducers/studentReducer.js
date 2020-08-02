import { STUDENT_ADD } from '../actions/types'

const initialState = []

export default (state = initialState, action) => {
	switch (action.type) {
		case STUDENT_ADD:
			return [...state, action.payload]
		default:
			return state
	}
}
