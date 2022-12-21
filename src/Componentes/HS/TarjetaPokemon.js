import { useContext } from "react";
import { BsFillBagPlusFill, BsFillBagCheckFill, BsFillInfoCircleFill } from "react-icons/bs";
import { MdFavorite } from "react-icons/md";
import { cartFavContext } from "../../Contextos/Context";
import "./TarjetaPokemon.css";



export function TarjetaPokemon(props) {
    const {dispatchCartFav} = useContext(cartFavContext);

    return (
        <div className='card' >
            <div className="frontCard" >
                <img alt='#' className='cardImg' src={props.ELEMENT.avatar} />
                <ul className='Datos'>
                    <li className='cardName'>{props.ELEMENT.name[0].toUpperCase() + props.ELEMENT.name.substring(1)}</li>
                    <li className='type'>{props.ELEMENT.type.map((e, i) => <p key={i} className={'pType ' + e}>{e[0].toUpperCase() + e.substring(1)}</p>)}</li>
                    <li className='priceBox'>
                        <p className="pPrice">${Math.ceil(props.ELEMENT.price)}</p>
                        <button
                            className='btnBag'
                            onClick={(e) => dispatchCartFav({ type: 'ITEM_CARRITO', item: { id: props.ELEMENT.id, precio: props.ELEMENT.price,avatar:props.ELEMENT.avatar,nombre:props.ELEMENT.name , cantidad: 1 } })}
                            tabIndex={-1}
                        >
                            {props.carInclude === false
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
                    onClick={() => dispatchCartFav({ type: 'ITEM_FAVORITOS', item: props.ELEMENT.id })}
                    style={{ color: (props.favInclude === false ? "#fff" : "#e3435e") }}
                >
                    <MdFavorite />
                </button>
                <button
                    className="flipBtn"
                ><BsFillInfoCircleFill /></button>
            </div>
        </div>
    )
}