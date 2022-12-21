import React, { useState, useEffect, createRef, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingScreen from './Componentes/LS/LoadingScreen';
import PayScreen from './Componentes/BS/PayScreen';
import { Home } from './Componentes/HS/Home';
import './App.css';
import { cartFavContext, datosContext } from './Contextos/Context';


const routes = [
  { path: '/', name: 'Home', element: <Home />, nodeRef: createRef() },
  { path: '/pay', name: 'About', element: <PayScreen />, nodeRef: createRef() },
]

export default function App() {
  const [loadingScreen, setLoadingScreen] = useState(null);
  const Datos = useContext(datosContext);
  const cartFav = useContext(cartFavContext);

  useEffect(() => {
    // // La siguiente función es para obtener los datos de los tipos de Pokemon's
    const getTypeData = async (url) => {
      let Pt = await fetch(`https://pokeapi.co/api/v2/type/`);
      let Data = await Pt.json();
      let dataList = await Promise.all(Data.results.map(e => e.name));
      Datos.dispatchDatos({ type: 'ADD_TIPOS_DATOS', data: dataList })
    }


    // En la siguiente función obtendremos los datos de los Pokemon's
    const getData = async (url) => {
      let pt0 = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`);
      let data = await pt0.json()

      let valueIter = Math.ceil(data.count / 11);

      let Url;
      let info = [];
      let Index = undefined;
      for (let i = 0; i < (data.count / valueIter); i++) {
        let Pt = await (i === 0 ? fetch(`https://pokeapi.co/api/v2/pokemon?limit=${valueIter}&offset=0`) : fetch(Url));
        let Data = await Pt.json();
        Url = Data.next

        let dataList = await Promise.all(
          Data.results.map(async (el, index) => {

            let Data = await fetch(el.url);
            let jsDt = await Data.json();

            let item = {
              name: el.name,
              id: jsDt.id,
              avatar: jsDt.sprites.other['official-artwork'].front_default,
              gif: jsDt.sprites.versions['generation-v']['black-white'].animated.front_default,
              type: (jsDt.types.map(e => e.type.name)),
              height: jsDt.height / 10,
              weight: jsDt.weight / 10,
              price: (Math.round(jsDt.height * 3)),
            }
            return item
          })
        )
        info = [...info, ...dataList]
        Index = i;
        Datos.dispatchDatos({ type: 'ADD_DATOS', data: info, index: Index, maxIndex: (Math.floor(data.count / valueIter)) })
      }
    }

    if (window.localStorage.getItem('datos') === null ) {   
       getTypeData(); getData()
       }
    else {
      let LS = JSON.parse(window.localStorage.getItem('datos'));
      let LS2 = JSON.parse(window.localStorage.getItem('cartFav'));
      Datos.dispatchDatos({ type: 'LS_DATOS', item: LS });
      if (LS2 !== null)  cartFav.dispatchCartFav({type:'LS_CARTFAV',item:LS2})
    }


  }, []);

  useEffect(() => { if (Datos.progreso === Datos.progresoFinal) setLoadingScreen(false) }, [Datos]);

  return (


    <div className="App">
      {Datos.progreso === Datos.progresoFinal &&
        <Router>
          <Routes>
            {routes.map((element) =>
              <Route key={element.name} element={element.element} path={element.path} />)}
          </Routes>
        </Router>}
      <LoadingScreen LSSwitch={loadingScreen} />
    </div>


  );
}
