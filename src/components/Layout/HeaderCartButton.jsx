import React, { useContext, useEffect, useState } from 'react'
import CartIcon from '../Cart/CartIcon'
import classes from './HeaderCartButton.module.css';
import CartContext from '../../store/cart-context';

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);
  const [btnIsHigh, setBtnIsHigh] = useState(false); //버튼상태(애니메이션 적용여부)
  const {items} = cartCtx;

  useEffect(()=>{ //컨텍스트에 배열이 바뀔때 작동
    if(items.length === 0){
      return
    }
    setBtnIsHigh(true)
    const timer = setTimeout(()=>{
      setBtnIsHigh(false)
    },300)

    //사이드이팩트 정리,클린업함수
    return()=>{
      clearTimeout(timer);
    }

  }, [items])

  const btnClass = `${classes.button} ${btnIsHigh ? classes.bump: ''}`



  // const numberOfCartItems = cartCtx.items.length; -아이템숫자-> 아이템안의 amount 합해줘야한다!!
  //배열.reduce((합해진값,벨류) =>{합해진값+벨류},합해진값의 초기화)
  const numberOfCartItems = items.reduce((sum, item) => {
    return sum += item.amount;
  },0)


  return (
    <button 
      className={btnClass} 
      onClick={props.onclick}>
        <span className={classes.icon}><CartIcon /></span>
        <span>Your Cart</span>
        <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  )
}

export default HeaderCartButton;