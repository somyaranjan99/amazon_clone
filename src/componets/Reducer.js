

export const initialState={
    basket:[],
    user:null
}

export const Reducer=(state,action)=>{
    switch(action.type){
        case 'ADD_TO_CART':
            return{
                ...state,
                basket:[...state.basket,action.item]
            }
        case 'REMOVE_BASKET':
            
            return {
                ...state,
                basket:state.basket.filter(item=>item.id!==action.itemId)
            }
        case 'GET_USER':
            return{
                ...state,
                user:action.user
            }
            default:
                return state;
    }
}