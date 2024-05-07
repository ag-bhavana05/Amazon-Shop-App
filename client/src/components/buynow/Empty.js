import React from 'react'
import { NavLink } from 'react-router-dom'
// import "./buynow.css"

const Empty = () => {
  return (
    <div className='buynow_section'>
      <div className="buynow_container">
        <div className="empty_buy" style={{padding: "40px 40px"}}>
            <img src="./cartimg.jpg" alt="cart img" />
            <div className="emptydata">
                <h1>Your Amazon Basket is Empty</h1>
                <p>See recommendations</p>
            </div>
            <NavLink className="empty_btn" to="/">Add Your Items</NavLink>
        </div>
      </div>
    </div>
  )
}

export default Empty
