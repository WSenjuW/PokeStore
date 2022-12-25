import './PayScreen.css';
import NavTop from '../NavTop/NavTop1_0';
import React, { useState, useContext, useEffect } from 'react';
import { BsFillBagXFill } from 'react-icons/bs';
import { cartFavContext, productoContext } from '../../Contextos/Context';




export default function PayScreen(props) {
    const { carrito, dispatchCartFav } = useContext(cartFavContext);
    const [total, setTotal] = useState({ TotalPrecio: 0, TotalProductos: 0 });
    const { setPView } = useContext(productoContext);

    useEffect(() => {
        let TotPrecio = 0;
        let TotProductos = 0;

        for (let i = 0; i < carrito.length; i++) {
            TotPrecio += (carrito[i].cantidad * carrito[i].precio);
            TotProductos += carrito[i].cantidad;
        };
        setTotal({ TotalPrecio: TotPrecio, TotalProductos: TotProductos })
    }, [carrito]);


    return (
        <div id='PSBox' >
            <NavTop />
            <div id='PB'>
                {carrito.length !== 0 ?
                    carrito.map(e =>
                        carrito.some(element => element.id === e.id) === true
                        &&
                        <div key={e.id}
                            className='itemCar'


                        >
                            <section
                                className='infoItem'
                                onClick={() => setPView(e.id)}
                            >
                                <img className='imgItem' alt={e.nombre} src={e.avatar} />
                                <h2 className='titleItem'>{e.nombre[0].toUpperCase() + e.nombre.slice(1)}</h2>
                            </section>
                            <div className='infoItem2'>
                                <p className='PPS'>${e.precio}</p>
                                <div className='NumItems'>
                                    X<input
                                        className='inpNI'
                                        defaultValue={carrito.filter(el => el.id === e.id)[0].cantidad}
                                        type='number'
                                        min={1}
                                        max={100}
                                        onBlur={(el) => el.target.value === '' || el.target.value === 0 ? (el.target.value = 1) : ""}
                                        onChange={(element) => {
                                            dispatchCartFav({ type: 'UPDATE_ITEM_CARRITO', item: { ...e, cantidad: parseInt(element.target.value) } })
                                        }}
                                    />
                                </div>
                            </div>
                            <button className='btnDeletePS'
                                onClick={() => dispatchCartFav({ type: 'ITEM_CARRITO', item: { id: e.id, precio: e.price, avatar: e.avatar, nombre: e.name, cantidad: 1 } })}
                            >
                                <BsFillBagXFill />
                            </button>
                        </div>)
                    :
                    <p id='msjContent'>You have no products in the bag yet.</p>
                }
            </div>
            <section id='PSB2'>
                <p id="PIB">{total.TotalProductos} Products</p>
                <div id='infoBuy'>
                    <p id='PIB'>Total ${total.TotalPrecio}</p>
                    <button disabled={carrito.length === 0 ? true : false} id={carrito.length === 0 ? 'btnBuy2' : 'btnBuy'}>Buy</button>
                </div>
            </section>
        </div>
    )
}