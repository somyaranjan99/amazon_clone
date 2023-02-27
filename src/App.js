import React,{useEffect} from 'react';
import Header from './componets/Header';
import Home from './componets/Home';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Checkoutpage from './componets/Checkoutpage';
import Login from './componets/Login';
import { auth } from './componets/Firebase';
import {useGlobalContex} from './componets/Context'
function App() {
  const {dispatch}=useGlobalContex();
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
      console.log('User is Loddedin',authUser);
    })
 },[])
  return (
    <div className='App'>
      <BrowserRouter>
     {document.location.pathname!=='/login' && <Header />}
    <Routes>
      <Route exact path='/' element={ <Home />} /> 
      <Route exact path='/checkout' element={ <Checkoutpage />} />
      <Route path='login' element={<Login />} />
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
