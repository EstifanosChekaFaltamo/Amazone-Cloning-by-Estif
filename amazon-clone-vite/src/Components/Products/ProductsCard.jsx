import React, { useContext } from 'react'
import { Rating } from '@mui/material'
import CurrencyFormat from '../CurrencyFormat/CurrencyFormat'
import classes from "./products.module.css"
import { Link } from 'react-router-dom'
import { DataContext, DataProvider } from '../DataProvider/DataProvider'
import { Type } from "../../Utility/Action.type"
function ProductsCard({ product, flex, renderDesc, renderAdd }) {
    const { id, image, title, description, rating, price } = product;
    const [state, dispatch] = useContext(DataContext);
    const addTocart = () => {
        dispatch({
            type: Type.ADD_TO_BASKET,
            item: { id, image, title, description, rating, price }
        })
    }


    return (
        <div className={`${classes.card_container} ${flex ? classes.product_flexed : ''}`} >
            <Link to={`/products/${id}`}>
                <img src={image} alt="" />
            </Link>
            <div>
                <h3>{title}</h3>
                {renderDesc && <div style={{ maxWidth: "757px" }}>
                    {description}
                </div>}
                <div className={rating}>
                    <Rating value={rating?.rate} precision={0.1} />
                    {/*Count */}
                    <small>
                        {rating?.count}
                    </small>
                </div>
                <div>
                    {/* price */}
                    <CurrencyFormat amount={price} />
                </div>
                {renderAdd && <button className={classes.button} onClick={addTocart}>
                    Add Cart
                </button>}

            </div>
        </div>
    )
}
export default ProductsCard
