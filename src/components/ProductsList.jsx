
import { useNavigate } from "react-router-dom";

import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import {Pagination,Spinner} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { fetchProducts, getProducts } from "../slice/productSlice";
import { useDispatch,useSelector } from "react-redux";
const ProductsList = () => {
  const {products }= useSelector(getProducts)
  const navigate = useNavigate();
  const [page,setPage] = useState(1);
  let Total = products === undefined ? 0 : products.length/10
  let loadedProduct = products === undefined ? [] : products
  const dispatch = useDispatch();
  useEffect(() => {
     dispatch(fetchProducts());
  },[dispatch])
  if(products === undefined ){
    return (
    <div className="w-full min-h-[500px] flex justify-center items-center">
      <Spinner label="Loading..." size="lg" className="circle1" color="warning" labelColor="warning"/>
    </div>
  );
  }
  return (
    <div className="flex flex-col items-center gap-2">
    <div className="max-w-4xl p-2 mx-auto my-0 gap-3 flex flex-wrap justify-center">
      {loadedProduct.slice((page - 1)*10,page*10).map((pro) => (
      <Card shadow="sm" className="w-40" key={pro.id} isPressable onPress={() => navigate(`/${pro.id}`)}>
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
      </Card>
      ))}
    </div>
      <Pagination  color="warning" total={Math.floor(Total)} page={page} onChange={(e) => setPage(e)} />
    </div>
  )
}

export default ProductsList