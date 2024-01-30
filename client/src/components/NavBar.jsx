export default function NavBar() {
  const isSmallScreen = window.innerWidth < 730;

  return (
    <>
      <header className="w-full h-14 flex justify-between items-center bg-slate-100 shadow-lg ">
        
        <div className="h-full flex mx-4">
          <button>
            <img src="bell.png" alt="" />
          </button>
        </div>

        <div className="w-[60%] h-full flex justify-end">
          <button className="p-2 m-2 shadow-md w-[30%] rounded-lg bg-cyan-300 hover:bg-cyan-400">
          {isSmallScreen ? "+" : "Nuevo Ticket +"}
            </button>
          <form action="" className="flex w-[70%]">
            <button>
              <img src="search.png" alt="" />
            </button>
            <input type="search" placeholder="Search"
              className="w-full p-1 rounded m-2 border-solid border-2 border-black" name="search" id="" />
          </form>
        </div>
      </header>
    </>
  );
}