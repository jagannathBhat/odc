import React, { useEffect, useState } from 'react'
import { makeStyles, Typography } from '@material-ui/core'
import { connect } from 'react-redux'

import Form from '../form/Form.js'
import MarksView from './MarksView'
import { userInit } from '../../actions/commonActions.js'
import { userAdd } from '../../actions/userActions.js'
import { useStyles } from '../../theme'

const temp = [1, 2, 3, 4, 5, 6, 7]

const Dashboard = ({ auth, userInit, userAdd }) => {
	const [data, setData] = useState({})

	const classes = useStyles()

	const localClasses = useLocalStyles()

	const inputHandler = ({ target: { name, value } }) =>
		setData({ ...data, [name]: value })

	const submitHandler = () => {
		userAdd(data)
		setData({})
	}

	useEffect(() => {
		userInit()
		// eslint-disable-next-line
	}, [])

	const inputs = [
		{
			autofocus: true,
			handler: inputHandler,
			label: 'New Account',
			name: 'username',
		},
	]

	return (
		<div className={classes.page + ' ' + localClasses.root}>
			<div className={localClasses.header}>
				<Typography component='h1' variant='h4'>
					Govt. Official Name
				</Typography>
				<Typography component='p' variant='subtitle1'>
					{auth.username.startsWith('s')
						? 'State Level'
						: auth.username.startsWith('b')
						? 'Block Level'
						: 'District Level'}
				</Typography>
			</div>
			<div className={localClasses.col}>
				<Typography component='h1' variant='h5'>
					Recent Activities
				</Typography>
				{temp.map((num, index) => (
					<div className={localClasses.activity} key={index}>
						<Typography component='p' variant='body1'>
							Marks for Test {num} - Subject Name was added to Batch Name on
							Date, Time.
						</Typography>
					</div>
				))}
				<Typography component='h1' variant='h5'>
					Accounts under management
				</Typography>
				<Typography component='p' variant='body1'>
					{auth.user &&
						auth.user.accounts &&
						auth.user.accounts.map((item, index) =>
							index > 0 ? `, ${item}` : item
						)}
				</Typography>
				<Form data={data} inputs={inputs} submitHandler={submitHandler} />
			</div>
			<div className={localClasses.col}>
				<MarksView />
			</div>
		</div>
	)
}

const useLocalStyles = makeStyles(theme => ({
	activity: { margin: theme.spacing(2) },
	col: {
		display: 'inline-block',
		verticalAlign: 'top',
		width: '48%',
	},
	header: { marginBottom: theme.spacing(4) },
	root: { width: '100%' },
}))

const mapStatesToProps = state => ({ auth: state.auth })

export default connect(mapStatesToProps, { userInit, userAdd })(Dashboard)
