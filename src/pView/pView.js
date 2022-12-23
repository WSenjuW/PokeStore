import { useContext, useEffect, useState } from "react"
import { BsFillBagCheckFill, BsFillBagPlusFill } from "react-icons/bs";
import { MdFavorite } from "react-icons/md";
import { cartFavContext, productoContext } from "../Contextos/Context"
import './pView.css'


export default function PView(props) {
    const productos = useContext(productoContext);
    const cartFav = useContext(cartFavContext);
    const [info, setInfo] = useState(undefined);



    useEffect(() => {
        async function datos() {
            const pt = await fetch(props.el.description);
            const js = await pt.json()

            setInfo({
                genus: js.genera.filter(e => e.language.name === 'en')[0].genus,
                description: js['flavor_text_entries'].filter(e => e.language.name === 'en')[0]['flavor_text'].replace('', ""),
                isLegendary: js['is_legendary'],
                isMythical: js['is_mythical']
            })
        }
        datos()
    }, []);


    return (
        <section id='PView'>
            <div id='panelProducto'
                onClick={() => productos.setPView(undefined)}
            />
            <div id='producto'>
                <button className="btnSectionFav"
                    style={{ color: (cartFav.favoritos.find(e => e === props.el.id) === undefined ? '#fff' : "#e3435e") }}
                    onClick={() => cartFav.dispatchCartFav({ type: 'ITEM_FAVORITOS', item: props.el.id })}
                > <MdFavorite />
                </button>
                <section className='section1'>

                    <img id='imgPV' src={props.el.avatar} alt={props.el.name} />
                    <div id="BAuxPV">
                        <h2 id='titlePV' translate="no">{props.el.name[0].toUpperCase() + props.el.name.substring(1)}</h2>
                        <div id='tiposPV'>{props.el.type.map((e, i) => <p key={i} className={'pTypePV ' + e}>{e[0].toUpperCase() + e.substring(1)}</p>)}</div>
                        {info !== undefined && info.isLegendary &&
                            <p id="legendary">Legendary</p>
                        }
                        {
                            info !== undefined && info.isMythical &&
                            <p id="mythical">Mythical</p>
                        }
                        <div className='infoPV'>
                            <div className="infoItemPV"><p className="pItemPV">Height <br />{props.el.height}m</p></div>
                            <div className="infoItemPV"><p className="pItemPV">Weight <br />{props.el.weight} kg</p></div>
                        </div>
                    </div>
                </section>
                <section className='section2'>

                    <section className="section3">
                        {
                            info === undefined
                                ?
                                <svg className="loaderPV" viewBox="25 25 50 50">
                                    <circle r="20" cy="50" cx="50"></circle>
                                </svg>
                                :
                                <>
                                    <h3 id='hGenus'>{info.genus}</h3>
                                    <p id="pGenus">{info.description}</p>
                                </>

                        }
                    </section>
                    <section className="section4">
                        <ul className="stats">
                            <li style={{ fontSize: "1.4em" }}>Base points</li>
                            {
                                props.el.stats.map((e, i) =>
                                    <li key={i.toString()} className="itemUl">
                                        <p className="nameItem">{e.stat.name[0].toUpperCase() + e.stat.name.substring(1)}</p>
                                        <span className="bar">
                                            <div style={{ width: ((e.base_stat / 2).toString() + "%") }} className="barContent" />
                                        </span>
                                    </li>

                                )
                            }

                        </ul>
                    </section>
                    <section className="section5">

                        <div className="btnBoxPV">
                            <p id='PBoxPV'>${props.el.price}</p>
                            <button className="btnSection"
                                onClick={(e) => cartFav.dispatchCartFav({ type: 'ITEM_CARRITO', item: { id: props.el.id, precio: props.el.price, avatar: props.el.avatar, nombre: props.el.name, cantidad: 1 } })}
                            >
                                {cartFav.carrito.find(e => e.id === props.el.id) === undefined
                                    ?
                                    <BsFillBagPlusFill />
                                    :
                                    <BsFillBagCheckFill />
                                }

                            </button>
                        </div>

                    </section>
                </section>
            </div>
        </section>
    )
}