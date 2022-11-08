import './menuFav.css';
import { BsFillBagPlusFill,BsFillXCircleFill  } from "react-icons/bs";


export default function MenuFav(props) {




    return (
        <div
            id='menuFavBox'
        >
            <span id='puntaMF' />
            <ul id='contenidoMF'>
                {
                    props.favList.length !== 0
                        ?
                        props.Datos.map((e) =>
                            props.favList.includes(e.id) &&
                            <li className='itemMF' key={e.id}>
                                <img
                                    alt={"img " + e.name}
                                    src={e.gif === null ? e.avatar : e.gif}
                                    className="imgMF"
                                />
                                <p className='pItemMF'>{e.name}</p>
                                <button
                                className='btnMF'
                                onClick={()=>props.carList.includes(e.id) === false ? props.SetCarrito([...props.carList,e.id]): props.SetCarrito([...props.carList.filter(el => el !== e.id)])}
                                ><BsFillBagPlusFill/></button>
                                <button className='btnMF'
                                    tabIndex={-1}
                                    onClick={() => props.SetFav([...props.favList.filter((el) => el !== e.id)])}
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