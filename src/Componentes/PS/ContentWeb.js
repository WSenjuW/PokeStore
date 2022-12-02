import './ContentWeb.css';
import React, { useState, useEffect } from 'react';
import { GuidePage } from "./GuidePage";
import { TarjetaPokemon } from "./TarjetaPokemon";
import { FilterList } from "./FilterList";


export function ContentWeb(props) {
    const [pokeData, setPokeData] = useState([]);
    const [pokeDataContent, setPokeDataContent] = useState([]);
    const [indexPage, setIndexPage] = useState(0);
    const [order, setOrder] = useState("default");
    const [Tipos, setTipos] = useState([]);



    useEffect(() => {
        let PL = pokeData.length;
        let datos = [];
        for (let i = 1; i <= Math.ceil(PL / 50); i++) {
            let FN = (i - 1) * 50;
            let LN = i === (Math.ceil(PL / 50)) ? PL : 50 * i;
            let DtFragmento = pokeData.slice(FN, LN);
            datos.push(DtFragmento);
        }
        setPokeDataContent([...datos]);
        setIndexPage(0);
    }, [pokeData]);



    const orderFunction = () => {
        switch (order) {
            case "default":{ setPokeData([...pokeData.sort((a, b) => a.id < b.id ? -1 : 1)]) }
                break;
            case "AZ": { setPokeData([...pokeData.sort((a, b) => b.name > a.name ? -1 : 1)]) }
                break;
            case "ZA": { setPokeData([...pokeData.sort((a, b) => b.name > a.name ? -1 : 1).reverse()]) }
                break;
            case "Price ↾": { setPokeData([...pokeData.sort((a, b) => a.price < b.price ? -1 : 1)]) };
                break;
            case "Price ⇂": { setPokeData([...pokeData.sort((a, b) => a.price < b.price ? -1 : 1).reverse()]) }
                break;
        }
    }
    const tiposFunction = () => {
        switch (Tipos.length) {
            case 0: setPokeData(props.data);
                break;
            case 1: setPokeData(props.data.filter((e) => e.type.includes(Tipos[0])));
                break;
            case 2: setPokeData(props.data.filter((e) => e.type.includes(Tipos[0]) && e.type.includes(Tipos[1])));
                break;
        }
    }





    useEffect(() => {
        orderFunction()
    }, [order]);


    useEffect(() => {
        tiposFunction()
    }, [Tipos]);



    useEffect(() => {
        props.i_v === ""
            ?
            setPokeData(props.data)
            :
            setPokeData(props.data.filter(e => e.name.indexOf(props.i_v) !== -1))
    }, [props.i_v]);

    useEffect(() => {
        setPokeData(props.data)
    }, [props.data]);



    return (
        <div id="content-box">
            <FilterList
                setTipos={setTipos}
                setOrder={setOrder}
                type_data={props.type_data}
                Tipos={Tipos}
                order={order}
                setOrder={setOrder}

            />
            <section id="catalogo" >
                {
                    pokeDataContent.length !== 0
                        ?
                        pokeDataContent[indexPage].map(el =>
                            <TarjetaPokemon
                                key={el.id}
                                nombre={el.name}
                                imagen={el.avatar}
                                tipos={el.type}
                                peso={el.weight}
                                altura={el.height}
                                precio={el.price}
                                genus={el.genus}
                                gif={el.gif}
                                i_d={el.id}
                                description={el.description}
                                SetFav={props.SetFav}
                                favInclude={props.fav.includes(el.id) ? "active" : "noActive"}
                                setCarrito={props.setCarrito}
                                carInclude={props.carrito.every(e=> e.id !== el.id ) ?"noActive": "active"  }
                            />)
                        :
                        <p id='Msj_Productos'>no results found</p>
                }
            </section>
            {pokeDataContent.length > 1

                &&

                <GuidePage
                    upData={setIndexPage}
                    inP={indexPage}
                    maxL={pokeDataContent.length}
                />
            }
        </div>
    );

}

