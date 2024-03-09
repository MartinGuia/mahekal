import React from 'react'
import Nav from '../components/Nav'
import { Title } from '../components/Headers/Title'
import { Link } from 'react-router-dom'
import { Tarjeta } from '../components/ui/Tarjeta'

function AccountCollabPage() {
  return (
    <Nav>
        <Title>Cuenta</Title>
        {/* Caja que contiene el boton para regresar una pagina atras */}
        <div className="w-[9%] bottom-9 left-6 relative">
          <button className="rounded-full shadow-md">
            <Link to="/accounts">
              <img
                src="flechaAtras.png"
                className="size-8 max-[281px]:size-6"
                alt=""
              />
            </Link>
          </button>
        </div>  

        <section className='w-[100%] h-auto'>
            <div className='w-[100%] flex justify-center'>
            <Tarjeta className='w-[80%] h-auto flex-col items-center max-[1281px]:w-[90%] max-[391px]:w-[90%]'>
                <div className='w-[100%] h-36 flex justify-center items-center'>
                    <div className='w-[90%] flex'>
                        <div className=''>
                            <Title className=''>Martin García</Title>
                        </div>
                    </div>
                    {/* <div className='w-[50%]'>
                        <div className='w-[100%] flex justify-center'>
                            <button>
                                <p>Mensaje</p>
                                <img src="" alt="" />
                            </button>
                        </div>
                    </div> */}
                </div>
                <div className='w-[100%] flex h-20 bg-slate-300 rounded-md items-center'>
                    <div className='mx-4 text-xl'>Tickets</div>
                    <div className='mx-4 text-xl'>Notas</div>
                    <div className='mx-4 text-xl'>Estadísticas</div>
                </div>
            </Tarjeta>
        </div>
        </section>
    </Nav>
  )
}

export default AccountCollabPage