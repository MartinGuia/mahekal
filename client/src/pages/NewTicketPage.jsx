import React from 'react'
import Nav from '../components/Nav'
import { useCallback } from 'react'
import Select from 'react-select'
import {useDropzone} from 'react-dropzone'
import { Link } from 'react-router-dom';
import LinkButton from '../components/ui/LinkButton'
import { Title } from '../components/Headers/Title'


const SuppliersPrioritys=[ 'Bajo', 'Medio', 'Alto', 'Critico']

const status=[
  {label:'En curso', value:'En curso'},
  {label:'En pausa/revision', value:'En pausa/revision'},
  {label:'Resuelto', value:'Resuelto'},
]

function NewTicketPage() {

   // const [file, setFile] = useState();

  //* El oneDrop es un escuchador de eventos y contiene la lista de archivos y es la que los acepto
  const onDrop = useCallback(acceptedFiles => {
    console.log(acceptedFiles[0]);
    // Haz algo con los archivos
  }, [])
  //* El hook da informacion del contenedor, del input, si se arrastra un elemento y las set files
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({ onDrop });

  const handleSelectPriority =({value})=>{
      console.log(value);
  }
  const handleSelectStatus =({value})=>{
      console.log(value);
  }

  //* evento al enviar el formulario
  const handleSubmit = async e =>{
    e.preventDefault();

    //* Se crea un formdata que es un objeto que da el ordenador para acomodar los archivos en un formulario
    const formData = new FormData()
    //* De formData se usa el metodo append para adjuntar algo
    formData.append('file', acceptedFiles[0])
    // formData.append('upload_preset', '')
    // formData.append('api_key', '')
    // console.log(e.target[1].files[0]);

    //todo: fetch para hacer post a la api del back
    // const res = await fetch('', {method: 'POST', body: formData})
    // const data = await res.json()
    // console.log(data);
  }

  return (
    <>
      <Nav>
        {/* Caja que contiene el Titulo principal de la vista */}
        <Title>Nuevo Ticket</Title>
        {/* Caja que contiene el boton para regresar una pagina atras */}
        <div className="w-[9%] bottom-9 left-6 relative">
          <button className="rounded-full shadow-md">
            <Link to="/tickets">
              <img
                src="flechaAtras.png"
                className="size-8 max-[281px]:size-6"
                alt=""
              />
            </Link>
          </button>
        </div>

        {/* Seccion que contiene el formulario del ticket */}
        <section className="h-[100%] w-[100%] select-none">
          <form action="" onSubmit={handleSubmit} className="w-[100%] h-[100%]">
            <div className="flex w-[100%] max-[541px]:flex-col max-[541px]:items-center">
              {/* Caja del input para colocar el nombre */}
              <div className="w-[50%] flex justify-center max-[541px]:w-[100%]">
                <div className="w-[70%] flex flex-col">
                  <label htmlFor="">Nombre</label>
                  <input
                    type="text"
                    className="p-2 rounded m-2 border-2 w-[70%] max-[541px]:w-[100%]"
                  />
                </div>
              </div>

              {/* Caja para el input de colocar el titulo del ticket */}
              <div className="w-[50%] flex justify-center max-[541px]:w-[100%]">
                <div className="w-[70%] flex flex-col">
                  <label htmlFor="">Titulo ticket</label>
                  <input
                    type="text"
                    className="p-2 rounded m-2 border-2 w-[70%] max-[541px]:w-[100%]"
                  />
                </div>
              </div>
            </div>
            {/* Caja para los inputs de seleccion de opciones */}
            <div className="w-[100%] flex max-[542px]:flex-col">
              {/* Caja de los componentes tipo input del lado izquierdo */}
              <div className="w-[50%] flex-col flex justify-center items-center max-[541px]:w-[100%]">
                <div className="w-[70%] flex-col max-[541px]:w-[100%] max-[541px]:items-center max-[541px]:flex">
                  <label htmlFor="">Prioridad:</label>
                  <Select
                    className="w-[50%]"
                    options={SuppliersPrioritys.map((sup) => ({
                      label: sup,
                      value: sup,
                    }))} 
                    onChange={handleSelectPriority}
                    // styles={{
                    //   control: (styles) => {
                    //     console.log(styles);
                    //     return {
                    //       ...styles,
                    //     };
                    //   },
                    //   option: (styles) => {
                    //     return {
                    //       ...styles,
                    //       backgroundColor: "",
                    //     };
                    //   },
                    // }}
                  />
                </div>
                <div className="w-[70%] flex-col max-[541px]:w-[100%] max-[541px]:items-center max-[541px]:flex">
                  <label htmlFor="">Estado:</label>
                  <Select
                    className="w-[50%]"
                    options={status}
                    onChange={handleSelectStatus}
                  />
                </div>
              </div>
              {/* Caja de los componentes tipo input del lado derecho */}
              <div className="w-[50%] max-[541px]:w-[100%]">
                {/* Caja que contiene los inputs de asignar departamento y asignar persona */}
                <div className="w-auto flex-row flex justify-center items-center max-[281px]:flex-col">
                  <div className="w-[50%] max-[541px]:flex-col max-[541px]:flex max-[541px]:items-center max-[541px]:justify-center max-[281px]:w-[100%]">
                    <label htmlFor="">Departamento:</label>
                    <Select
                      className="w-[70%] "
                      options={SuppliersPrioritys.map((sup) => ({
                        label: sup,
                        value: sup,
                      }))}
                      onChange={handleSelectPriority}
                    />
                  </div>
                  <div className="w-[50%] max-[541px]:flex-col max-[541px]:flex max-[541px]:items-center max-[541px]:justify-center max-[281px]:w-[100%]">
                    <label htmlFor="">Asignar a:</label>
                    <Select
                      className="w-[70%]"
                      options={status}
                      onChange={handleSelectStatus}
                    />
                  </div>
                </div>
                {/* Caja que contiene los inputs del tiempo de ejecucion y el No. de habitación */}
                <div className="w-auto flex-row flex justify-center items-center max-[281px]:flex-col">
                  <div className="w-[50%] max-[541px]:flex-col max-[541px]:flex max-[541px]:items-center max-[541px]:justify-center max-[281px]:w-[100%]">
                    <label htmlFor="">Tiempo de ejecución:</label>
                    <Select
                      className="w-[70%] "
                      options={SuppliersPrioritys.map((sup) => ({
                        label: sup,
                        value: sup,
                      }))}
                      onChange={handleSelectPriority}
                    />
                  </div>
                  <div className="w-[50%] max-[541px]:flex-col max-[541px]:flex max-[541px]:items-center max-[541px]:justify-center max-[281px]:w-[100%]">
                    <label htmlFor="">No. habitacion:</label>
                    <div className="max-[541px]:flex max-[541px]:justify-center">
                      <input
                        type="text"
                        className="p-1 rounded border-2 w-[70%] max-[281px]:w-[100%]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Caja que contiene el textarea*/}
            <div className=" w-[100%] mt-4">
              <div className="w-[50%] flex justify-center">
                <label htmlFor="" className="flex">
                  Descripcción del ticket
                </label>
              </div>
              <div className="flex w-[100%] justify-center">
                <textarea
                  name=""
                  id=""
                  className="w-[60%] pb-3 border-2 rounded-md"
                ></textarea>
              </div>
            </div>

            {/* Caja que contiene la insercion de imagenes */}
            <div className="flex justify-center mt-3">
              <div
                {...getRootProps()}
                className="text-gray-400 border-2 py-[4%] px-[4%] border-dashed border-mahekal-brown cursor-pointer shadow-lg"
              >
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p>Drop the files here ...</p>
                ) : (
                  <p>Arrastra o selecciona los archivos</p>
                )}
              </div>
              {/* <input type="file"
              onChange={e => setFile(e.target.files[0])}
            /> */}
              {/*Toma el objeto file y lo convierte a una url para mostrarlo como previsualizacion de la img escogida */}
              {acceptedFiles[0] && (
                <img
                  src={URL.createObjectURL(acceptedFiles[0])}
                  className="size-40"
                  alt=""
                />
              )}
            </div>
            <br />
            <div className='w-[100%] flex justify-center'>
              <LinkButton className="w-60 max-[361px]:w-[50%]">
                <p className="px-3 text-lg">Enviar</p>
              </LinkButton>
            </div>
          </form>
        </section>
      </Nav>
    </>
  );
}

export default NewTicketPage