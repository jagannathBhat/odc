import React, { useState } from 'react'
import { makeStyles, Typography } from '@material-ui/core'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import BackButton from '../misc/BackButton.js'
import Form from '../form/Form.js'
import { marksAdd } from '../../actions/marksActions.js'
import { useStyles } from '../../theme'

const MarksAdd = ({ batch, history, subject, student, marksAdd }) => {
	const [data, setData] = useState({ marks: [] })

	const classes = useStyles()

	const localClasses = useLocalStyles()

	const inputHandler = ({ target: { name, value } }) =>
		setData({ ...data, [name]: value })

	const markHandler = (id, value) => {
		const copyData = { ...data }
		let flag = true
		for (let i in copyData.marks)
			if (copyData.marks[i].student === id) {
				copyData.marks[i].mark = value
				flag = false
			}
		if (flag) copyData.marks.push({ student: id, mark: value })
		setData(copyData)
	}

	const submitHandler = () => {
		marksAdd(data)
		history.push('/')
	}

	const inputs = [
		{
			autofocus: true,
			handler: inputHandler,
			label: 'Select Batch',
			name: 'batch',
			options: batch.map(item => ({ label: item.name, value: item._id })),
			type: 'select',
		},
		{
			handler: inputHandler,
			label: 'Select Subject',
			name: 'subject',
			options: data.batch
				? subject
						.filter(item => item.batch === data.batch)
						.map(item => ({ label: item.name, value: item._id }))
				: [],
			type: 'select',
		},
		{
			handler: inputHandler,
			label: 'Test/Assignment Name',
			name: 'test',
		},
		{
			data: student
				.filter(item => item.batch === data.batch)
				.map(item => ({ id: item._id, name: item.name })),
			handler: markHandler,
			label: 'Enter Marks',
			name: 'marks',
			type: 'array',
		},
	]

	return (
		<div className={classes.page}>
			<BackButton className={localClasses.backButton} history={history} />
			<Typography component='h1' variant='h4'>
				Add Marks
			</Typography>
			<Form data={data} inputs={inputs} submitHandler={submitHandler} />
		</div>
	)
}

const mapStatesToProps = state => ({
	batch: state.batch,
	student: state.student,
	subject: state.subject,
})

const useLocalStyles = makeStyles(theme => ({
	backButton: {
		margin: theme.spacing(3) + 'px 0px',
	},
}))

export default connect(mapStatesToProps, { marksAdd })(withRouter(MarksAdd))
