import Navbar from "./NavBar";
import SideBarComponent from "./SideBarComponent";

export default function Navegate() {
  return (
    <div className="flex">
      <SideBarComponent/>
      <Navbar/>
    </div>
    )
}
