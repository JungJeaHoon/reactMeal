import React, { useReducer } from 'react'
import CartContext from './cart-context'

//reducer 함수 정의
const cartReducer = (state, action) => {
  if(action.type === 'ADD'){    
    const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
    //배열.findIndex() -제일 먼저 나오는 조건에 맞는 아이템의 인덱스를 반환
    const existingCartItemIndex = state.items.findIndex((item)=>item.id === action.item.id)
    const existingCartItem = state.items[existingCartItemIndex]; //기존아이템이 없을 경우  underfinded    

    let updatedItems;
    if(existingCartItem ){
    //추가한 아이템이 기존에 있는 아이템일 경우
    const updatedItem = {
      ...existingCartItem, 
      amount: existingCartItem.amount + action.item.amount }
      updatedItems = [...state.items]   //기존 객체를 새 배열로
      updatedItems[existingCartItemIndex] = updatedItem;  //값을 더해준 기존 아이템
    }else{
      //추가한 아이템이 기존에 없는 아이템일 경우
      updatedItems = state.items.concat(action.item);
    }
    return {
      items:updatedItems,   
      totalAmount:updatedTotalAmount , 
    }
  }
  if(action.type === 'REMOVE'){
    const existingCartItemIndex = state.items.findIndex((item)=>item.id === action.id)
    const existingCartItem = state.items[existingCartItemIndex]; //기존아이템이 없을 경우  underfinded    
    const updatedTotalAmount = state.totalAmount - existingCartItem .price; //총합계에서 현재 아이템 가격을 빼줌

    let updatedItems;
    if(existingCartItem.amount === 1 ){
    //1인 상태에서 빼주면 완전히 사라져야함
    updatedItems = state.items.filter((item)=> item.id !== action.id);
    }else{
      const updatedItem = {
        ...existingCartItem,
        amount:existingCartItem.amount-1,
      }
      updatedItems = [...state.items]   //기존 객체를 새 배열로
      updatedItems[existingCartItemIndex] = updatedItem;  //값을 빼준 기존 아이템
    }
    return {
      items:updatedItems,   
      totalAmount:updatedTotalAmount , 
    }
  }
  return defaultCartState;
} 
  // switch (action.type){
  //   case "ADD":
  //     return {
  //       tems:state.items.concat(action.item),   
  //       totalAmount: state.items.totalAmount + action.item.price*action.item.amount 
  //     }
  // }

//Reducer 초기화 정의
const defaultCartState = {
  items:[],   
  totalAmount: 0, 
}

const CartProvide = (props) => {
//useReducer호출(선언)
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState)
  

  const addItemToCartHandler = (item)=>{
    dispatchCartAction({type:"ADD" , item})
  };
  const removeItemFromCartHandler = (id)=>{
    dispatchCartAction({type:"REMOVE" , id:id})
  };

  //업데이트될 대체 -다이나믹하게 변하게 부분
  const cartContext = {
    items:cartState.items,   
    totalAmount: cartState.totalAmount, 
    addItem:addItemToCartHandler,
    removeItem:removeItemFromCartHandler
  }

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  )
}

export default CartProvide;