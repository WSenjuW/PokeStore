import { MdFavorite } from "react-icons/md";
import { BsFillCartFill, BsSearch } from "react-icons/bs";
import './NavTop1_0.css';
import React, { useRef, useState, useEffect } from 'react';

export default function NavTop1_0(props) {
    const inputRef = useRef();
    const [seaInput, setSeaInput] = useState("off");

    useEffect(() => {
        if (seaInput === "on") inputRef.current.style.width = '200px'
        else inputRef.current.style.width = 0
    }, [seaInput]);



    const effectIn = () => {
        if (seaInput === 'on' && inputRef.current.value === "")
            setSeaInput('off')
        else {
            setSeaInput("on")
            inputRef.current.focus()
        }
    }

    return (
        <nav id='navTopBox'>
            <h1 id='titleNavTop' translate="no">Pokémon<br />Store</h1>
            <div id='div_aux'>
                <input
                    ref={inputRef}
                    type="text"
                    id='buscador'
                    onChange={(e) => props.setIV(e.target.value.toLocaleLowerCase())}
                    disabled={false}
                    maxLength={12}
                    autoComplete="off"
                    onBlur={(e) =>
                        e.target.value === ""
                        &&
                        setSeaInput("off")
                    }
                />
                <button
                    id="btnSearch"
                    onClick={effectIn}
                >
                    <BsSearch /></button>
                <button
                    className="btnNavTop"
                    onClick={() => props.FMO === "on" ? props.SetFMO("off") : props.SetFMO("on")}

                >
                    <MdFavorite />
                    {props.fav !== 0 &&
                        <span className="cantidad">{props.fav <= 9 ? props.fav : "+9"}</span>
                    }
                </button>
                <button className="btnNavTop" >
                    <BsFillCartFill />
                    {props.car !== 0 &&
                        <span className="cantidad">{props.car}</span>
                    }
                </button>
            </div>
        </nav>
    )
};




