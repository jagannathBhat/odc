import PouchDB from 'pouchdb'

const activeHandler = info => console.log('active')
const changeHandler = info => console.log('change', info)
const completeHandler = info => console.log('complete', info)
const deniedHandler = info => console.log('denied', info)
const errorHandler = info => console.log('error', info)
const pausedHandler = info => console.log('pause', info)

// database to store all batched
export const batchDBUrl = 'batch'

// database to store all students
export const studentDBUrl = 'student'

// database to store all subjects
export const subjectDBUrl = 'subject'

// database to store all tests
export const testDBUrl = 'test'

// function to sync all databases
export const dbSync = () => {
	PouchDB.sync(batchDBUrl, 'http://localhost:5984/' + batchDBUrl, {
		live: true,
		retry: true,
	})
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

	PouchDB.sync(studentDBUrl, 'http://localhost:5984/' + studentDBUrl, {
		live: true,
		retry: true,
	})
		.on('active', activeHandler)
		.on('change', changeHandler)
		.on('complete', completeHandler)
		.on('denied', deniedHandler)
		.on('error', errorHandler)
		.on('paused', pausedHandler)

	PouchDB.sync(subjectDBUrl, 'http://localhost:5984/' + subjectDBUrl, {
		live: true,
		retry: true,
	})
		.on('active', activeHandler)
		.on('change', changeHandler)
		.on('complete', completeHandler)
		.on('denied', deniedHandler)
		.on('error', errorHandler)
		.on('paused', pausedHandler)

	PouchDB.sync(testDBUrl, 'http://localhost:5984/' + testDBUrl, {
		live: true,
		retry: true,
	})
		.on('active', activeHandler)
		.on('change', changeHandler)
		.on('complete', completeHandler)
		.on('denied', deniedHandler)
		.on('error', errorHandler)
		.on('paused', pausedHandler)
}
