import {Badge} from "@nextui-org/react";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { cart } from "../slice/productSlice";

const Navbar = ({press}) => {
  const item = useSelector(cart)
  return (
    <nav className="bg-gray-100 px-5 py-3">
      <div className="flex justify-between max-w-4xl my-0 mx-auto">
        <h1 className="font-bold text-orange-500 text-2xl">Kart</h1>
        <div onClick={press} className="cursor-pointer">
        <Badge  className="text-xs bg-orange-500 text-white" content={item !== null ? item.length : 0}  shape="circle">
          <FaShoppingCart className="text-3xl"/>
        </Badge>
        </div>
      </div>
    </nav>
  )
}

export default Navbar