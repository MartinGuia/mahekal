import React from 'react'
import Nav from '../components/Nav'
import { Tarjeta } from '../components/ui/Tarjeta';
import { Title } from '../components/Headers/Title';
import ButtonAction from '../components/ui/ButtonAction';
import {useDepartment} from '../context/DepartmentContext'
import { useEffect } from 'react';

function DepartamentosPage() {
const {department, getAllDepartments} = useDepartment()

  useEffect(()=>{
    getAllDepartments();
  },[])
  return (
    <>
      <Nav>
        <Title>Departamentos</Title>

        <section className="w-[100%] h-[8%] flex max-[541px]:mt-4">
          <div className="w-[100%]">
            <ButtonAction
              rutaDestino="/add-department"
              className=" bg-water-blue hover:bg-water-blue-hover px-4 py-3 rounded-lg shadow-lg ml-8"
            >
              Agregar Departamento
            </ButtonAction>
          </div>
        </section>

        <section className="h-screen mt-8 flex items-center flex-col">
          <div className="h-[100%] w-[100%] flex items-center flex-col">
            {department.map((option, i) => (
              <Tarjeta to={`/listadptocollabs/${option.id}`} key={i}>
                <div className="w-[60%] flex justify-center items-center max-[541px]:w-[100%]">
                  <h1 className="text-3xl font-semibold max-[769px]:text-xl max-[376px]:text-base">
                    
                    {option.name}
                  </h1>
                </div>
                <div className="w-[60%] flex justify-center items-center max-[541px]:w-[100%] max-[541px]:mt-2 max-[281px]:flex-col">
                  <div className="w-[100%] flex justify-center items-center mx-1">
                    <ButtonAction
                      rutaDestino="/"
                      className=" bg-water-blue hover:bg-water-blue-hover max-[541px]:w-auto flex-col items-center w-56"
                    >
                      <p className="text-xl text-center max-[769px]:text-base max-[431px]:text-sm max-[376px]:text-xs text-white">
                        Tickets
                      </p>
                      <span className="text-white">0</span>
                    </ButtonAction>
                  </div>
                </div>
              </Tarjeta>
            ))}
          </div>
        </section>
      </Nav>
    </>
  );
}

export default DepartamentosPage;