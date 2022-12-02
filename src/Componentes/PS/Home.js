import { ContentWeb } from './ContentWeb';
import React, { useState, useEffect } from 'react';
import  NavTop  from '../NavTop/NavTop1_0';

export function Home(props) {
    const [Datos, setDatos] = useState([]);
    const [inputValue, setInputValue] = useState();
    const [favoritos, setFavoritos] = useState([...JSON.parse(window.localStorage.getItem("Favoritos"))]);
    const [carrito, setCarrito] = useState([...JSON.parse(window.localStorage.getItem("Carrito"))]);

    useEffect(() => {
        window.localStorage.setItem("Favoritos", JSON.stringify(favoritos))
    }, [favoritos]);


    useEffect(() => {
        window.localStorage.setItem("Carrito", JSON.stringify(carrito))
    }, [carrito]);



    useEffect(() => {
        setDatos(props.data)
    }, [props.data]);


    const estilos = {
        display: "flex",
        width: "auto",
        height: "auto",
        padding: "90px 0 0 0",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        minWidth: "100vw",
        minHeight: "calc(100vh - 90px)",
        background: "#ED4747",
        position: "relative"
    }


    return ( <div
                id='ContenidoWebBox'
                style={estilos}
            >
                <NavTop
                    Datos={Datos}
                    favoritos={favoritos}
                    setFavoritos={setFavoritos}
                    carrito={carrito}
                    setCarrito={setCarrito}
                    setIV={setInputValue}
                    option={false}
                />


                <ContentWeb
                    data={Datos}
                    i_v={inputValue}
                    type_data={props.t_d}
                    SetFav={setFavoritos}
                    fav={favoritos}
                    setCarrito={setCarrito}
                    carrito={carrito}
                />
            </div>
    );
}

