import React from 'react'
import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import { SlLocationPin } from "react-icons/sl";
import LowerHeader from './LowerHeader';
import classes from "./Header.module.css"


function Header() {
    const x = 2;
    console.log(x);
    return (
        <>
            <section >
                <div className={classes.header_container}>
                    <div className={classes.logo_container}>
                        {/* Amazon Logo */}
                        <a href="#">
                            <img src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="amazon Logo" />
                        </a>
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
                        <BsSearch size={25} />
                    </div>
                    {/* order Container */}
                    <div className={classes.order_container}>
                        {/* right side link */}
                        <div>
                            <a href="" className={classes.language}>
                                <img src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1024px-Flag_of_the_United_States.svg.png" alt="" />
                                <select name="" id="">
                                    <option value="">EN</option>
                                </select>
                            </a>
                        </div>
                        {/* three componenets */}
                        <a href="">
                            <div>
                                <p>Sign In</p>
                                <span>Account & Lists</span>
                            </div>
                        </a>
                        {/* orders */}
                        <a href="">
                            <p>returns</p>
                            <span>& Orders</span>
                        </a>
                        {/* cart */}
                        <a href="" className={classes.cart}>
                            <BiCart size={35} />
                            <span>0</span>
                        </a>
                    </div>
                </div>
            </section>
            <LowerHeader />
        </>
    )
}

export default Header