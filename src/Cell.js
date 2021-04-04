import React from 'react'
import './Cell.css';

function Cell(props){
    
    const handleClick = () =>{
        if(props.kanaReviewing.includes(props.kana)){
            props.removeKana(props.kana);
        }else{
            props.updateKana(props.kana)
        }
    }

    let conditionalClass;
    if (props.kanaReviewing.includes(props.kana)){
        conditionalClass = "selected";
    }else{
        conditionalClass = "unselected";
    }
    //TODO:  Use local storage to keep kana lit when going back from review page (remove clear function from back button there as well)
    return(
        <div>
            <button className={'kana-display ' + conditionalClass}
                alt={props.kanaType + " " + props.kana.name}
                onClick={handleClick}
                tabIndex="0">
            {props.kana[props.kanaType]}
            </button>
        </div>
    )
}


export default Cell;