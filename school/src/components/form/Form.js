import React, { Fragment } from 'react'
import {
	Button,
	makeStyles,
	MenuItem,
	TextField,
	Typography,
} from '@material-ui/core'

const Form = ({ data, hideSubmit, inputs, submitHandler }) => {
	const localClasses = useLocalStyles()

	return (
		<>
			{inputs.map((input, index) => {
				const { autofocus, handler, label, name, type } = input
				switch (type) {
					case 'array': {
						return (
							input.data.length > 0 && (
								<div className={localClasses.list} key={index}>
									<Typography component='p' variant='h5'>
										{label}
									</Typography>
									{input.data.map((item, index) => (
										<Fragment key={index}>
											<TextField
												className={localClasses.input}
												label={input.data[index].name + "'s mark"}
												onChange={({ target: { value } }) =>
													handler(input.data[index].id, value)
												}
												variant='outlined'
											/>
											<br />
										</Fragment>
									))}
								</div>
							)
						)
					}
					case 'list': {
						return (
							<div className={localClasses.list} key={index}>
								<Typography component='p' variant='h5'>
									{label}
								</Typography>
								{data[name] &&
									data[name].map((item, index) => (
										<Fragment key={index}>
											<TextField
												className={localClasses.input}
												name={name + index}
												onChange={({ target: { value } }) =>
													handler.item(index, value)
												}
												value={item}
												variant='outlined'
											/>
											<br />
										</Fragment>
									))}
								<Button
									className={localClasses.input}
									onClick={handler.new}
									variant='contained'
								>
									Add New
								</Button>
								<br />
							</div>
						)
					}
					case 'select': {
						return (
							<Fragment key={index}>
								<TextField
									autoFocus={autofocus}
									className={localClasses.input}
									label={label}
									name={name}
									onChange={handler}
									select
									value={data[name] ? data[name] : ''}
									variant='outlined'
								>
									{input.options.map((option, index) => (
										<MenuItem key={index} value={option.value}>
											{option.label}
										</MenuItem>
									))}
								</TextField>
								<br />
							</Fragment>
						)
					}
					default: {
						return (
							<Fragment key={index}>
								<TextField
									autoFocus={autofocus}
									className={localClasses.input}
									label={label}
									name={name}
									onChange={handler}
									value={data[name] ? data[name] : ''}
									variant='outlined'
								/>
								<br />
							</Fragment>
						)
					}
				}
			})}
			{!hideSubmit && (
				<Button
					className={localClasses.submit}
					color='primary'
					onClick={submitHandler}
					variant='contained'
				>
					Submit
				</Button>
			)}
		</>
	)
}

const useLocalStyles = makeStyles(theme => ({
	input: {
		margin: theme.spacing(2) + 'px 0px',
		maxWidth: 240,
		width: '100%',
	},
	list: {
		margin: theme.spacing(2) + 'px 0px',
	},
	submit: {
		margin: theme.spacing(4) + 'px 0px ' + theme.spacing(2) + 'px 0px',
	},
}))

export default Form
