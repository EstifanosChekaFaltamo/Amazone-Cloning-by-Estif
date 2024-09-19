import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { img } from './data'
import classes from "./Carousel.module.css"
function CarouselEffect() {
    const x = 43;
    console.log(x);
    return (
        <div>
            <Carousel autoPlay={true}
                infiniteLoop={true}
                showIndicators={false}
                showThumbs={false}
            >
                {
                    img.map((imageItemLink) => {
                        return <img key={0} src={imageItemLink} />
                    })
                }
            </Carousel>
            <div className={classes.hero_img}></div>
        </div>
    )
}

export default CarouselEffect