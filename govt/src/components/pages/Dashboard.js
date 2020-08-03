import React from 'react'
import { Button, makeStyles, Typography } from '@material-ui/core'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import MarksView from './MarksView'
import { useStyles } from '../../theme'

const temp = [1, 2, 3, 4, 5, 6, 7]

const Dashboard = ({ auth }) => {
	const localClasses = useLocalStyles()

	const classes = useStyles()

	return (
		<div className={classes.page + ' ' + localClasses.root}>
			<div className={localClasses.header}>
				<Typography component='h1' variant='h4'>
					Govt. Official Name
				</Typography>
				<Typography component='p' variant='subtitle1'>
					{auth.username.startsWith('s')
						? 'State Level'
						: auth.username.startsWith('d')
						? 'District Level'
						: 'Block Level'}
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
				<Link className={localClasses.button} to='/marks/view'>
					<Button color='primary'>View All Entries</Button>
				</Link>
			</div>
			<div className={localClasses.col}>
				<MarksView />
			</div>
		</div>
	)
}

const useLocalStyles = makeStyles(theme => ({
	activity: { margin: theme.spacing(2) },
	button: { display: 'block', textAlign: 'center' },
	col: {
		display: 'inline-block',
		verticalAlign: 'top',
		width: '48%',
	},
	header: { marginBottom: theme.spacing(4) },
	root: { width: '100%' },
}))

const mapStatesToProps = state => ({ auth: state.auth })

export default connect(mapStatesToProps)(Dashboard)
