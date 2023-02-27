import React from 'react'
import './Header.css';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import ShoppingCartSharpIcon from '@mui/icons-material/ShoppingCartSharp';
import {Link,useNavigate} from 'react-router-dom';
import {useGlobalContex} from './Context';
import { auth } from './Firebase';
function Header() {
  const {basket,user}=useGlobalContex();
  const navigate=useNavigate();
 // console.log(useGlobalContex())
 const handleSingnout=(event)=>{
  event.preventDefault();
  auth.signOut();
  navigate("/");
 }
  return (
    <div className='header'>
         <Link to="/" className='logo__wrapper'><img src='http://pngimg.com/uploads/amazon/amazon_PNG11.png' alt='amazonlogo' className='header__logo' /></Link>
        <div className='header__search'>
            <input type="text" className='header__searchiput'/>
            <SearchSharpIcon className='header__searchicon'/> 
        </div>
        <div className='header__nav'>
            <div className='header__options'>
            <span className='option__lineOne'>Hello {user?.email || 'Guest'}</span>
            <span className='option__lineTwo' >{user?.uid ? <Link to="/logout" onClick={handleSingnout}>Sign out</Link>: <Link to="/login" >Sign in</Link>}</span>
            </div>
            <div className='header__options'>
            <span className='option__lineOne'>Return</span>
            <span className='option__lineTwo'>orders</span>
            </div>
            <div className='header__options'>
            <span className='option__lineOne'>Return</span>
            <span className='option__lineTwo'>orders</span>
            </div>
            <div className='header__options header__basket'>
            <span className='option__lineOne'>
            <Link to="/checkout"> <ShoppingCartSharpIcon /></Link> 
            </span>
            <span className='option__lineTwo'>{basket?.length}</span>
            </div>
            
        </div>

    </div>
  )
}

export default Header