import React from 'react'
import ProductsCard from './ProductsCard'
import { useState, useEffect } from 'react'
import classes from "./products.module.css"
import axios from 'axios'


function Products() {
    const [products, setProducts] = useState()
    useEffect(() => {
        axios.get('https://fakestoreapi.com/products')
            .then((res) => {
                setProducts(res.data)
            }).catch((err) => {
                console.log(err)
            })
    }, [])

    return (
        <section className={classes.products_container}>
            {

                // By adding "products &&"" before the map function call, you are checking if categoryImage is not undefined or null before attempting to map over it. This can help prevent the "Cannot read properties of undefined" error in your code.
                products && products.map((singleProduct) => {
                    return <ProductsCard product={singleProduct} />
                })
            }
        </section>
    )
}
export default Products