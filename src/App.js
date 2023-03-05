import React,{useEffect} from 'react';
import Header from './componets/Header';
import Home from './componets/Home';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Checkoutpage from './componets/Checkoutpage';
import Login from './componets/Login';
import { auth } from './componets/Firebase';
import {useGlobalContex} from './componets/Context';
import Checkoutpayment from './componets/Checkoutpayment';
import {loadStripe} from '@stripe/stripe-js';
import {
  Elements
} from '@stripe/react-stripe-js';
function App() {
  const {user,dispatch}=useGlobalContex();
  const stripePromise= loadStripe('pk_test_51Mh5hgSCpGq4zLI3rjdv1ZfbvyssBVpJ9NqqNJWgnjrU9edtp7lI4gUvNM7doXioDWEFNfkE7tPKRxCgSOdEjmcR00VNIVbNRi');
 useEffect(()=>{
    auth.onAuthStateChanged(authUser=>{
      if(authUser){
        dispatch({
          type:'GET_USER',
          user:authUser
        })
      }else{
        dispatch({
          type:'GET_USER',
          user:null
        })
      }
     
    })
 },[])
  return (
    <div className='App'>
      <BrowserRouter>
     {document.location.pathname!=='/login' && <Header />}
    <Routes>
      <Route exact path='/' element={ <Home />} /> 
      <Route exact path='/checkout' element={ <Checkoutpage />} />
      <Route exact path='/checkoutpayment' element={user ?
      <Elements stripe={stripePromise}><Checkoutpayment /></Elements>
      :<Home/>} />
      <Route path='login' element={<Login />} />
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
