import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Instance from '../Axios';
import './checkoutpayment.css';
import {useGlobalContex} from './Context';
import {
    CardElement,
    useStripe,
    useElements,
  } from '@stripe/react-stripe-js';
function Checkoutpayment() {
    const navigate=useNavigate();
    const[address,setAddress]=useState(false);
    const[showProducts,setShowProducts]=useState(false);
    const[papymet,setPapymet]=useState(false);
    const[card,setCard] =useState();
    const[cardDate,setcardDate] =useState('');
    const[carCvv,setCvv] =useState('');
    const {basket} = useGlobalContex('');
    const [error,setError] = useState(null);
    const [disabled,setDisabled] = useState(null);
    const [processing,setProcessing] = useState(false);
    const [clientSecret,setClientSecret]=useState('')
    const stripe = useStripe();
    const elements = useElements();
    
    const getAllpructsPrice=()=>{
        let totalPrice=0;
       basket?.forEach(element => {
           totalPrice += element.price;
       });
       return Math.round(totalPrice);
   }

   useEffect(()=>{
    const getClientSecret=async()=>{
        setProcessing(true);
        const response= await Instance({
            method:'POST',
            url:`/payment/create?total=${getAllpructsPrice()*100}`
        });
        setClientSecret(response.data.clientSecret);
        setProcessing(false);
    }
    getClientSecret();
   },[basket]);
   console.log('client secret =>>>>>>>>>' ,clientSecret);
   const IsNumeric = (num) => /^-{0,1}\d*\.{0,1}\d+$/.test(num);
   const handleCard=(event)=>{
    try {
        setCard(IsNumeric(event.target.value)  ?event.target.value:'' )
    } catch (error) {
        console.log('Valid input')
    }
   }
   const handleCvv=(event)=>{
    try{
        setCvv(IsNumeric(event.target.value) ? event.target.value:'');
    }catch(err){
        console.log(err)
    }
   
   }
   const handleSubmit=async (event)=>{
    event.preventDefault();
    const payload= await stripe.confirmCardPayment(clientSecret,{
        payment_method:{
            card:elements.getElement(CardElement)
        }
    }).then(({paymentIntent})=>{
        
        setProcessing(false);
        setError('');
        navigate('/orders');
    })

   }
   const handleChange=(event)=>{
    setDisabled(event.empty);
    setError(event.error?event.error.message:'')
   }
  return (
    <div className='checkoutpayment'>
        <div><h2>Checkout(0 items)</h2></div>
        <div className='delivery__address' ><h2 onClick={()=>setAddress(!address)}>Delivery Address</h2>
          
            {address && <div className='chkpayment__toggle'>
            <div>
                <span>Name:</span>
                <span>Somyaranjan Das</span>
            </div>
            <div>
                <span>Address:</span>
                <span>At/post- Barkote</span>
            </div>
            <div>
                <span>Dist:</span>
                <span>Deogarh</span>
            </div>
            <div>
                <span>Country:</span>
                <span>India</span>
            </div>
            </div>
            }
        </div>
        <div className='review__items' ><h2 onClick={()=>setShowProducts(!showProducts)}>Review items and delivery</h2>
            {showProducts && <div className='checkout__payment__items'>
                    {basket?.map((item)=>{
                        const {id,image,title,price,rating} =item;
                        return(<div key={id} className="checkoutpayment__items__wrapper">
                          
                            <img className='checkoutpayment__image' src={image} alt="noimage" />
    
                            <div className='checkoutpayment__info'>
                                <p className='checkoutpayment__title'>{title}</p>
                                <p className="checkoutpayment__price">
                                    <small>$</small>
                                    <strong>{price.toFixed(2)}</strong>
                                </p>
                                <div className="checkoutpayment__rating">
                                    {Array(rating)
                                    .fill()
                                    .map((_, i) => (
                                        <p>🌟</p>
                                    ))}
                                </div>
                            </div>
                       
                    </div>)
                    })}
                    
            </div>}
         </div>
        <div className='payment__method' ><h2 onClick={()=>setPapymet(!papymet)}>Payment Method</h2>
                {papymet && <div className='checkoutpayment__payment__method'>
                    <div className='totalprice'><span>Total price:</span><span>{getAllpructsPrice()}</span></div>
                    {
                        <form onSubmit={handleSubmit}>
                       
                            <CardElement onChange={(event)=>handleChange(event)} options={{ hidePostalCode: true }}/>
                            {/* <div className='card__details'>
                            <label htmlFor='cardnum'>Card number</label>
                            <input type="text" id="cardnum" value={card} maxlength="16" name="cardnum" onChange={(event)=>handleCard(event)}/>
                            </div>
                             <div className='card__cvv_align'>
                               <div>
                                    <label htmlFor='expiredate' >Expire Date:</label>
                                    <input type="text"  id="expiredate" placeholder="MM / YY" value={cardDate} onChange={(event)=>setcardDate(event.target.value)}/>
                                    
                                </div>
                                <div>
                                    <label htmlFor='cvv'>Cvv:</label>
                                    <input type="password" maxlength="4" minlength="3" id="cvv" value={carCvv} onChange={(event)=>handleCvv(event)}/>
                                </div>    
                            </div>    */}
                             <input type="submit" value={processing?'Processing':'Submit'}  className='checkout__payment__btn' disabled={processing?true:false} /> 
                            
                           
                        </form>

                  
 }
                </div>}
        </div>
    </div>
  )
}

export default Checkoutpayment;