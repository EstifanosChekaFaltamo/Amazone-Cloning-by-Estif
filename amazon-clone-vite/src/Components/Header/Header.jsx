import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import { SlLocationPin } from "react-icons/sl";
import LowerHeader from './LowerHeader';
import classes from "./Header.module.css"
import { DataContext } from '../DataProvider/DataProvider';
import { auth } from "../../Utility/FireBase"


function Header() {

    const [{ user, basket }, dispatch] = useContext(DataContext)
    const totalItem = basket?.reduce((amount, item) => {
        return item.amount + amount
    }, 0)
    return (
        <section className={classes.fixed}>
            <section >
                <div className={classes.header_container}>
                    <div className={classes.logo_container}>
                        {/* Amazon Logo */}
                        <Link to="/">
                            <img src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="amazon Logo" />
                        </Link>
                        {/* Delivery  */}
                        <div className={classes.delivery}>
                            <span>
                                <SlLocationPin />
                            </span>
                            <div>
                                <p>Delivered to</p>
                                <span>Ethiopia</span>
                            </div>
                        </div>
                    </div>
                    {/* Search */}
                    <div className={classes.search}>
                        <select name="" id="">
                            <option value="">All</option>
                        </select>
                        <input type="text" name="" id="" placeholder='search product' />
                        <BsSearch size={38} />
                    </div>
                    {/* order Container */}
                    <div className={classes.order_container}>
                        {/* right side link */}
                        <div>
                            <Link to="" className={classes.language}>
                                <img src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1024px-Flag_of_the_United_States.svg.png" alt="" />
                                <select name="" id="">
                                    <option value="">EN</option>
                                </select>
                            </Link>
                        </div>
                        {/* three componenets */}
                        <Link to={!user && "/Auth"}>
                            <div>

                                {user ? (<>
                                    <p>Hello {user?.email?.split("@")[0]}</p>
                                    <span onClick={() => auth.signOut()}> SignOut </span>
                                </>) : (
                                    <>
                                        <p>Hello, Sign In</p>
                                        <span>Account & Lists</span>
                                    </>
                                )}
                            </div>
                        </Link>
                        {/* orders */}
                        <Link to="/orders">
                            <p>returns</p>
                            <span>& Orders</span>
                        </Link>
                        {/* cart */}
                        <Link to="/cart" className={classes.cart}>
                            <BiCart size={35} />
                            <span>{totalItem}</span>
                        </Link>
                    </div>
                </div>
            </section >
            <LowerHeader />
        </section >
    )
}

export default Header