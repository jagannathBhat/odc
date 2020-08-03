import React, { useState } from 'react'
import { Typography } from '@material-ui/core'
import { connect } from 'react-redux'

import Form from '../form/Form.js'
import MarkList from '../mark/MarkList.js'

const MarksView = ({ batch, mark, subject }) => {
	const [data, setData] = useState({})

	const inputHandler = ({ target: { name, value } }) =>
		setData({ ...data, [name]: value })

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
			label: 'Select Test/Assignment',
			name: 'test',
			options: data.subject
				? mark
						.filter(item => item.subject === data.subject)
						.map(item => ({ label: item.name, value: item._id }))
				: [],
			type: 'select',
		},
	]

	return (
		<>
			<Typography component='h1' variant='h5'>
				View Marks
			</Typography>
			<Form data={data} hideSubmit={true} inputs={inputs} />
			<MarkList id={data.test} />
		</>
	)
}

const mapStatesToProps = state => ({
	batch: state.batch,
	subject: state.subject,
	mark: state.mark,
})

export default connect(mapStatesToProps)(MarksView)
