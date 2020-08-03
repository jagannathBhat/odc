import React, { useState } from 'react'
import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import './App.css'
import BatchNew from './components/pages/BatchNew'
import Dashboard from './components/pages/Dashboard'
import Login from './components/pages/Login'
import MarksAdd from './components/pages/MarksAdd'
import MarksView from './components/pages/MarksView'
import PrivateRoute from './components/misc/PrivateRoute'
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
				<CssBaseline />
				<Router>
					<Switch>
						<Route component={Login} exact path='/' />
						<PrivateRoute component={Dashboard} exact path='/dashboard' />
						<PrivateRoute component={BatchNew} exact path='/batch/new' />
						<PrivateRoute component={MarksAdd} exact path='/marks/add' />
						<PrivateRoute component={MarksView} exact path='/marks/view' />
					</Switch>
				</Router>
			</ThemeProvider>
		</Provider>
	)
}

export default App
