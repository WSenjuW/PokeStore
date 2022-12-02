import { MdFavorite } from "react-icons/md";
import { BsFillCartFill, BsSearch } from "react-icons/bs";
import './NavTop1_0.css';
import React, { useRef, useState } from 'react';
import { Link } from "react-router-dom";
import MenuFav from './menuFav';


export default function NavTop(props) {
    const [inputSwitch, setInputSwitch] = useState(false);
    const [menuFavSwitch, setMenuFavSwitch] = useState(false);

    const inputRef = useRef();


    const estilosPanelMF = {
        position: "fixed",
        left: 0,
        top: 0,
        height: "100vh",
        width: "100vw",
        zIndex: "100"
    }

    function effectInput() {
            setInputSwitch(true);
            inputRef.current.focus()
    }




    return (
        <nav id='navTopBox'>
            {props.option === false ? <h1 id='titleNavTop' translate="no">Pokémon<br />Store</h1> : <Link id="titleNavTop" to="/" translate="no">Pokémon<br />Store</Link>}
            <div id='div_aux'>
                {
                    props.option === false &&
                    <>
                        <input
                            ref={inputRef}
                            type="text"
                            id='buscador'
                            onChange={(e) => props.setIV(e.target.value.toLocaleLowerCase())}
                            maxLength={12}
                            autoComplete="off"
                            style={{ width: (inputSwitch === false ? '0' : '200px') }}
                            onBlur={() => setInputSwitch(false)}
                        />
                        <button id="btnSearch" onClick={() => effectInput()}>
                            <BsSearch />
                        </button>
                    </>

                }

                <button
                    className="btnNavTop" onClick={() => menuFavSwitch === true ? setMenuFavSwitch(false) : setMenuFavSwitch(true)}  >
                    <MdFavorite />
                    {props.favoritos.length !== 0 && <span className="cantidad">{props.favoritos.length <= 9 ? props.favoritos.length : `9+`}</span>}
                </button>
                {
                    menuFavSwitch === true &&
                    <>
                        <MenuFav
                            Datos={props.Datos}
                            favoritos={props.favoritos}
                            setFavoritos={props.setFavoritos}
                            carrito={props.carrito}
                            setCarrito={props.setCarrito}
                            FMO={menuFavSwitch}
                            SetFMO={setMenuFavSwitch}
                            option={props.option}
                        />
                        <span id='panelMF'
                            style={estilosPanelMF}
                            onClick={() => setMenuFavSwitch(false)}
                        />

                    </>

                }
                {
                    props.option === false &&
                    <Link to='/pay'>
                        <button   className="btnNavTop"  >
                            
                            <BsFillCartFill />
                            {props.carrito.length !== 0 &&
                                <span className="cantidad">{props.carrito.length <= 9 ? props.carrito.length : "9+"}</span>
                            }
                        </button>
                    </Link>
                }
            </div>
        </nav>
    )
};

