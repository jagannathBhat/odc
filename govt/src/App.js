import React, { useState } from 'react'
import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Dashboard from './components/pages/Dashboard'
import InitReducers from './components/misc/InitReducers'
import Login from './components/pages/Login'
import PrivateRoute from './components/misc/PrivateRoute'
import store from './store'
import { getMode, setMode } from './actions/darkModeActions'
import { dbSync } from './components/misc/db'

dbSync()

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
						<Route component={Login} exact path='/' />
						<PrivateRoute component={Dashboard} exact path='/dashboard' />
					</Switch>
				</Router>
			</ThemeProvider>
		</Provider>
	)
}

export default App
