import React from 'react'
import './Product.css'
import StarIcon from '@mui/icons-material/Star';
import {useGlobalContex} from './Context'
const Product = ({id,title,price,rating,image}) => {
    const {basket,dispatch} =useGlobalContex();
    console.log(basket)
    const addToBasket=()=>{
        dispatch({
            type:'ADD_TO_CART',
            item:{
                id,title,price,rating,image
            }
        })
    }
  return (
    <>
          <div className='product__container'>
            <div className='product__price_star'>
            <p className='product__title'>{title}</p>
            <div className='product__price'><span>$</span>{price}</div>
                <div className='product__star'>
                    {Array(rating).fill().map((_,i)=>{
                        return(<span key={i}><StarIcon className='star__rattings'/></span>)
                    })}
                    
                </div>
            </div>
            <img src={image} alt='' className='product__img' />
            <button className='product_btn' onClick={addToBasket}>Add to cart</button>
           </div>

    </>
  )
}

export default Product