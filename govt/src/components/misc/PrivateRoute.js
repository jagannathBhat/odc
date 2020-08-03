import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({ auth, ...props }) => (
	<>{auth.username ? <Route {...props} /> : <Redirect to='/' />}</>
)

const mapStateToProps = state => ({ auth: state.auth })

export default connect(mapStateToProps)(PrivateRoute)
