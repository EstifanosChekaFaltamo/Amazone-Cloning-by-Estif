import React, { useContext, useState } from 'react'
import LayOut from '../../Components/LayOut/LayOut'
import classes from "./Payment.module.css"
import { DataContext } from '../../Components/DataProvider/DataProvider';
import ProductCard from "../../Components/Products/ProductsCard"
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import CurrencyFormat from '../../Components/CurrencyFormat/CurrencyFormat';
import { axiosInstance } from '../../Api/Axios';
import { Card } from '@mui/material';
import { ClipLoader } from 'react-spinners';
import { db } from '../../Utility/FireBase';
import { useNavigate } from 'react-router-dom';
import { Type } from '../../Utility/Action.type';


function Payment() {

    const [{ user, basket }, dispatch] = useContext(DataContext);
    console.log(user);
    const totalItem = basket?.reduce((amount, item) => {
        return item.amount + amount
    }, 0)


    const total = basket.reduce((amount, item) => {
        return item?.price * item?.amount + amount;
    }, 0)
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    // const cardElement = elements.getElement(CardElement);

    const [cardError, setCarderror] = useState(null);
    const [processing, setProcessing] = useState(false)

    const handleChange = (e) => {
        // console.log(e);
        e?.error?.message ? setCarderror(e?.error?.message) : setCarderror("");
    }

    const handlePayment = async (e) => {
        e.preventDefault();

        try {
            setProcessing(true)
            // 1. Backend || functions contact to client secret
            const response = await axiosInstance({
                method: "POST",
                url: `/payment/create?total=${total * 100}`
            });
            // console.log(response.data);
            const clientSecret = response.data?.clientSecret;
            // 2. Client side or react side confirmation
            const { paymentIntent } = await stripe.confirmCardPayment(
                clientSecret,
                {
                    payment_method: {
                        card: elements.getElement(CardElement),
                    },
                });
            // console.log(paymentIntent);

            // 3. After confirmation -->Order firestore database save, clear basket instead in order page exists.

            await db.collection("users")
                .doc(user.uid)
                .collection("orders")
                .doc(paymentIntent.id).
                set({
                    basket: basket,
                    amount: paymentIntent.amount,
                    created: paymentIntent.created,
                });

            // Empty the Basket!!!!!!!!!!
            dispatch({
                type: Type.EMPTY_BASKET,

            });
            setProcessing(false)
            navigate("/orders", { state: { msg: "You have placed new Order" } })

        } catch (error) {
            console.log(error);
            setProcessing(false)
        }




    };

    return (
        <LayOut>
            {/* header */}
            <div className={classes.payment_header}>
                Checkout ({totalItem}) items
            </div>
            {/* payment method */}
            <section className={classes.payment}>
                {/* address */}
                <div className={classes.flex}>
                    <h3>Delivery Address</h3>
                    <div>
                        <div>{user?.email}</div>
                        <div>123 React Lane</div>
                        <div>Chicago, IL</div>
                    </div>
                </div>
                <hr />
                {/* product */}
                <div className={classes.flex}>
                    <h3>Review items and delivery</h3>
                    <div>
                        {
                            basket?.map((item, index) => <ProductCard key={index} product={item} flex={true} />)
                        }
                    </div>
                </div>
                <hr />
                {/* card form */}

                <div className={classes.flex}>
                    <h3>Payment Methods</h3>
                    <div className={classes.card_container}>
                        <div className={classes.payment_details}>
                            <form onSubmit={handlePayment}>
                                {cardError && <small style={{ color: "red" }}>
                                    {cardError}
                                </small>}
                                <CardElement onChange={handleChange} />

                                {/* price */}
                                <div className={classes.payment_price}>
                                    <div>
                                        <span style={{ display: "flex", gap: "10px" }}>
                                            <p>Total Order |</p> <CurrencyFormat amount={total} />
                                        </span>
                                    </div>
                                    <button type="submit">

                                        {
                                            processing ? (
                                                <div className={classes.loading}>
                                                    <ClipLoader color="gray" size={12} />
                                                    <p>Please Wait ...</p>
                                                </div>) : "Pay Now"
                                        }

                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div></div>
                </div>


            </section>
        </LayOut>
    )
}

export default Payment