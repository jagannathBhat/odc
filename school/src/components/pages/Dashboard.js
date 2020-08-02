import React from 'react'
import {
	Button,
	Card,
	CardContent,
	CardActionArea,
	makeStyles,
	Typography,
} from '@material-ui/core'

const temp = [0, 1, 2, 3, 4, 5, 6]

const Dashboard = ({ history }) => {
	const localClasses = useLocalStyles()

	return (
		<div className={localClasses.gridContainer}>
			<div className={localClasses.title}>
				<Typography component='h1' variant='h4'>
					School Name
				</Typography>
				<Typography color='textSecondary' component='p' variant='subtitle1'>
					District Name
				</Typography>
			</div>
			<Card className={localClasses.addMarks + ' ' + localClasses.card}>
				<CardActionArea
					className={localClasses.cardAction}
					onClick={() => history.push('/marks/add')}
				>
					<CardContent>
						<Typography color='secondary' component='h1' variant='h5'>
							Add Marks
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
			<Card className={localClasses.addBatch + ' ' + localClasses.card}>
				<CardActionArea
					className={localClasses.cardAction}
					onClick={() => history.push('/batch/new')}
				>
					<CardContent>
						<Typography color='secondary' component='h1' variant='h5'>
							Add Batch
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
			<div className={localClasses.status}>
				<Typography component='h1' variant='h5'>
					Status
				</Typography>
				<Typography color='textSecondary' component='p' variant='body1'>
					Server: Offline
					<br />
					Saved changes
					<br />
					Last synced: July 23, 19:98
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
				<div className={localClasses.button}>
					<Button color='primary' onClick={() => history.push('/marks/view')}>
						View All Entries
					</Button>
				</div>
			</div>
		</div>
	)
}

const useLocalStyles = makeStyles(theme => ({
	activity: { margin: theme.spacing(2) },
	addBatch: { gridArea: 'addBatch' },
	addMarks: { gridArea: 'addMarks' },
	button: { display: 'block', textAlign: 'center' },
	card: { alignItems: 'center', display: 'flex', justifyContent: 'center' },
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
	recent: { gridArea: 'recent' },
	status: { gridArea: 'status' },
	title: { gridArea: 'title' },
}))

export default Dashboard
