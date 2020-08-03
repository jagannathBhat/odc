import { combineReducers } from 'redux'

import authReducer from './authReducer'
import batchReducer from './batchReducer'
import markReducer from './markReducer'
import statusReducer from './statusReducer'
import studentReducer from './studentReducer'
import subjectReducer from './subjectReducer'
import userReducer from './userReducer'

export default combineReducers({
	auth: authReducer,
	batch: batchReducer,
	mark: markReducer,
	status: statusReducer,
	student: studentReducer,
	subject: subjectReducer,
	user: userReducer,
})
