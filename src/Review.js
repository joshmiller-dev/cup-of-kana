import React, {useState} from 'react';
import {Link} from 'react-router-dom';

function Review(props){

    const [guess, setGuess] = useState("");
    const [currentKana, setCurrentKana] = useState(props.kana[0]);


    const handleKeyPress = (event) =>{
        if(event.key === 'Enter'){
            checkGuess();
            event.target.value = "";
        }
        if (props.kana.length === 0){
            alert("Good reviewing!");
            //TODO:  Make the win screen nicer
        }
        setCurrentKana(props.kana[0]);
    }

    const checkGuess = () =>{
        if (guess === props.kana[0]){
            props.kana.shift();
        }else{
            props.kana.push(props.kana[0]);
            props.kana.splice(0,1);
        }
    }
            
    let kanaDisplay = <h2>{currentKana}</h2>;

    console.log(props.kana);
    console.log(guess);

    return(
        <div>
            <Link to={'/' + props.kanaType}><button onClick={props.clearKana}>Go Back</button></Link>
            <h1>Reviewing {props.kanaType}</h1>
            {kanaDisplay}
            <br></br>
            <h3>Name that kana</h3>
            <input type="text" onChange={event => setGuess(event.target.value)} onKeyPress={handleKeyPress}/>
        </div>
    )
}


export default Review;