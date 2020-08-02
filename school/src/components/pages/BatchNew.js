import React, { useState } from 'react'
import { Typography } from '@material-ui/core'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Form from '../form/Form.js'
import { batchAdd } from '../../actions/commonActions.js'
import { useStyles } from '../../theme'

const BatchNew = ({ batchAdd, history }) => {
	const [data, setData] = useState({})

	const classes = useStyles()

	const inputHandler = ({ target: { name, value } }) =>
		setData({ ...data, [name]: value })

	const studentAddHandler = () => {
		if (!data.student) setData({ ...data, student: [''] })
		else setData({ ...data, student: [...data.student, ''] })
	}

	const studentEditHandler = (index, value) => {
		const copyData = { ...data }
		copyData.student[index] = value
		setData(copyData)
	}

	const subjectAddHandler = () => {
		if (!data.subject) setData({ ...data, subject: [''] })
		else setData({ ...data, subject: [...data.subject, ''] })
	}

	const subjectEditHandler = (index, value) => {
		const copyData = { ...data }
		copyData.subject[index] = value
		setData(copyData)
	}

	const submitHandler = () => {
		batchAdd(data)
		history.push('/')
	}

	const inputs = [
		{
			autofocus: true,
			handler: inputHandler,
			label: 'Batch Name',
			name: 'batch',
		},
		{
			handler: {
				item: subjectEditHandler,
				new: subjectAddHandler,
			},
			label: 'Subjects',
			name: 'subject',
			type: 'list',
		},
		{
			handler: {
				item: studentEditHandler,
				new: studentAddHandler,
			},
			label: 'Students',
			name: 'student',
			type: 'list',
		},
	]

	return (
		<div className={classes.page}>
			<Typography component='h1' variant='h4'>
				Add New Batch
			</Typography>
			<Form data={data} inputs={inputs} submitHandler={submitHandler} />
		</div>
	)
}

export default connect(null, { batchAdd })(withRouter(BatchNew))
