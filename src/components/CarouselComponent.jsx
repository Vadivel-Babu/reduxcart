import { Carousel } from 'antd';
import {Image} from "@nextui-org/react";
const CarouselComponent = ({images}) => {

  
  return (
    <Carousel autoplay className='max-w-[300px]'>
    {images.map((img,i) => (
      <div key={i}>
        <img
        alt="NextUI hero Image"
        src={img}
        className='w-[300px] h-[300px] object-cover'
       />
      </div>
    ))}
  </Carousel>
  )
}

export default CarouselComponent