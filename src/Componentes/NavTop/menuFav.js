import './menuFav.css';
import { BsFillBagPlusFill,BsFillBagXFill,BsFillXCircleFill  } from "react-icons/bs";


export default function MenuFav(props) {


    return (
        <div
            id='menuFavBox'
        >
            <span id={props.option === true ? 'puntaMF2': 'puntaMF' } />
            <ul id='contenidoMF'>
                {
                    props.favoritos.length !== 0
                        ?
                        props.Datos.map((e) =>
                            props.favoritos.includes(e.id) &&
                            <li className='itemMF' key={e.id}>
                                <img
                                    alt={"img " + e.name}
                                    src={e.gif === null ? e.avatar : e.gif}
                                    className="imgMF"
                                />
                                <p className='pItemMF'>{e.name}</p>
                                <button
                                className='btnMF'
                                onClick={()=>props.carrito.some(elemento => elemento.id === e.id) === false ? props.setCarrito([...props.carrito,{price:e.price,id:e.id,cantidad:1}]) : props.setCarrito([...props.carrito.filter(ele=> ele.id !== e.id)]) }
                                >{ props.carrito.some((el) => el.id === e.id) === false ? <BsFillBagPlusFill/>:<BsFillBagXFill/> }</button>
                                <button className='btnMF'
                                    tabIndex={-1}
                                    onClick={() => props.setFavoritos(props.favoritos.filter(el=> el !== e.id))}
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