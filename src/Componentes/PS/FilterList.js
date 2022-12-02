import { FiFilter } from "react-icons/fi";
import React, { useRef } from 'react';
import "./FilterList.css";





export function FilterList(props) {
    const refMenu = useRef();
    const refPanelBlack = useRef();

    function effectMenu(e) {
        if (e === "o") {
            refMenu.current.style.width = "250px";
            refPanelBlack.current.style.width = "100%"
        }
        else {
            refMenu.current.style.width = 0;
            refPanelBlack.current.style.width = 0;
        }
    }


    return (
        <>
            <button id='btn_filter' onClick={() => effectMenu("o")}><FiFilter /></button>
            <span id='panelBlack' ref={refPanelBlack} onClick={() => effectMenu("c")} />
            <div id='filtros' ref={refMenu}>
                <ul id='filterList'>
                    <li className='listItem'  >
                        <span className='itemTitle' >Order</span>
                        <ul className='listInside'>
                            <li className='itemOption' translate="no" onClick={() => props.setOrder("AZ")}>A-Z</li>
                            <li className='itemOption' translate="no" onClick={() => props.setOrder("ZA")}>Z-A</li>
                            <li className='itemOption'  onClick={()=>props.setOrder("Price ↾")}>Price ↾</li>
                            <li className='itemOption'  onClick={()=>props.setOrder("Price ⇂")} >Price ⇂</li> 
                        </ul>
                    </li>
                    <li className='listItem'>
                        <span className='itemTitle' >Types</span>
                        <ul className='listInside'>
                            {props.type_data.map((e, i) => <li key={i} onClick={() => !props.Tipos.includes(e) && props.Tipos.length < 2 ? props.setTipos([...props.Tipos, e]) : ""} className='itemOption'>{e[0].toUpperCase() + e.substring(1)}</li>)}
                        </ul>
                    </li>
                </ul>
                <ul id='filterListUsed'>
                    <p id='fLU_title'>Applied filters</p>
                    {
                        props.Tipos.map((element, i) =>
                            <li className='fLU_item' key={i} >
                                <p className='fLU_itemTitle'>Type: {element[0].toUpperCase() + element.substring(1)}</p>
                                <button id={element} className='btn_TypeDelete' onClick={(e) => props.setTipos(props.Tipos.filter((el) => el !== e.target.id))}>X</button>
                            </li>)
                    }
                    {
                        props.order !== 'default' &&
                        <li className='fLU_item' >
                                <p className='fLU_itemTitle'>Order: {props.order[0].toUpperCase() + props.order.substring(1)}</p>
                                <button className='btn_TypeDelete' onClick={()=>props.setOrder('default')}>X</button>
                            </li>


                    }
                </ul>
            </div>
        </>
    )
}
