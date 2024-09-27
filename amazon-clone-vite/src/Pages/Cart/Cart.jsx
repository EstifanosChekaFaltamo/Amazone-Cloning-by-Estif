import React, { useContext } from 'react'
import LayOut from '../../Components/LayOut/LayOut'
import { DataContext } from '../../Components/DataProvider/DataProvider'
import ProductsCard from '../../Components/Products/ProductsCard'
import CurrencyFormat from '../../Components/CurrencyFormat/CurrencyFormat'
import classes from "./Cart.module.css"
import { Type } from "../../Utility/Action.type"
import { Link } from 'react-router-dom'
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
function Cart() {
  const [{ basket, user }, dispatch] = useContext(DataContext)
  const total = basket.reduce((amount, item) => {
    return item?.price * item?.amount + amount;
  }, 0)

  console.log(basket);
  const increment = (item) => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item
    })
  }
  const decrement = (id) => {
    dispatch({
      type: Type.REMOVE_FROM_BASKET,
      id
    })
  }
  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.cart_container}>
          <h2>Hello</h2>
          <h3>Your Shopping Basket</h3>
          <hr />
          {
            basket?.length == 0 ? (<p>Opps ! No item in your cart</p>) : (basket?.map((item) => {
              return <section key={item.id} className={classes.cart_product}>
                <ProductsCard

                  product={item}
                  renderDesc={true}
                  renderAdd={false}
                  flex={true} />
                <div className={classes.btn_container}>
                  <button className={classes.btn_detail} onClick={() => increment(item)}><IoIosArrowUp size={20} /></button>
                  <span>{item.amount}</span>
                  <button className={classes.btn_detail} onClick={() => decrement(item.id)}><IoIosArrowDown size={20} /></button>
                </div>
              </section>
            }))
          }
        </div>
        {
          basket?.length !== 0 && (
            <div className={classes.subtotal}>
              <div>
                <p>Subtotal ({basket?.length} items)</p>
                <CurrencyFormat amount={total} />
              </div>
              <span>
                <input type="checkbox" />
                <small>This order contains a gift</small>
              </span>
              <Link to="/payments">Continue to checkout</Link>
            </div>
          )}
      </section>
    </LayOut >
  )
}

export default Cart