import { BATCH_ADD } from '../actions/types'

const initialState = []

export default (state = initialState, action) => {
	switch (action.type) {
		case BATCH_ADD:
			return [...state, action.payload]
		default:
			return state
	}
}
