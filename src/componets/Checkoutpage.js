import React from 'react'
import './Checkout.css';
 import Checkoutproduct from './Checkoutproduct';
 import {useGlobalContex} from './Context';
 import FlipMove from 'react-flip-move';
 import {useNavigate} from 'react-router-dom'
const Checkoutpage = () => {
    const navigate=useNavigate();
    const {basket,user} = useGlobalContex();
    let totalProduct= basket ? basket.length:0;
    let totalPrice=0;
     const getAllpructsPrice=()=>{
        basket?.forEach(element => {
            totalPrice += element.price;
        });
        return totalPrice;
    }
    if(basket?.length < 1 ){
        return <div className='empty__cart__page'>Your cart page is empty</div>
    }
  return (
    <div className='checkout__container'>
        <div className='checkout__product'>
        <div className='checkout__banner'>
            <img src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
 alt='banner' className='chk__banner__image'/>
        </div>
        <div className='checkout__user'>
            <h2>Hi  {user?.email || 'Guest'} check out your cart</h2>
        </div>
        
            <div className='checkout__items' >
            <FlipMove 
            duration={750}     
            easing="ease-out"
            >
                {basket?.map((item,index)=>{
                    const {id,image,title,price,rating} =item;
                    return (<Checkoutproduct image={image} title={title} key={index} price={price} rating={rating}   id={id}/> )
                })}
                </FlipMove>
            </div>
        </div>

        <div className='checkout__payment'>

               <div className='total__items'><span className='checkout__price__text'>Total item</span><span className='checkout__itemscount'>{totalProduct}</span></div>
               <div className='total__item__price'><span className='checkout__price__text'>Price</span><span className='checkout__itemscount'>{
                getAllpructsPrice()
               }</span></div>
               <button className='checkout__items_btn' onClick={()=>navigate('/checkoutpayment')}>Checkout item</button>
        </div>

    </div>
  )
}

export default Checkoutpage;
