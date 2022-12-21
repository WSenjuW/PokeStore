import { FiFilter } from "react-icons/fi";
import React, { useRef, useContext } from 'react';
import "./FilterList.css";
import { datosContext } from "../../Contextos/Context";




export function FilterList(props) {
    const Data = useContext(datosContext);
    const refMenu = useRef();
    const refPanelBlack = useRef();

    function effectMenu(e) {
        if (e === true) {
            refMenu.current.style.width = "250px";
            refPanelBlack.current.style.width = "100%"
        }
        else {
            refMenu.current.style.width = 0;
            refPanelBlack.current.style.width = 0;
        }
    }

    function effectOrder(element) {
        props.filtros.dispatchFiltros({ type: 'ORDER_ITEM', item: element.target.innerText })
    }

    return (
        <>
            <button id='btn_filter' onClick={() => effectMenu(true)}><FiFilter /></button>
            <span id='panelBlack' ref={refPanelBlack} onClick={() => effectMenu(false)} />
            <div id='filtros' ref={refMenu}>
                <ul id='filterList'>
                    <li className='listItem'  >
                        <span className='itemTitle' >Order</span>
                        <ul className='listInside'>
                            <li className='itemOption' translate="no" onClick={(el) => effectOrder(el)}>A-Z</li>
                            <li className='itemOption' translate="no" onClick={(el) => effectOrder(el)}>Z-A</li>
                            <li className='itemOption' onClick={(el) => effectOrder(el)}>Price ↾</li>
                            <li className='itemOption' onClick={(el) => effectOrder(el)}>Price ⇂</li>
                        </ul>
                    </li>
                    <li className='listItem'>
                        <span className='itemTitle' >Types</span>
                        <ul className='listInside'>
                            {Data.tiposDatos.map((e, i) =>
                                <li key={i}
                                    onClick={() => props.filtros.dispatchFiltros({ type: 'TYPE_ITEM', item: e })}
                                    className='itemOption'>
                                    {e[0].toUpperCase() + e.substring(1)}
                                </li>)}
                        </ul>
                    </li>
                </ul>
                <ul id='filterListUsed'>
                    <p id='fLU_title'>Applied filters</p>
                    {
                        props.filtros.order !== undefined &&
                        <li className='fLU_item' >
                            <p className='fLU_itemTitle'>Order: {props.filtros.order}</p>
                            <button className='btn_TypeDelete'
                                onClick={() => props.filtros.dispatchFiltros({ type: 'ORDER_ITEM', item: undefined })}
                            >X</button>
                        </li>


                    }
                    {
                        props.filtros.types.map((element, i) => {
                            return <li className='fLU_item' key={i} >
                                <p className='fLU_itemTitle'>Type: {element}</p>
                                <button className='btn_TypeDelete'
                                    onClick={() => props.filtros.dispatchFiltros({ type: 'DELETE_TYPE_ITEM', item: element })}
                                >X</button>
                            </li>
                        })
                    }
                </ul>
            </div>
        </>
    )
}
