import React, { useEffect, Fragment } from 'react'
import {
	Button,
	Card,
	CardContent,
	CardActionArea,
	makeStyles,
	Typography,
} from '@material-ui/core'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { reducerInit } from '../../actions/commonActions.js'
import { dbSync } from '../misc/db'

const temp = [0, 1, 2, 3, 4, 5, 6]

const Dashboard = ({ auth, status }) => {
	const localClasses = useLocalStyles()

	useEffect(() => {
		reducerInit()
		dbSync()
		// eslint-disable-next-line
	}, [])

	return (
		<div className={localClasses.gridContainer}>
			<div className={localClasses.title}>
				<Typography component='h1' variant='h4'>
					School Name
				</Typography>
				<Typography color='textSecondary' component='p' variant='subtitle1'>
					{auth.username}. District Name
				</Typography>
			</div>
			<Link className={localClasses.link} to='/marks/add'>
				<Card className={localClasses.addMarks + ' ' + localClasses.card}>
					<CardActionArea className={localClasses.cardAction}>
						<CardContent>
							<Typography color='secondary' component='h1' variant='h5'>
								Add Marks
							</Typography>
						</CardContent>
					</CardActionArea>
				</Card>
			</Link>
			<Link className={localClasses.link} to='/batch/new'>
				<Card className={localClasses.addBatch + ' ' + localClasses.card}>
					<CardActionArea className={localClasses.cardAction}>
						<CardContent>
							<Typography color='secondary' component='h1' variant='h5'>
								Add Batch
							</Typography>
						</CardContent>
					</CardActionArea>
				</Card>
			</Link>
			<div className={localClasses.status}>
				<Typography component='h1' variant='h5'>
					Status
				</Typography>
				<Typography color='textSecondary' component='p' variant='body1'>
					{status.map((item, index) => (
						<Fragment key={index}>
							{item}
							<br />
						</Fragment>
					))}
				</Typography>
			</div>
			<div className={localClasses.recent}>
				<Typography component='h1' variant='h5'>
					Recent Activities
				</Typography>
				{temp.map((num, index) => (
					<div className={localClasses.activity} key={index}>
						<Typography component='p' variant='body1'>
							Marks for Test {num + 1} - Subject Name was added to Batch Name on
							Date, Time.
						</Typography>
					</div>
				))}
				<Link
					className={localClasses.button + ' ' + localClasses.link}
					to='/marks/view'
				>
					<Button color='primary'>View All Entries</Button>
				</Link>
			</div>
		</div>
	)
}

const useLocalStyles = makeStyles(theme => ({
	activity: { margin: theme.spacing(2) },
	addBatch: { gridArea: 'addBatch' },
	addMarks: { gridArea: 'addMarks' },
	button: { display: 'block', textAlign: 'center' },
	card: {
		alignItems: 'center',
		display: 'flex',
		height: '100%',
		justifyContent: 'center',
	},
	cardAction: { display: 'flex', flex: 1, height: '100%' },
	gridContainer: {
		display: 'grid',
		gridTemplateColumns: '1fr 1fr 1fr',
		gridTemplateRows: '1fr 2fr 2fr 2fr',
		gap: theme.spacing(2) + 'px ' + theme.spacing(2) + 'px',
		gridTemplateAreas:
			'"title title title" "addMarks recent recent" "addBatch recent recent" "status recent recent"',
		padding: theme.spacing(3),
		width: '100%',
	},
	link: { textDecoration: 'none' },
	recent: { gridArea: 'recent' },
	status: { gridArea: 'status' },
	title: { gridArea: 'title' },
}))

const mapStatesToProps = state => ({ auth: state.auth, status: state.status })

export default connect(mapStatesToProps, { reducerInit })(Dashboard)
