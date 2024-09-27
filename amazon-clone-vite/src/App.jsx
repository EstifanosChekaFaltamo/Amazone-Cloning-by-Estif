import React, { useContext, useEffect } from 'react';
import './App.css'
import Routing from './Routing';
import { DataContext } from './Components/DataProvider/DataProvider';
import { Type } from './Utility/Action.type';
import { auth } from './Utility/FireBase';
// import Header from './Components/Header/Header';
// import CarouselEffect from './Components/Carousel/CarouselEffect';
// import Category from './Components/Category/Category';
// import Products from './Components/Products/Products';


function App() {
  const [{ user }, dispatch] = useContext(DataContext)

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: Type.SET_USER,
          user: authUser
        })
      } else {
        dispatch({
          type: Type.SET_USER,
          user: null
        })
      }
    })
  }, [])


  return (
    <>

      {/* <Header />
      <CarouselEffect />
      <Category />
      <Products /> */}

      <Routing />
    </>
  )
}

export default App;
