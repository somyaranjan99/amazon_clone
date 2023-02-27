import { createContext,useContext,useReducer } from "react";
import { Reducer,initialState } from "./Reducer";
 const productContext=createContext();

const ProductProvider=({children})=>{
    const [state,dispatch]=useReducer(Reducer,initialState);
    return <productContext.Provider value={{...state,dispatch}}>
        {children}
    </productContext.Provider>
}
const useGlobalContex=()=>{
    return useContext(productContext)
}
export {useGlobalContex,ProductProvider};
