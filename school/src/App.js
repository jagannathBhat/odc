import React, { useState } from 'react'
import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import './App.css'
import BatchNew from './components/pages/BatchNew'
import Dashboard from './components/pages/Dashboard'
import InitReducers from './components/misc/InitReducers'
import store from './store'
import { getMode, setMode } from './actions/darkModeActions'

const App = () => {
	const [darkMode, setDarkMode] = useState(getMode())

	// eslint-disable-next-line
	const toggleDarkMode = () => {
		setDarkMode(!darkMode)
		setMode(!darkMode)
	}

	const theme = React.useMemo(
		() => createMuiTheme({ palette: { type: darkMode ? 'dark' : 'light' } }),
		[darkMode]
	)

	return (
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<InitReducers />
				<CssBaseline />
				<Router>
					<Switch>
						<Route component={Dashboard} exact path='/' />
						<Route component={BatchNew} exact path='/batch/new' />
					</Switch>
				</Router>
			</ThemeProvider>
		</Provider>
	)
}

export default App
