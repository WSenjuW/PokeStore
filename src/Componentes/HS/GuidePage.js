import { BsChevronDoubleRight, BsChevronDoubleLeft} from "react-icons/bs";
import "./GuidePage.css";



export function GuidePage(props) {
    return (
        <div id='guide-page'>
            {props.inP === 0 ?
            ""
            :
            <button 
            className='btnPageL'
            onClick={()=>props.upData(props.inP - 1)}
            >
                <BsChevronDoubleLeft />
            </button> 
            }
            <p id='info_page'>{props.inP + 1}</p>
            {
            props.inP + 1 === props.maxL ?
            ""
            :
            <button 
            className='btnPageR'
            onClick={()=>props.upData(props.inP + 1)}

            ><BsChevronDoubleRight />
            </button>
            }
        </div>
    )
}