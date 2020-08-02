import React, { Fragment } from 'react'
import { Button, makeStyles, TextField, Typography } from '@material-ui/core'

const Form = ({ data, inputs, submitHandler }) => {
	const localClasses = useLocalStyles()

	return (
		<>
			{inputs.map(({ autofocus, handler, label, name, type }, index) => {
				switch (type) {
					case 'list': {
						return (
							<div className={localClasses.list} key={index}>
								<Typography component='p' variant='h4'>
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
			<Button
				className={localClasses.submit}
				color='primary'
				onClick={submitHandler}
				variant='contained'
			>
				Submit
			</Button>
		</>
	)
}

const useLocalStyles = makeStyles(theme => ({
	input: {
		margin: theme.spacing(2) + 'px 0px',
	},
	list: {
		margin: theme.spacing(2) + 'px 0px',
	},
	submit: {
		margin: theme.spacing(4) + 'px 0px ' + theme.spacing(2) + 'px 0px',
	},
}))

export default Form
