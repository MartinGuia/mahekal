import React from 'react'
import Nav from '../components/Nav'
import TicketComponent from '../components/TicketComponent'

function TicketsPage() {
  return (
    <>
      <Nav  component={<TicketComponent/>}/>
    </>
  )
}

export default TicketsPage