import React from 'react'
import './Checkpoutproduct.css';
import {useGlobalContex} from './Context'
function Checkoutproduct({id,image,title,price,rating}) {
    const {basket,dispatch} =useGlobalContex();
    const removeBasket=(id)=>{
        dispatch({type:'REMOVE_BASKET',itemId:id})
    }
   
  return (
    <div className='checkoutProduct'>
            <img className='checkoutProduct__image' src={image} alt="noimage" />

            <div className='checkoutProduct__info'>
                <p className='checkoutProduct__title'>{title}</p>
                <p className="checkoutProduct__price">
                    <small>$</small>
                    <strong>{price.toFixed(2)}</strong>
                </p>
                <div className="checkoutProduct__rating">
                    {Array(rating)
                    .fill()
                    .map((_, i) => (
                        <p>🌟</p>
                    ))}
                </div>
               
                    <button onClick={()=>removeBasket(id)}>Remove from Basket</button>
                
            </div>
        </div>
  )
}

export default Checkoutproduct