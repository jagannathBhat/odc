import React from 'react'
import { Typography } from '@material-ui/core'
import { connect } from 'react-redux'

const MarkList = ({ id, mark, student }) => {
	const getMark = () => {
		let marks = []
		for (let i in mark)
			if (mark[i]._id === id) {
				marks = mark[i].marks
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
			{getMark().length > 0 && (
				<Typography component='p' style={{ marginTop: 48 }} variant='h5'>
					Marks
				</Typography>
			)}
			{getMark().map(({ name, mark }) => (
				<Typography component='p' variant='body1'>
					{name}: {mark}
				</Typography>
			))}
		</>
	)
}

const mapStatesToProps = state => ({
	student: state.student,
	mark: state.mark,
})

export default connect(mapStatesToProps)(MarkList)
