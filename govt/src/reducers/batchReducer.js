import { BATCH_INIT } from '../actions/types'

const initialState = []

export default (state = initialState, action) => {
	switch (action.type) {
		case BATCH_INIT:
			return [...state, ...action.payload]
		default:
			return state
	}
}
