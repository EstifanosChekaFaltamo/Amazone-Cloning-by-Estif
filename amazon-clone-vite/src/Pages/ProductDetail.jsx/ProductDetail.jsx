import React from 'react'
import LayOut from '../../Components/LayOut/LayOut'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { productUrl } from '../../Api/Endpoints';
import ProductsCard from '../../Components/Products/ProductsCard';
import Loader from '../../Components/Loader/Loader';


function ProductDetail() {

  const { productId } = useParams()
  const [product, setproduct] = useState({})
  const [isLoading, setisLoading] = useState(false)
  useEffect(() => {
    setisLoading(true);
    axios.get(`${productUrl}/products/${productId}`)
      .then((res) => {
        setproduct(res.data);
        setisLoading(false);
        console.log(res.data);
      }).catch((err) => {
        console.log(err);
        setisLoading(false);
      })
  }, [])

  return (
    <LayOut>
      {isLoading ? (<Loader />) : (<ProductsCard product={product} flex={true} renderDesc={true} renderAdd={true} />)}
      <div>

      </div>
    </LayOut>
  )
}
export default ProductDetail