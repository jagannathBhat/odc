import React, { useState } from 'react'
import { makeStyles, Typography } from '@material-ui/core'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import BackButton from '../misc/BackButton.js'
import Form from '../form/Form.js'
import MarkList from '../test/MarkList.js'
import { batchAdd } from '../../actions/commonActions.js'
import { useStyles } from '../../theme'

const MarksView = ({ batch, batchAdd, history, subject, test }) => {
	const [data, setData] = useState({})

	const classes = useStyles()

	const localClasses = useLocalStyles()

	const inputHandler = ({ target: { name, value } }) =>
		setData({ ...data, [name]: value })

	const submitHandler = () => {
		batchAdd(data)
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
			label: 'Select Test/Assignment',
			name: 'test',
			options: data.subject
				? test
						.filter(item => item.subject === data.subject)
						.map(item => ({ label: item.name, value: item._id }))
				: [],
			type: 'select',
		},
	]

	return (
		<div className={classes.page}>
			<BackButton className={localClasses.backButton} history={history} />
			<Typography component='h1' variant='h4'>
				View Marks
			</Typography>
			<Form
				data={data}
				hideSubmit={true}
				inputs={inputs}
				submitHandler={submitHandler}
			/>
			<MarkList id={data.test} />
		</div>
	)
}

const mapStatesToProps = state => ({
	batch: state.batch,
	subject: state.subject,
	test: state.test,
})

const useLocalStyles = makeStyles(theme => ({
	backButton: {
		margin: theme.spacing(3) + 'px 0px',
	},
}))

export default connect(mapStatesToProps, { batchAdd })(withRouter(MarksView))
