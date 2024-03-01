
function Filter(props) {
  return (
    <>
      {/* Caja que contiene las cajas de filtros de los tickets */}
      <div className="px-5 flex columns-4 justify-evenly max-[767px]:justify-between max-[767px]:w-36 max-[767px]:border max-[767px]:rounded-lg max-[767px]:resize-none max-[767px]:overflow-y-auto max-[767px]:scrollbar-thin max-[767px]:scrollbar-webkit">
        <div className=" w-32 shadow-md h-24 rounded-xl p-2 bg-white max-[767px]:mx-3 max-[767px]:px-5" {...props}>
        </div>
        {/* <div className="w-32 shadow-md h-24 rounded-xl p-2 bg-white max-[767px]:mx-3 max-[767px]:px-5">
            <p>Activos</p>
            </div>
            <div className="w-32 shadow-md h-24 rounded-xl p-2 bg-white max-[767px]:mx-3 max-[767px]:px-5">
            <p>Caducados</p>
            </div>
            <div className="w-32 shadow-md h-24 rounded-xl p-2 bg-white max-[767px]:mx-3 max-[767px]:px-5">
            <p>Tickets</p>
            </div> */}
      </div>
    </>
  );
}

export default Filter