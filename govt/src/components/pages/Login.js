import React, { useEffect, useState } from 'react'
import { Typography } from '@material-ui/core'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Form from '../form/Form'
import { authUpdate } from '../../actions/authActions'
import { reducerInit } from '../../actions/commonActions'
import { useStyles } from '../../theme'
import { dbSync } from '../misc/db'

const Login = ({ authUpdate, history, reducerInit }) => {
	const [data, setData] = useState({})

	const classes = useStyles()

	const inputHandler = ({ target: { name, value } }) =>
		setData({ ...data, [name]: value })

	useEffect(() => {
		dbSync()
		reducerInit()
		// eslint-disable-next-line
	}, [])

	const inputs = [
		{
			autofocus: true,
			handler: inputHandler,
			label: 'Username',
			name: 'username',
		},
		{
			handler: inputHandler,
			label: 'Password',
			name: 'password',
			type: 'password',
		},
	]

	const submitHandler = () => {
		authUpdate(data)
		history.push('/dashboard')
	}

	return (
		<div className={classes.centerizer}>
			<Typography component='h1' variant='h4'>
				ODC Portal for Govt. Officials
			</Typography>
			<Form data={data} inputs={inputs} submitHandler={submitHandler} />
		</div>
	)
}

export default connect(null, { authUpdate, reducerInit })(withRouter(Login))
