import { getDate } from '../actions/commonActions'
import { STATUS_UPDATE } from '../actions/types'

const initialState = {
	last: [],
	message: 'Loading Sync Status',
}

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case STATUS_UPDATE: {
			const copyState = state
			if (copyState.last.length === 5) copyState.last.shift()
			copyState.last.push(payload)

			if (payload === 'pause' && state.message === 'Loading Sync Status') {
				copyState.message = localStorage.getItem('saveDate')
					? 'Last Synced ' + getDate(localStorage.getItem('saveDate'))
					: 'Server Offline'
			}
			if (payload === 'change') {
				copyState.message = 'Last Synced ' + getDate(Date())
				localStorage.setItem('changes', 'online')
				localStorage.setItem('saveDate', Date())
			}

			return { ...copyState }
		}
		default:
			return state
	}
}
