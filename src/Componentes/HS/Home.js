import React, { useState, useEffect, useContext, useDebugValue, useReducer } from 'react';
import NavTop from '../NavTop/NavTop1_0';
import { GuidePage } from "./GuidePage";
import { TarjetaPokemon } from "./TarjetaPokemon";
import { FilterList } from "./FilterList";
import './Home.css';
import { cartFavContext, datosContext } from '../../Contextos/Context';



const reducer = (state, action) => {

    switch (action.type) {
        case 'TYPE_ITEM': {
            if (!state.types.includes(action.item) && state.types.length <= 1) return { ...state, types: [...state.types, action.item] }
            else return { ...state, types: [...state.types.shift(), action.item] }
        }
            break;
        case 'DELETE_TYPE_ITEM': return { ...state, types: state.types.filter((e) => e !== action.item) }

            break;
        case 'ORDER_ITEM': return { ...state, order: action.item }
        default: return { ...state, types: [] }
            break;
    };

}


export function Home(props) {
    const { datos } = useContext(datosContext);
    const { favoritos, carrito } = useContext(cartFavContext);
    const [pokeData, setPokeData] = useState(datos);
    const [pokeDataContent, setPokeDataContent] = useState([]);
    const [indexPage, setIndexPage] = useState(0);
    const [inputValue, setInputValue] = useState('');
    const [filtros, dispatchFiltros] = useReducer(reducer, { order: undefined, types: [] })



    useEffect(() => {
        let arr;
        let arr2;
        switch (filtros.types.length) {
            case 0: arr = datos;
                break;
            case 1: arr = datos.filter(e => e.type.includes(filtros.types[0]));
                break;
            case 2: arr = datos.filter(e => e.type.includes(filtros.types[0]) && e.type.includes(filtros.types[1]));
                break;
        }

        // console.log(arr);

        switch (filtros.order) {
            case 'A-Z': arr2 = arr.sort((a, b) => a.name > b.name ? 1 : -1);
                break;
            case 'Z-A': arr2 = arr.sort((a, b) => a.name < b.name ? 1 : -1);
                break;
            case 'Price ↾': arr2 = arr.sort((a, b) => a.price - b.price);
                break;
            case 'Price ⇂': arr2 = arr.sort((a, b) => b.price - a.price);
                break;
        }
        if (filtros.order === undefined) setPokeData(arr);
        else setPokeData([...arr2]);

    }, [filtros]);



    useEffect(() => {
        setPokeData(datos.filter((e) => e.name.includes(inputValue)));
        dispatchFiltros({ type: '' })
    }, [inputValue]);




    useEffect(() => {
        let PL = pokeData.length;
        let datos = [];
        for (let i = 1; i <= Math.ceil(PL / 50); i++) {
            let FN = (i - 1) * 50;
            let LN = i === (Math.ceil(PL / 50)) ? PL : 50 * i;
            let DtFragmento = pokeData.slice(FN, LN);
            datos = [...datos, DtFragmento];
        }
        setPokeDataContent(datos)
        setIndexPage(0);
    }, [pokeData]);




    return (
        <div id="content-box">
            <NavTop setIV={setInputValue} />
            <div id='auxBox'>
                <FilterList
                    filtros={{ ...filtros, dispatchFiltros }}
                />
                <section id="catalogo" >
                    {
                        pokeDataContent.length !== 0
                            ?
                            pokeDataContent[indexPage].map((el, index) =>
                                <TarjetaPokemon
                                    key={index}
                                    ELEMENT={el}
                                    favInclude={favoritos.includes(el.id) ? true : false}
                                    carInclude={carrito.every(e => e.id !== el.id) ? false : true}
                                />) :
                            <p id='Msj_Productos'>No results found</p>
                    }
                </section>
            </div>
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

