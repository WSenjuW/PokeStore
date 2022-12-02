import './App.css';
import { Home } from './Componentes/PS/Home';
import  LoadingScreen  from './Componentes/LS/LoadingScreen';
import  PayScreen  from './Componentes/BS/PayScreen';
import React, { useState, useEffect, createRef } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";




export default function App() {
  const [Datos, setDatos] = useState([]);
  const [typeData, setTypesData] = useState([]);
  const [loadingScreen, setLoadingScreen] = useState(null);

  useEffect(() => {
    let url = "https://pokeapi.co/api/v2/pokemon?limit=936offset=0";
    // En la siguiente funcion obtendermos los datos de los pokemones
    const getData = async (url) => {
      let Pt = await fetch(url);
      let Data = await Pt.json()

      let dataList = await Promise.all(
        Data.results.map(async (el) => {

          let Data = await fetch(el.url).catch();
          let jsDt = await Data.json();
          let info = await fetch(jsDt.species.url).catch();
          let infoJs = await info.json();

          let item = {
            name: jsDt.name,
            id: jsDt.id,
            avatar: jsDt.sprites.other['official-artwork'].front_default,
            gif: jsDt.sprites.versions['generation-v']['black-white'].animated.front_default,
            type: (jsDt.types.map(e => e.type.name)),
            height: jsDt.height / 10,
            weight: jsDt.weight / 10,
            genus: (infoJs.genera.filter((e) => e.language.name === "en")[0].genus),
            description: (infoJs.flavor_text_entries.filter(e => e.language.name === 'en')[0].flavor_text),
            price: (Math.round(jsDt.height * 3)),
          }
          return item
        })
      )
      setDatos(dataList);
      window.localStorage.setItem("data", JSON.stringify(dataList));
    }



    if (JSON.parse(window.localStorage.getItem("data")) !== null) setDatos(JSON.parse(window.localStorage.getItem("data")))
    else getData(url);

    // La siguiente función es para obtener los datos de los tipos de Pokemon's
    const url2 = `https://pokeapi.co/api/v2/type/`;
    const getTypeData = async (dirección) => {
      let data = await fetch(dirección);
      let jsdata = await data.json();
      let dataList = await Promise.all(jsdata.results.map(e => {
        return e.name
      }));
      setTypesData(dataList)
      window.localStorage.setItem("tyData", JSON.stringify(dataList));
    }
    if (window.localStorage.getItem("tyData" !== null))
      setTypesData(JSON.parse(window.localStorage.getItem("tyData")))
    else getTypeData(url2);



    let LSFav = window.localStorage.getItem("Favoritos")
    if (LSFav === null) window.localStorage.setItem("Favoritos", JSON.stringify([]));
    let LSCar = window.localStorage.getItem("Carrito")
    if (LSCar === null) window.localStorage.setItem("Carrito", JSON.stringify([]));


  }, []);

  useEffect(() => {
    Datos.length !== 0 &&
    setLoadingScreen(false)
  }, [Datos]);



  const routes = [
    { path: '/', name: 'Home', element: <Home data={Datos} t_d={typeData} />, nodeRef: createRef() },
    { path: '/pay', name: 'About', element: <PayScreen Datos={Datos} />, nodeRef: createRef() },
  ]

  return (
    <div className="App">
      {Datos.length !== 0
        &&
        <Router>
          <Routes>
            {routes.map((element) => 
            <Route key={element.name} element={element.element} path={element.path} />)}
          </Routes>
        </Router>
      }
      <LoadingScreen LSSwitch={loadingScreen} />
    </div>
  );
}
