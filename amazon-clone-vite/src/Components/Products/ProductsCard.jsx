import React from 'react'
import { Rating } from '@mui/material'
import CurrencyFormat from '../CurrencyFormat'
import classes from "./products.module.css"

function ProductsCard({ product }) {
    return (
        <div className={classes.card_container}>
            <a href="">
                <img src={product.image} alt="" />
            </a>
            <div>
                <h3>{product.title}</h3>
                <div className={classes.rating}>
                    <Rating value={product.rating.rate} precision={0.1} />
                    {/*Count */}
                    <small>
                        {product.rating.count}
                    </small>
                </div>
                <div>
                    {/* price */}
                    <CurrencyFormat amount={product.price} />
                </div>
                <button className={classes.button}>
                    Add Cart
                </button>
            </div>
        </div>
    )
}
export default ProductsCard