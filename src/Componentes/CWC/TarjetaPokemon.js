import { BsFillBagPlusFill, BsFillBagCheckFill, BsFillInfoCircleFill, BsArrowRepeat } from "react-icons/bs";
import { MdFavorite } from "react-icons/md";
import "./TarjetaPokemon.css";
import React, { useRef } from 'react';



export function TarjetaPokemon(props) {
    const backCard = useRef();
    const frontCard = useRef();


    const efectoVolteo = () => {
        const fc = frontCard.current;
        const bc = backCard.current;

        if (fc.style.transform === "rotateY(180deg)") {
            const fc = frontCard.current;
            fc.style.transform = "rotateY(0deg)"
            bc.style.transform = "rotateY(180deg)"

        } else {
            fc.style.transform = "rotateY(180deg)"
            bc.style.transform = "rotateY(0deg)"

        }
    }
    async function effectCarrito(e) {
        let LSData = await window.localStorage.getItem("Carrito");
        let Data = await JSON.parse(LSData);

        if (!Data.includes(props.i_d)) {
            Data.push(props.i_d);
            props.setCarrito(Data);
        } else {
            let Data2 = Data.filter((e) => e !== props.i_d)
            props.setCarrito(Data2);
        }
    }





    async function effectFavorite(e) {
        let LSData = await window.localStorage.getItem("Favoritos");
        let Data = await JSON.parse(LSData);

        if (!Data.includes(props.i_d)) {
            Data.push(props.i_d);
            props.SetFav(Data);
        } else {
            let Data2 = Data.filter((e) => e !== props.i_d)
            props.SetFav(Data2);
        }
    }


    return (
        <div className='card' >
            <div className="frontCard" ref={frontCard}>
                <img alt='#' className='cardImg' src={props.imagen} />
                <ul className='Datos'>
                    <li className='cardName'>{props.nombre[0].toUpperCase() + props.nombre.substring(1)}</li>
                    <li className='type'>{props.tipos.map((e, i) => <p key={i} className={'pType ' + e}>{e[0].toUpperCase() + e.substring(1)}</p>)}</li>
                    <li className='priceBox'>
                        <p className="pPrice">${Math.ceil(props.precio)}</p>
                        <button
                            className='btnBag'
                            onClick={(e) => effectCarrito(e)}
                            tabIndex={-1}
                            >
                            {props.carInclude === "noActive"
                                ?
                                <BsFillBagPlusFill />
                                :
                                <BsFillBagCheckFill />
                            }
                        </button>
                    </li>
                </ul>
                <button
                tabIndex={-1}
                    className='btnFavorite'
                    onClick={() => effectFavorite()}
                    style={{ color: (props.favInclude === "noActive" ? "#fff" : "#e3435e") }}
                    >
                    <MdFavorite />
                </button>
                <button 
                 className="flipBtn"
                 onClick={efectoVolteo}
                 ><BsFillInfoCircleFill/></button>
            </div>
            <div ref={backCard} className="backCard">
              {props.genus === undefined ? "" : <h3 className="genus">{props.genus}</h3>}
                <p className="pDes">{props.description}</p>  
                <ul className="datos2">
                    <li className="heightP">Height<br />{props.altura}m</li>
                    <li>Weight<br/>{props.peso}Kg</li>
                </ul>
                <button 
                className="btnFlip" 
                onClick={efectoVolteo}
                >
                <BsArrowRepeat/></button>
            </div>
        </div>
    )
}