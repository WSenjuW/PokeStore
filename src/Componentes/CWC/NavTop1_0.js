import { MdFavorite } from "react-icons/md";
import { BsFillCartFill, BsSearch } from "react-icons/bs";
import './NavTop1_0.css';
import React, { useRef } from 'react';

export default function NavTop1_0(props) {
    const btnRef = useRef();
    const inputRef = useRef();

    const EffectMenu = () => {
        if (inputRef.current.style.width === "200px" && inputRef.current.value === "")
            inputRef.current.style.width = 0
        else inputRef.current.style.width = "200px"
    };
    return (
        <nav id='navTopBox'>
            <h1 id='titleNavTop'>Pokémon<br />Store</h1>
            <div id='div_aux'>
                <input
                    ref={inputRef}
                    type="text"
                    id='buscador'
                    onChange={(e)=> props.setIV(e.target.value.toLocaleLowerCase())}
                    disabled={false}
                    maxLength={12}
                    autoComplete="off"
                    onBlur={() =>
                        inputRef.current.value === "" &&
                            (inputRef.current.style.width = 0)
                    }
                />
                <button
                    id="btnSearch"
                    ref={btnRef}
                    onClick={EffectMenu}



                ><BsSearch /></button>
                <button
                 className="btnNavTop" 
                 onClick={()=> props.FMO === "on" ? props.SetFMO("off"):  props.SetFMO("on")}

                 >
                    <MdFavorite />
                    {props.fav !== 0 &&
                     <span className="cantidad">{props.fav <= 9 ? props.fav : "+9"}</span>
                    }
                </button>
                <button className="btnNavTop" >
                    <BsFillCartFill />
                    {props.car !== 0  &&
                    <span className="cantidad">{props.car}</span>
                    }
                </button>
            </div>
        </nav>
    )
};




