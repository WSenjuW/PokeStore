import './PayScreen.css';
import NavTop from '../NavTop/NavTop1_0';
import React, { useState, useEffect } from 'react';
import { BsFillBagXFill } from 'react-icons/bs';




export default function PayScreen(props) {
    const [favoritos, setFavoritos] = useState([...JSON.parse(window.localStorage.getItem("Favoritos"))]);
    const [carrito, setCarrito] = useState([...JSON.parse(window.localStorage.getItem("Carrito"))]);
    const [productosTotal, setProductosTotal] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        window.localStorage.setItem("Carrito", JSON.stringify(carrito));

        let productos = 0;
        for (let i = 0; i < carrito.length; i++) {
         let numero = carrito[i].cantidad;
          productos += numero;
        }
        setProductosTotal(productos)

        let totalPrice = 0;
        for (let i = 0; i < carrito.length; i++) {
            const element = carrito[i];
            let item = (element['price']) * (element.cantidad);
            totalPrice += item
        }
        setTotalPrice(totalPrice)
    }, [carrito]);


    return (
        <div id='PSBox' >
            <NavTop
                    Datos={props.Datos}
                    favoritos={favoritos}
                    setFavoritos={setFavoritos}
                    carrito={carrito}
                    setCarrito={setCarrito}
                    option={true}
            />
            <div id='PB'>
                {carrito.length !== 0 ?
                    props.Datos.map(e =>
                        carrito.some(element => element.id === e.id ) === true
                        &&
                        <div key={e.id} className='itemCar'>
                            <section className='infoItem'>
                                <img className='imgItem' src={e.avatar} />
                                <h2 className='titleItem'>{e.name[0].toUpperCase() + e.name.slice(1)}</h2>
                            </section>
                            <p className='PPS'>${e.price}</p>
                            <div className='infoItem2'>
                                <div className='NumItems'>
                                    X<input
                                        className='inpNI'
                                        defaultValue={carrito.filter(el=> el.id === e.id)[0].cantidad}
                                        type='number'
                                        min={1}
                                        max={100}
                                        onBlur={(el) => el.target.value === '' || el.target.value == 0 ? (el.target.value = 1) : ""}
                                        onChange={(element)=>{
                                            let arr = carrito.map((el)=> el.id === e.id ? (el ={price:e.price,id:e.id,cantidad:JSON.parse(element.target.value)}):el);
                                            setCarrito(arr)
                                        }}
                                    />
                                </div>
                                <button className='btnDeletePS' onClick={() => setCarrito(carrito.filter(el => el.id !== e.id))} ><BsFillBagXFill /></button>
                            </div>
                        </div>)
                    :
                    <p id='msjContent'>You have no products in the bag yet.</p>
                }
            </div>
            <section id='PSB2'>
                <p id="PIB">{productosTotal} products</p>
                <div id='infoBuy'>
                    <p id='PIB'>Final price<br />${totalPrice}</p>
                    <button disabled={carrito.length === 0 ? true : false} id='btnBuy'>Buy</button>
                </div>
            </section>
        </div>
    )
}