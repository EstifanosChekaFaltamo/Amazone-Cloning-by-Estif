import React from 'react'
import ProductsCard from './ProductsCard'
import { useState, useEffect } from 'react'
import classes from "./products.module.css"
import axios from 'axios'
import Loader from '../Loader/Loader'


function Products() {
    const [products, setProducts] = useState()
    const [isLoading, setisLoading] = useState(false)
    // console.log(products);
    useEffect(() => {
        // isLoading(true)
        axios.get('https://fakestoreapi.com/products')
            .then((res) => {
                setProducts(res.data);
                setisLoading(false);
            }).catch((err) => {
                console.log(err);
                setisLoading(false)
            })
    }, [])

    return (<>

        {isLoading ? (<Loader />) : (<section className={classes.products_container}>
            {
                // By adding "products &&"" before the map function call, you are checking if categoryImage is not undefined or null before attempting to map over it. This can help prevent the "Cannot read properties of undefined" error in your code.
                products && products.map((singleProduct, id) => {
                    return <ProductsCard product={singleProduct} key={id} renderAdd={true} />
                })
            }
        </section>)}

    </>
    )
}
export default Products