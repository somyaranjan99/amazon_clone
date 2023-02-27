import React from 'react'
import './Checkout.css';
 import Checkoutproduct from './Checkoutproduct';
 import {useGlobalContex} from './Context'
const Checkoutpage = () => {
    const {basket} = useGlobalContex();
    let totalProduct= basket ? basket.length:0;
    let totalPrice=0;
    function getAllpructsPrice(){
        basket?.forEach(element => {
            totalPrice += element.price;
        });
        return totalPrice;
    }
  return (
    <div className='checkout__container'>
        <div className='checkout__product'>
        <div className='checkout__banner'>
            <img src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
 alt='banner' className='chk__banner__image'/>
        </div>
            <div className='checkout__items'>
                {basket?.map((item)=>{
                    const {id,image,title,price,rating} =item;
                    return (<Checkoutproduct image={image} title={title} price={price} rating={rating}  key={id} id={id}/> )
                })}
            
            </div>
        </div>

        <div className='checkout__payment'>

               <div className='total__items'><span className='checkout__price__text'>Total item</span><span className='checkout__itemscount'>{totalProduct}</span></div>
               <div className='total__item__price'><span className='checkout__price__text'>Price</span><span className='checkout__itemscount'>{
                getAllpructsPrice()
               }</span></div>
        </div>

    </div>
  )
}

export default Checkoutpage