import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import ProductsList from "./components/ProductsList"
import ProductPage from "./components/ProductPage"
import { useDisclosure} from "@nextui-org/react";
import Cart from "./components/Cart";

function App() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  return (
    <>
     <Navbar press={onOpen}/>
     <Routes>
      <Route path="/" element={<ProductsList/>}/>
      <Route path="/:id" element={<ProductPage/>}/>
     </Routes>
      <Cart open={isOpen} openChange={onOpenChange}/>
    </>
  )
}

export default App
