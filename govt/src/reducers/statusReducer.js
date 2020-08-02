import { STATUS_UPDATE } from '../actions/types'

const initialState = []

export default (state = initialState, action) => {
	switch (action.type) {
		case STATUS_UPDATE:
			return [...state, action.payload]
		default:
			return state
	}
}
