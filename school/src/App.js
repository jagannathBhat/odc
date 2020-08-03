import React, { useState } from 'react'
import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import './App.css'
import BatchNew from './components/pages/BatchNew'
import Dashboard from './components/pages/Dashboard'
import InitReducers from './components/misc/InitReducers'
import Login from './components/pages/Login'
import MarksAdd from './components/pages/MarksAdd'
import MarksView from './components/pages/MarksView'
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
						<Route component={Dashboard} exact path='/dashboard' />
						<Route component={BatchNew} exact path='/batch/new' />
						<Route component={MarksAdd} exact path='/marks/add' />
						<Route component={MarksView} exact path='/marks/view' />
					</Switch>
				</Router>
			</ThemeProvider>
		</Provider>
	)
}

export default App
