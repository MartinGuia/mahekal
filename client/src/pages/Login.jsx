import { Title } from "../components/Headers/Title";

export default function Login() {

  return (
    <>
    <div className=" flex h-[calc(100vh-100px)] items-center p-5 justify-center">
       <div className="bg-white max-w-lg w-full p-8 rounded text-center shadow-xl">
         <Title>MAHEKAL</Title>
         <form className="flex flex-col items-center">
           <img className="w-20 p-1" src="LogoMahekal.png" alt="Mahekal Logo" />
           <input
             className="w-full bg-mahekal-input p-2 rounded m-2"
             type="text"
             placeholder="User"
           />
           <input
             className="w-full bg-mahekal-input p-2 rounded m-2"
             type="password"
             placeholder="Password"
           />
           <button className="p-2 m-2 w-1/2 rounded-lg bg-water-blue hover:bg-water-blue-hover" type="submit">
             Login
           </button>
         </form>
       </div>
     </div>     
     </>
  );
}
