import React, { useState,useEffect } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

import "../Styles/Inicio.css"

var items = [];

const Example = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [items,setItems]=useState([])


    useEffect(()=>{
        axios.get('http://localhost:3100/inicio')
        .then(response => {
            setItems(response.data)
            console.log(response.data)
        })
    },[])

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }

  const slides = items.map((item) => {
    return (
        
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.id}
      >
        <Link to={`/Inicio/Puesto/${item.departamento}/${item.puesto}`}>
        <img src={item.imagen} alt={item.puesto} width="100%" height="500px" style={{objectFit:'contain'}} />
        </Link>
        <CarouselCaption captionText={`Salario:${item.salario}`} captionHeader={`Departamento: ${item.departamento}\n Puesto: ${item.puesto}`} />
      </CarouselItem>
      
    );
  });
  const prueba=()=>{
    axios.get('http://localhost:3100/inicio')
    .then(response => {
      console.log(response.data);
    })
  }

  return (
    <div id="Carrusel">
    <Carousel
      activeIndex={activeIndex}
      next={next}
      previous={previous}
    >
      <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
      {slides}
      <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
      <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
    </Carousel>
    </div>
   
    
  );
}

export default Example;
