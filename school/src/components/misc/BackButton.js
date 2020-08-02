import React from 'react'
import { ArrowBack } from '@material-ui/icons'

const BackButton = ({ className, history }) => {
	const goBack = () => history.goBack()

	return <ArrowBack className={className} onClick={goBack} />
}

export default BackButton
