import React from 'react'
import LayOut from '../../Components/LayOut/LayOut'
import CarouselEffect from '../../Components/Carousel/CarouselEffect'
import Category from '../../Components/Category/Category'
import Products from '../../Components/Products/Products'
function Landing() {
    return (
        <div>
            <LayOut>
                <CarouselEffect />
                <Category />
                <Products />
            </LayOut>
        </div>
    )
}

export default Landing