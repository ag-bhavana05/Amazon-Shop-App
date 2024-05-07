import React, { useEffect, useState } from 'react'
import "./buynow.css";
import { Divider } from '@mui/material';
import Option from './Option';
import Subtotal from './Subtotal';
import Right from './Right';
import Empty from './Empty';

const Buynow = () => {

    const [cartdata, setCartdata] = useState("");
    console.log(cartdata);

    const getdatabuy = async () => {
        const res = await fetch("/cartdetails", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        });

        const data = await res.json();
        if (res.status !== 201) {
            console.log("error");
        }
        else {
            setCartdata(data.carts);
        }
    }


    useEffect(() => {
        getdatabuy();
    }, [])

    return (
        <>{
            cartdata.length ? <div className='buynow_section'>
                <div className="buynow_container">
                    <div className="left_buy">
                        <h1>Shopping Cart</h1>
                        <p>Select all items</p>
                        <span className="leftbuyprice">Price</span>
                        <Divider />

                        {
                            cartdata.map((e, k) => {
                                // console.log(e);
                                // console.log(k);
                                return (
                                    <>
                                        <div className="item_container">
                                            <img src={e.detailUrl} alt="" />
                                            <div className="item_details">
                                                <h3>{e.title.longTitle}</h3>
                                                <h3>{e.title.shortTitle}</h3>
                                                <h3 className="differentprice">Rs{e.price.cost}</h3>
                                                <p className='unusual'>Usually dispatched in 8 days.</p>
                                                <p>Eligible for FREE Shipping</p>
                                                <img src="afulfilled.jpg" alt="" />
                                                <Option deletedata = {e.id} get = {getdatabuy} />
                                            </div>
                                            <h3 className='item_price'>Rs{e.price.cost}</h3>
                                        </div>
                                        <Divider />
                                    </>
                                )
                            })
                        }

                        
                        <Subtotal items = {cartdata} />
                    </div>

                    <Right items = {cartdata} />
                </div>
            </div> : <Empty/>
        }
        </>
    )
}

export default Buynow
