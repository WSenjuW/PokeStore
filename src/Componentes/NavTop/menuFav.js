import './menuFav.css';
import { BsFillBagPlusFill,BsFillXCircleFill, BsFillBagCheckFill  } from "react-icons/bs";
import { useContext } from 'react';
import { datosContext, cartFavContext } from '../../Contextos/Context';


export default function MenuFav(props) {
 const {datos} = useContext(datosContext);
 const {carrito,favoritos, dispatchCartFav} = useContext(cartFavContext);


    return (
        <div id='menuFavBox'  >
            <span id={props.option === true ? 'puntaMF2': 'puntaMF' } />
            <ul id='contenidoMF'>
                {
                    favoritos.length !== 0
                        ?
                        datos.map((e) =>
                            favoritos.includes(e.id) &&
                            <li className='itemMF' key={e.id}>
                                <img
                                    alt={"img " + e.name}
                                    src={e.gif === null ? e.avatar : e.gif}
                                    className="imgMF"
                                />
                                <p className='pItemMF'>{e.name[0].toUpperCase() + e.name.substring(1)}</p>
                                <button
                                className='btnMF'
                                onClick={()=>dispatchCartFav({ type: 'ITEM_CARRITO', item: { id: e.id, precio: e.price,avatar:e.avatar,nombre:e.name , cantidad: 1 } })}
                                >{ carrito.some((el) => el.id === e.id) === false ? <BsFillBagPlusFill/>:<BsFillBagCheckFill/> }</button>
                                <button className='btnMF'
                                    tabIndex={-1}
                                    onClick={() => dispatchCartFav({ type: 'ITEM_FAVORITOS', item: e.id })}
                                ><BsFillXCircleFill/></button>
                            </li>
                        )
                        :
                        <p id="mensajeMF">You have no products in this list</p>
                }
            </ul>
        </div>
    )
} 