import './LoadingScreen.css';
import React, { useRef, useEffect } from 'react';

export default function LoadingScreen(props) {
    const P1 = useRef();
    const P2 = useRef();
    const P3 = useRef();


    useEffect(() => {
        const leftToRight = [{ transform: 'translateX(-100vw)' }, { transform: 'translateX(0vw)' }];
        const rightToLeft = [{ transform: 'translateX(100vw)' }, { transform: 'translateX(0vw)' }];


        if (props.LSSwitch === true) {
            P1.current.animate(leftToRight, { duration: 200, iterations: 1, fill: 'both', delay: 700 })
            P2.current.animate(rightToLeft, { duration: 200, iterations: 1, fill: 'both', delay: 800 })
            P3.current.animate(leftToRight, { duration: 200, iterations: 1, fill: 'both', delay: 700 })
        } else {
            P1.current.animate(leftToRight, { duration: 200, iterations: 1, fill: 'both', direction: 'reverse' })
            P2.current.animate(rightToLeft, { duration: 200, iterations: 1, fill: 'both', delay: 200, direction: 'reverse' })
            P3.current.animate(leftToRight, { duration: 200, iterations: 1, fill: 'both', direction: 'reverse', })
        }
    }, [props.LSSwitch]);


    return (
        <>
            <span ref={P1} id='P1'><p className='LSP1'>Poke</p></span>
            <span ref={P2} id='P2'><p className='LSP2'>Store</p></span>
            <span ref={P3} id='P3'>
                <div className="loader">
                    <span>L</span>
                    <span>O</span>
                    <span>A</span>
                    <span>D</span>
                    <span>I</span>
                    <span>N</span>
                    <span>G</span>
                </div>
            </span>
        </>
    )
}