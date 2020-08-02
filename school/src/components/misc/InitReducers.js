import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { reducerInit } from '../../actions/commonActions.js'

const InitReducers = ({ reducerInit }) => {
	useEffect(() => {
		reducerInit()
		// eslint-disable-next-line
	}, [])
	return <></>
}

export default connect(null, { reducerInit })(InitReducers)
