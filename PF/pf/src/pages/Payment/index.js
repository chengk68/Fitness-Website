import React from 'react'
import { useParams } from 'react-router-dom/dist'

function Payment() {
  const {id} = useParams()
  return (
	<div>Payment {id}</div>
  )
}

export default Payment