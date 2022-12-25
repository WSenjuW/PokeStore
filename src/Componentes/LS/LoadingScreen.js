import React, { useRef, useEffect, useContext } from 'react';
import { datosContext } from '../../Contextos/Context';
import './LoadingScreen.css';

export default function LoadingScreen(props) {
    const { progreso } = useContext(datosContext)

    const ref1 = useRef();


    
    
    useEffect(() => {
        const leftToRight = [{ transform: 'translateX(-100vw)' }, { transform: 'translateX(0vw)' }];
        const rightToLeft = [{ transform: 'translateX(100vw)' }, { transform: 'translateX(0vw)' }];
        
        let hijos = [...ref1.current.parentElement.children];
        let listaRef =  hijos.filter(e=> e.className === 'part');

        if (props.LSSwitch === false) 
        listaRef.forEach((e, i) =>   e.animate( (i%2 == 0 ? rightToLeft :leftToRight ) , { duration: 200, iterations: 1, fill: 'both', direction: 'reverse', delay:(Math.floor((Math.random() * ( 7 - 3 + 1)) + 3)) * 100}  ));    
    }, [props.LSSwitch]);


    return (
        <>
            <span className='part' ref={ref1}/>
            <span className='part' />
            <span className='part' />
            <span className='part'><p className='partP1'>Poke</p></span>
            <span className='part'><p className='partP2'>Store</p></span>
            <span className='part' />
            <span className='part'>
                <div id='barLoader'>
                    <span style={{ width: (progreso * 10) + '%' }} id='barLoaderContent' />
                </div>{" " + progreso}/10
            </span>
            <span className='part'>
                <div className="loader">
                    <div className="dot"></div>
                </div>
                <div className="loader">
                    <div className="dot"></div>
                </div>
                <div className="loader">
                    <div className="dot"></div>
                </div>
                <div className="loader">
                    <div className="dot"></div>
                </div>
                <div className="loader">
                    <div className="dot"></div>
                </div>
                <div className="loader">
                    <div className="dot"></div>
                </div>
            </span>
            <span className='part' />
            <span className='part' />
        </>
    )
}