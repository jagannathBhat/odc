// import { USER_INIT } from './types'
import { dbAllDocs } from '../components/misc/db'

// fetch all data to initialise the reducers
export const reducerInit = () => async dispatch => {
	try {
		// fetch and store data
		dbAllDocs({ attachments: true, include_docs: true }).then(result =>
			console.log(result)
		)
	} catch (err) {
		console.error(err)
	}
}
