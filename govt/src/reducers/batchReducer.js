import { BATCH_INIT } from '../actions/types'

const initialState = []

export default (state = initialState, action) => {
	switch (action.type) {
		case BATCH_INIT:
			return action.payload
		default:
			return state
	}
}
