import React from 'react'
import Nav from '../components/Nav'
import Filter from '../components/ui/Filter'
import { Title } from '../components/Headers/Title'

function ListOfDeptCollabs() {
  return (
    <>
        <Nav>
            <Title>Colaboradores</Title>
            <section className="justify-center mx-2 my-8 w-auto h-20 text-lg max-[767px]:flex max-[767px]:text-sm max-[767px]:h-340 max-[767px]:items-center">
                <Filter>Online</Filter>
            </section>
        </Nav>
    </>
  )
}

export default ListOfDeptCollabs