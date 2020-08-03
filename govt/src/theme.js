import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles(theme => ({
	centerizer: {
		alignItems: 'center',
		display: 'flex',
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		textAlign: 'center',
	},
	page: {
		margin: theme.spacing(2),
	},
	root: {
		borderRadius: '0px',
		display: 'flex',
		flex: 1,
	},
}))
