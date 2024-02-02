import { Chip } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { FaAngleLeft,FaStarHalf,FaStar,FaTrash } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import { BsDash,BsFillCartFill  } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CarouselComponent from "./CarouselComponent";
import { useDispatch, useSelector} from "react-redux";
import { addToCart, cart,removeItem } from "../slice/productSlice";
import {Spinner} from "@nextui-org/react";
import axios from "axios";

const ProductPage = () => {
   const navigate = useNavigate();
   const {id} = useParams();
   const [product,setProduct] = useState(null);
   const [quantity,setQuantity] = useState(1);
   const item = useSelector(cart);
   const dispatch = useDispatch();
   async function singleProduct(){
    const res = await axios.get(`https://dummyjson.com/products/${id}`)
    setProduct(res.data);
   }
   
   useEffect(() => {
     singleProduct()
   },[setProduct])
  
  let price = 0;
  function handleAddCart(pro){
    const product = {...pro,price,quantity}
    
    dispatch(addToCart(product))
  }
  if(product===null){
    return (
    <div className="w-full min-h-[500px] flex justify-center items-center">
      <Spinner label="Loading..." size="lg" className="circle1" color="warning" labelColor="warning"/>
    </div>
  );
  }
  price = product.price - Math.ceil(product.price*(Math.ceil(product.discountPercentage)/100))
  let isInCart = item.some((el) => el.id === +id)
  
  return (
    <div className="max-w-4xl p-2 mx-auto my-0">
      <Button isIconOnly onClick={() => navigate(-1)} size="sm" className="bg-orange-200 text-orange-600" aria-label="Like">
        <FaAngleLeft />
      </Button>
      <div className="flex flex-col justify-center items-center md:flex-row gap-5 mt-2 p-2">
        <CarouselComponent images={product.images}/>
        <div className="flex flex-col gap-2">
          <h1 className="text-orange-500 font-bold uppercase">{product.category}</h1>
          <h1 className="text-gray-500 text-xl font-bold uppercase">{ product.brand}</h1>
          <h1 className="text-2xl font-bold uppercase">{product.title}</h1>
          <p className="max-w-[350px]">
            {product.description}
          </p>
          <div className="flex gap-1">
            <FaStar className="text-yellow-500" />
            <FaStar className="text-yellow-500" />
            <FaStar className="text-yellow-500" />
            <FaStar className="text-yellow-500" />
            <FaStarHalf className="text-yellow-500" />
          </div>
          <div className="flex gap-1 items-center">
            <span className="text-lg font-bold">${price}</span>
            <Chip size="sm" className="font-black bg-orange-100 text-orange-500 ">{Math.ceil(product.discountPercentage)}%</Chip>
          </div>
          <del className="text-red-700 font-bold">${product.price}</del>
          {!isInCart && <div className="flex gap-2 items-center">
            <Button isIconOnly size="sm" onClick={() => setQuantity((q) => q !== 1 ? q-1 : 1 )} className="bg-gray-200 text-black font-bold">
              <BsDash />
            </Button>
            <span>{quantity}</span>
            <Button isIconOnly size="sm" onClick={() => setQuantity((q) => q+1 )} className="bg-gray-200 text-black font-bold">
              <MdAdd />
            </Button>
          </div>}
          {!isInCart ? 
          <Button className="text-white bg-orange-600 w-[150px]"  
            startContent={<BsFillCartFill />}
            onClick={()=>handleAddCart(product)}
          >
            Add to cart
          </Button>
          :
          <Button className="text-white bg-red-600 w-[200px]"   
          startContent={<FaTrash />}
          onClick={() => dispatch(removeItem(+id))}
          >
            Remove from cart
          </Button>
          }
        </div>
      </div>
    </div>
  )
}

export default ProductPage