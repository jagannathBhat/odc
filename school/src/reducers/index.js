import { combineReducers } from 'redux'

import batchReducer from './batchReducer'
import studentReducer from './studentReducer'
import subjectReducer from './subjectReducer'
import testReducer from './testReducer'

export default combineReducers({
	batch: batchReducer,
	student: studentReducer,
	subject: subjectReducer,
	test: testReducer,
})
