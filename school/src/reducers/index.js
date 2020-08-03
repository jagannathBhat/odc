import { combineReducers } from 'redux'

import batchReducer from './batchReducer'
import markReducer from './markReducer'
import statusReducer from './statusReducer'
import studentReducer from './studentReducer'
import subjectReducer from './subjectReducer'

export default combineReducers({
	batch: batchReducer,
	mark: markReducer,
	status: statusReducer,
	student: studentReducer,
	subject: subjectReducer,
})
