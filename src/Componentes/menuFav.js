import './menuFav.css';
export default function MenuFav(props) {

    return (
        <div
            id='menuFavBox'
            // onMouseOut={() => console.log("fuera")}
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
                                <button className='btnMF'
                                    tabIndex={-1}
                                    onClick={() => props.SetFav([...props.favList.filter((el) => el !== e.id)])}
                                >X</button>
                            </li>
                        )
                        :
                        <p id="mensajeMF">Actualmente no tienes ningún producto en tu lista de favoritos</p>
                }
            </ul>
        </div>
    )
} 