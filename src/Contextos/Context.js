import React, { useReducer, useEffect,useState } from 'react';

const datosContext = React.createContext();
const cartFavContext = React.createContext();
const productoContext = React.createContext();

const initialStateCartFav = {
  carrito: [],
  favoritos: [],
  default: true
}

const reducerDatos = (state, action) => {
  switch (action.type) {
    case 'LS_DATOS': return { ...action.item };
    break;
    case 'ADD_DATOS':   return {   ...state,   datos: action.data, progreso: action.index, progresoFinal: action.maxIndex};
    break;
    case 'ADD_TIPOS_DATOS': return { ...state, tiposDatos: action.data };
    default: return initialStateDatos
      break;
  };
}

const reducerCartFav = (state, action) => {
  switch (action.type) {
    case 'ITEM_CARRITO': {
      if (state.carrito.some((el) => el.id === action.item.id)) return { ...state, default:false, carrito: state.carrito.filter((element) => element.id !== action.item.id) };
      else return { ...state, default:false, carrito: [...state.carrito, action.item] };
    };
      break;
    case 'ITEM_FAVORITOS': {
      if (state.favoritos.includes(action.item)) return { ...state, default:false, favoritos: state.favoritos.filter((element) => element !== action.item) };
      else return { ...state, default:false, favoritos: [...state.favoritos, action.item] };
    };
      break;
    case 'UPDATE_ITEM_CARRITO': return { ...state, default:false, carrito: state.carrito.map((e) => e.id === action.item.id ? { ...e, cantidad: action.item.cantidad } : e) };
      break;
    case 'LS_CARTFAV': return { ...action.item};
      break;
    default: return initialStateCartFav;
      break;
  };
}

const initialStateDatos = {
  datos: [],
  tiposDatos: [],
  progreso: 0,
  progresoFinal: null,
}

const AppProvider = ({ children }) => {
  const [Datos, dispatchDatos] = useReducer(reducerDatos, initialStateDatos);
  const [cartFav, dispatchCartFav] = useReducer(reducerCartFav, initialStateCartFav);
  const [pView, setPView] = useState(undefined);


  useEffect(() => {
    if (cartFav.default === false) window.localStorage.setItem('cartFav', JSON.stringify(cartFav));
  }, [cartFav]);

  useEffect(() => {
    if (Datos.progreso === Datos.progresoFinal && window.localStorage.getItem('cartFav') === null) window.localStorage.setItem('datos', JSON.stringify(Datos))
  }, [Datos]);

  return (
    <datosContext.Provider value={{ ...Datos, dispatchDatos }}>
      <cartFavContext.Provider value={{ ...cartFav, dispatchCartFav }}>
        <productoContext.Provider value={{pView,setPView}}>
        {children}
        </productoContext.Provider>
      </cartFavContext.Provider>
    </datosContext.Provider>
  )
}

export {
  datosContext,
  cartFavContext,
  productoContext,
  AppProvider
}