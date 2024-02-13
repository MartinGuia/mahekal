import React from 'react'
import Nav from '../components/Nav'
import DepartamentosComponent from '../components/DepartamentosComponent'

function DepartamentosPage() {
  return (
    <>
        <Nav component={<DepartamentosComponent/>}/>
    </>
  )
}

export default DepartamentosPage