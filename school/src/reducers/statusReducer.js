import { STATUS_PAUSE, STATUS_UPDATE } from '../actions/types'

const initialState = []

export default (state = initialState, action) => {
	switch (action.type) {
		// case STATUS_PAUSE: {
		// 	switch (state.message) {
		// 		case 'Loading':
		// 		case 'Server Offline':
		// 			return { ...state, message: 'Server Offline' }
		// 		case 'Syncing':
		// 			return {
		// 				...state,
		// 				message: 'Sync Complete',
		// 				last: 'Last Synced on ' + Date.now(),
		// 			}
		// 		default:
		// 			return state
		// 	}
		// }
		case STATUS_UPDATE:
			return [...state, action.payload]
		default:
			return state
	}
}
