import React, { useEffect, useState, useContext } from 'react'
import LayOut from '../../Components/LayOut/LayOut'
import { db } from '../../Utility/FireBase'
import classes from "./Orders.module.css"
import { DataContext } from '../../Components/DataProvider/DataProvider'
import ProductsCard from '../../Components/Products/ProductsCard'


function Orders() {

  const [{ user }, dispatch] = useContext(DataContext);
  const [orders, setOrders] = useState([])
  useEffect(() => {

    if (user) {
      db.collection("users")
        .doc(user.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) => {
          console.log(snapshot);
          setOrders(snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          })))
        })
    } else {
      setOrders([]);
    }
  }, []);

  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.orders_container}>
          <h2> Your Orders </h2>
          {

            orders.length == 0 && <div style={{ padding: "20px" }}>
              You don't have orders yet
            </div>
          }


          {/* ordered items */}
          <div>
            {
              orders?.map((eachorder, i) => {
                return (
                  <div key={i}>
                    <hr />

                    <p>Order ID: {eachorder?.id}</p>
                    {
                      eachorder?.data?.basket?.map(order => (<ProductsCard
                        key={order.id}
                        flex={true}
                        product={order} />))
                    }
                  </div>
                )

              })
            }
          </div>
        </div>
      </section>
    </LayOut >
  )
}

export default Orders