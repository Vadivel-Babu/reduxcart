import { Modal, ModalContent, ModalHeader, ModalFooter, Button, Card, CardBody, CardFooter, Image, ModalBody } from "@nextui-org/react";
import { BsDash } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { cart } from "../slice/productSlice";
import { removeItem, emptyCart, increaseQuantity, decreaseQuantity } from "../slice/productSlice";
import { useNavigate } from "react-router-dom";
const Cart = ({ open, openChange }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const item = useSelector(cart);
  const total = item.reduce((acc, cur) => acc + (cur.quantity * cur.price), 0)
  
  return (
    <Modal isOpen={open} onOpenChange={openChange} scrollBehavior="inside" className="p-2">
      <ModalContent className="w-full">
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Cart</ModalHeader>
            <ModalBody>
              <div className="flex flex-wrap gap-3 justify-center" >
                {item.map((pro) => (
                  <Card shadow="sm" className="w-40 p-1 flex flex-col items-center gap-1" key={pro.id} >
                    <CardBody className="overflow-visible p-2 flex flex-col items-center">
                      <Image
                        shadow="sm"
                        radius="lg"
                        width="100%"
                        className="w-36 object-cover h-[140px]"
                        src={pro.thumbnail}
                      />
                    </CardBody>
                    <CardFooter className="text-small justify-between">
                      <b>{pro.title}</b>
                      <p className="text-default-500">${pro.price}</p>
                    </CardFooter>
                    <div className="flex gap-2 items-center">
                      <Button isIconOnly size="sm" onClick={() => dispatch(decreaseQuantity(pro.id))} className="bg-gray-200 text-black font-bold">
                        <BsDash />
                      </Button>
                      <span>{pro.quantity}</span>
                      <Button isIconOnly size="sm" onClick={() => dispatch(increaseQuantity(pro.id))} className="bg-gray-200 text-black font-bold">
                        <MdAdd />
                      </Button>
                    </div>
                    <Button isIconOnly onClick={() => dispatch(removeItem(pro.id))} size="sm" className="bg-orange-200 text-red-600">
                      <FaTrash />
                    </Button>
                  </Card>
                ))}
              </div>
            </ModalBody>
            {item.length === 0 ? (
              <h2 className="text-center font-bold text-2xl">Your Cart is empty</h2>
            ) : (
              <h2 className="text-center p-2 font-bold">
                Total:
                <span className="text-gray-500">${total}</span>
              </h2>
            )}
            <ModalFooter>
              {item.length === 0 ? (
                <Button className="bg-orange-500 text-white" onPress={onClose} onClick={() => navigate('/')}>
                  Go to shop
                </Button>
              ) : (
                <Button className="bg-orange-500 text-white" onPress={onClose} onClick={() => dispatch(emptyCart())}>
                  Place order
                </Button>
              )}

            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default Cart