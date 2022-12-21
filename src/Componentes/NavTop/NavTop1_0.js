import { MdFavorite } from "react-icons/md";
import { BsFillCartFill, BsSearch } from "react-icons/bs";
import './NavTop1_0.css';
import React, { useContext,  useRef, useState } from 'react';
import { Link } from "react-router-dom";
import MenuFav from './menuFav';
import { cartFavContext } from "../../Contextos/Context";


export default function NavTop(props) {
    const {carrito, favoritos} = useContext(cartFavContext);
    const [inputSwitch, setInputSwitch] = useState(false);
    const [menuFavSwitch, setMenuFavSwitch] = useState(false);

    const inputRef = useRef();

    function effectInput() {
        setInputSwitch(true);
        inputRef.current.focus()
    }


    return (
        <nav id='navTopBox'>
            {props.setIV !== undefined ? <h1 id='titleNavTop' translate="no">Pokémon<br />Store</h1> : <Link id="titleNavTop" to="/" translate="no">Pokémon<br />Store</Link>}
            <div id='div_aux'>
                {
                    props.setIV !== undefined &&
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
                    className="btnNavTop" 
                    onClick={() => menuFavSwitch === true ? setMenuFavSwitch(false) : setMenuFavSwitch(true) }
                      >
                    <MdFavorite />
                    {favoritos.length !== 0 && <span className="cantidad">{favoritos.length <= 9 ? favoritos.length : `9+`}</span>}
                </button>
                {
                    menuFavSwitch === true &&
                    <>
                        <MenuFav
                            FMO={menuFavSwitch}
                            SetFMO={setMenuFavSwitch}
                            option={props.setIV !== undefined ? false : true}
                        />
                        <span id='panelMF'
                            onClick={() => setMenuFavSwitch(false)}
                        />

                    </>

                }
                {
                    props.setIV !== undefined &&
                    <Link to='/pay'>
                        <button className="btnNavTop"  >

                            <BsFillCartFill />
                            {carrito.length !== 0 &&
                                <span className="cantidad">{carrito.length <= 9 ? carrito.length : "9+"}</span>
                            }
                        </button>
                    </Link>
                }
            </div>
        </nav>
    )
};

