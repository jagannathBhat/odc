import { TEST_ADD, TEST_INIT } from '../actions/types'

const initialState = []

export default (state = initialState, action) => {
	switch (action.type) {
		case TEST_ADD:
			return [...state, action.payload]
		case TEST_INIT:
			return action.payload
		default:
			return state
	}
}
