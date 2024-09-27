import React from 'react'
import LayOut from '../../Components/LayOut/LayOut'
import classes from "./Results.module.css"
import ProductsCard from '../../Components/Products/ProductsCard'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { productUrl } from '../../Api/Endpoints'
import Loader from '../../Components/Loader/Loader'

function Results() {
  const [results, setResults] = useState([]);
  const [isloading, setisloading] = useState(false)
  const { categoryName } = useParams()
  useEffect(() => {
    axios.get(`${productUrl}/products/category/${categoryName}`)
      .then((res) => {
        setResults(res.data)
        console.log(res.data)
      }).catch((err) => {
        console.log(err)
      })
  }, [])
  return (
    <LayOut>
      <section>
        <h1 style={{ padding: "30px" }}>Results</h1>
        <p style={{ padding: "30px" }}>Category/{categoryName}</p>
        <hr />
        {isloading ? (<Loader />) : (<div className={classes.products_container}>
          {results.map((product) => {
            return <ProductsCard key={product.id} product={product} renderAdd={true} renderDesc={false} />
          })}
        </div>)}
      </section>
    </LayOut>
  )
}

export default Results
