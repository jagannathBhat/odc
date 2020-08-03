import React from 'react'
import { Typography } from '@material-ui/core'
import { connect } from 'react-redux'

const MarkList = ({ id, student, test }) => {
	const getTest = () => {
		let marks = []
		for (let i in test)
			if (test[i]._id === id) {
				marks = test[i].marks
				break
			}
		return marks.map(mark => {
			for (let i in student)
				if (student[i]._id === mark.student)
					return { ...mark, name: student[i].name }
			return mark
		})
	}

	return (
		<>
			{getTest().length > 0 && (
				<Typography component='p' style={{ marginTop: 48 }} variant='h5'>
					Marks
				</Typography>
			)}
			{getTest().map(({ name, mark }) => (
				<Typography component='p' variant='body1'>
					{name}: {mark}
				</Typography>
			))}
		</>
	)
}

const mapStatesToProps = state => ({
	student: state.student,
	test: state.test,
})

export default connect(mapStatesToProps)(MarkList)
