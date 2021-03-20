import React, {useState} from 'react'
import './Cell.css';

function Cell(props){
    
    const image = `https://res.cloudinary.com/joshmiller-dev/image/upload/v1615699417/CupOfKana/
${props.kanaType}/Japanese_${props.kanaType}_kyokashotai_${props.id}.svg`;


    const handleClick = () =>{
        //If the kana is already in array, remove it
        if(props.kanaReviewing.includes(props.id)){
            props.removeKana(props.id);
        }
        //Pass the kana ID all the way up to the parent 
        props.updateKana(props.id)    
        return;
    }


    let conditionalClass;
    //If kana is in array, light up the cell
    if (props.kanaReviewing.includes(props.id)){
        conditionalClass = "selected";
    }else{
        conditionalClass = "unselected";
    }

    console.log(props.kanaReviewing);

    //TODO:  Use local storage to keep kana lit when going back from review page (remove clear function from back button there as well)
    return(
        <td>
            <img className={"kana " + conditionalClass}
                src={image}
                alt={props.kanaType + " " + props.id} 
                onClick={handleClick}
            />
        </td>

    )
}


export default Cell;