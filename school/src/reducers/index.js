import { combineReducers } from 'redux'

import batchReducer from './batchReducer'
import studentReducer from './studentReducer'
import subjectReducer from './subjectReducer'
import markReducer from './markReducer'

export default combineReducers({
	batch: batchReducer,
	student: studentReducer,
	subject: subjectReducer,
	mark: markReducer,
})
