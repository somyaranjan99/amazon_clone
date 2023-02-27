import React,{useState} from 'react'
import './Login.css';
import {  createUserWithEmailAndPassword,signInWithEmailAndPassword  } from 'firebase/auth';
import { auth } from './Firebase';
import { useNavigate } from 'react-router-dom';
function Login() {
  const navigate=useNavigate();
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const handleSignin=async(e)=>{
    e.preventDefault();
    await signInWithEmailAndPassword(auth,email,password).then((user)=>{
     
      if(user?.user.uid){
        navigate('/');
      }
      
    }).catch((error)=>{
      console.log(error);
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    })
  }
  const handleSignup=async(e)=>{
    e.preventDefault();
    await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
     
       if(userCredential){
        navigate("/login");
       }
    })
    .catch((error) => {
      console.log(error);
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
    });
  }
  return (
    <div className='login__wrapper'>
        <img src='http://pngimg.com/uploads/amazon/amazon_PNG11.png' className='login__logo' alt="loginlogo"/>
        <div className='login'>
           
            <form>
            <div className='sign__in__container'>
            <h2 className='signin__header'>Sign-in</h2>
                <div className='login__input__container'>
                <label htmlFor='email'>Email</label>
                <input  type="email" id='email' value={email}  className='login__email' onChange={(e)=>setEmail(e.target.value)}/>

                </div>
                <div className='login__input__container'>
                <label htmlFor='password'>Password</label>
                <input type="password" id="password" value={password} onChange={(e)=>setPassword(e.target.value)} className='login__password' />

                </div>
                <button className='login__signin' type='submit' onClick={handleSignin}>Sign-in</button>
               <p className='signin__privacy'>By continuing, you agree to Amazon's Conditions of Use and Privacy Notice.</p>
               </div>
               <div className='create__act__text'><p>New to Amazon?</p></div>
                <button className='login__signup' onClick={handleSignup}>Create your Amazon account</button>
            </form>
        </div>
    </div>
  )
}

export default Login