import PouchDB from 'pouchdb'

import store from '../../store'
import { STATUS_UPDATE } from '../../actions/types'

const activeHandler = () => {
	store.dispatch({ type: STATUS_UPDATE, payload: 'active' })
	console.log('active')
}

const changeHandler = info => {
	store.dispatch({ type: STATUS_UPDATE, payload: 'change' })
	console.log('change', info)
}

const completeHandler = info => {
	store.dispatch({ type: STATUS_UPDATE, payload: 'complete' })
	console.log('complete', info)
}

const DB_URL = 'users'

const deniedHandler = info => {
	store.dispatch({ type: STATUS_UPDATE, payload: 'denied' })
	console.log('denied', info)
}

const errorHandler = info => {
	store.dispatch({ type: STATUS_UPDATE, payload: 'error' })
	console.log('error', info)
}

const pausedHandler = info => {
	store.dispatch({ type: STATUS_UPDATE, payload: 'pause' })
	console.log('pause', info)
}

// document types
export const TYPE_BATCH = 'batch'
export const TYPE_STUDENT = 'student'
export const TYPE_SUBJECT = 'subject'
export const TYPE_MARK = 'mark'

// function to fetch all docs
export const dbAllDocs = options => {
	const db = new PouchDB(DB_URL)
	db.info()
	return db.allDocs(options)
}

// function to sync all databases
export const dbPost = data => {
	const db = new PouchDB(DB_URL)
	db.info()
	localStorage.setItem('changes', 'offline')
	return db.post(data)
}

// function to sync all databases
export const dbSync = () => {
	const db = new PouchDB(DB_URL)
	db.info()
	db.sync('http://localhost:5984/' + DB_URL, { live: true, retry: true })
		// replicate resumed (e.g. new changes replicating, user went back online)
		.on('active', activeHandler)
		// handle change
		.on('change', changeHandler)
		// handle complete
		.on('complete', completeHandler)
		// a document failed to replicate (e.g. due to permissions)
		.on('denied', deniedHandler)
		// handle error
		.on('error', errorHandler)
		// replication paused (e.g. replication up to date, user went offline)
		.on('paused', pausedHandler)
}
