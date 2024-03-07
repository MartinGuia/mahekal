
function Filter(props) {
  return (
    <>
      {/* Caja que contiene las cajas de filtros de los tickets */}
      <div
        {...props}
        className="px-5 flex columns-4 justify-evenly max-[767px]:justify-between max-[767px]:w-36 max-[767px]:border max-[767px]:rounded-lg max-[767px]:resize-none max-[767px]:overflow-y-auto max-[767px]:scrollbar-thin max-[767px]:scrollbar-webkit"
      ></div>
    </>
  );
}

export default Filter