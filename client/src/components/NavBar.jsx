export default function NavBar() {
  const isSmallScreen = window.innerWidth < 730;

  return (
    <>
      <div className="flex">
      <header className="w-screen h-14 flex justify-between items-center bg-white shadow-xl ">
        
        <div className="h-full flex mx-4">
          <button>
            <img src="bell.png" alt="" />
          </button>
        </div>

        <div className="w-[60%] h-full flex justify-end">
          <button className="p-2 m-2 shadow-md w-[30%] rounded-lg bg-water-blue hover:bg-water-blue-hover">
          {isSmallScreen ? "+" : "Nuevo Ticket +"}
            </button>
          <form action="" className="flex w-[70%]">
            <button>
              <img src="search.png" alt="" />
            </button>
            <input type="search" placeholder="Search"
              className="w-full p-1 rounded bg-mahekal-input m-2 border-solid border-2 border-black" name="search" id="" />
          </form>
        </div>
      </header>
      </div>
    </>
  );
}