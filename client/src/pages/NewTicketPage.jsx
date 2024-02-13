import React from 'react'
import Nav from '../components/Nav'
import NewTicketComponent from '../components/NewTicketComponent'

function NewTicketPage() {
  return (
    <>
      <Nav  component={<NewTicketComponent/>}/>
    </>
  )
}

export default NewTicketPage