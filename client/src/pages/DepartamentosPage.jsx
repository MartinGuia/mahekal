import React from 'react'
import Nav from '../components/Nav'
import { Tarjeta } from '../components/ui/Tarjeta';
import { Title } from '../components/Headers/Title';
import LinkButton from '../components/ui/LinkButton';

function DepartamentosPage() {
  return (
    <>
      <Nav>
        <Title>Departamentos</Title>

        <section className="h-screen mt-8 flex items-center flex-col">
          <div className="h-[100%] w-[100%] flex items-center flex-col">
            <Tarjeta>
              <div className="w-[40%] flex justify-center items-center max-[541px]:w-[100%]">
                <h1 className="text-3xl font-semibold max-[769px]:text-xl max-[376px]:text-base">Mantenimiento</h1>
              </div>
              <div className="w-[60%] flex justify-center items-center max-[541px]:w-[100%] max-[541px]:mt-2 max-[281px]:flex-col">
                <div className="w-[50%] flex justify-center items-center mx-1">
                  <LinkButton to="/" className="max-[541px]:w-auto flex-col items-center">
                    <p className="text-xl text-center max-[769px]:text-base max-[431px]:text-sm max-[376px]:text-xs">
                      Tickets
                    </p>
                    <span>0</span>
                  </LinkButton>
                </div>
                <div className="w-[50%] flex items-center justify-center mx-1 max-[281px]:mt-2">
                  <LinkButton to='/listadptocollabs' className="max-[541px]:w-auto ">
                    <p className="text-xl text-center max-[769px]:text-base max-[431px]:text-sm max-[376px]:text-xs">
                      Lista Empleados
                    </p>
                  </LinkButton>
                </div>
              </div>
            </Tarjeta>
          </div>
        </section>
      </Nav>
    </>
  );
}

export default DepartamentosPage