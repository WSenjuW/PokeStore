import { ContentWeb } from './CWC/ContentWeb';
import React, { useState, useEffect } from 'react';
import NavTopV1 from './CWC/NavTop1_0.js';
import MenuFav from './menuFav';


export function WebBox(props) {
    const [Datos, setDatos] = useState([]);
    const [inputValue, setInputValue] = useState();
    const [favoritos, setFavoritos] = useState([...JSON.parse(window.localStorage.getItem("Favoritos"))]);
    const [carrito, setCarrito] = useState([...JSON.parse(window.localStorage.getItem("Carrito"))]);
    const [menuFavoritos, setMenuFavoritos] = useState("off");

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
        background: "#ED4747"
    }

    return (
        <div
            id='ContenidoWebBox'
            style={estilos}
        >
            <NavTopV1
                fav={favoritos.length}
                car={carrito.length}
                setIV={setInputValue}
                SetFMO={setMenuFavoritos}
                FMO={menuFavoritos}
            />
            {
                menuFavoritos=== "on"
                &&
                <MenuFav
                    favList={favoritos}
                    Datos={Datos}
                    SetFav={setFavoritos}
                    SetFMO={setMenuFavoritos}
                    FMO={menuFavoritos}
                />
            }

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

