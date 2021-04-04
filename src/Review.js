import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import './Review.css';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


function Review(props){

    const [guess, setGuess] = useState("");
    const [numCorrect, setNumCorrect] = useState(0);
    const [numIncorrect, setNumIncorrect] = useState(0);
    const [isComplete, setIsComplete] = useState(false);


    const handleKeyPress = (event) =>{
        if(event.key === 'Enter'){
            checkGuess();
        }
        if (props.kana.length === 0){
            setIsComplete(true);
            alert("Review Complete!");
            //TODO:  Make the win screen nicer
        }
    }

    const checkGuess = () =>{
        if (guess.toLowerCase() === props.kana[0].name || guess === props.kana[0].nameAlt){
            props.kana.shift();
            setNumCorrect(numCorrect + 1);
            //TODO:  Give an indication whether user was correct or incorrect
            //Try flashing the correct or incorrect display color
        }else if (guess === ""){
            return;
        }else{
            props.kana.push(props.kana[0]);
            props.kana.splice(0,1);
            setNumIncorrect(numIncorrect + 1);
        }
        setGuess("");
    }

    const handleSkip = () =>{
        props.skipKana(props.kana[0]);
        setGuess("");
    }
    
    let kanaDisplay = isComplete ? "" : props.kana[0][props.kanaType];
    let percentage = Math.trunc(numCorrect / (numCorrect + numIncorrect) * 100);
    let percentDisplay = percentage ? <h3>Score: {percentage}%</h3> : <h3>Score: 0%</h3>;
    let scoreDisplay = <div className='score-display'>
                            <h3>Correct: {numCorrect}</h3>
                            <h3>Incorrect: {numIncorrect}</h3>
                            {percentDisplay}
                       </div>

    return(
        <div>
            <Link to={'/' + props.kanaType} onClick={props.clearKana} className='back-button'><ArrowBackIcon /></Link>            
            <p className='kana-display-review'>{kanaDisplay}</p>
            <br></br>
            <input type="text" placeholder="Name that kana..." value={guess} onChange={event => setGuess(event.target.value)} onKeyPress={handleKeyPress} disabled={isComplete}/>
            <button onClick={handleSkip} disabled={isComplete}>Skip</button>
            <br/><br/>
            {scoreDisplay}
            <h4>Kana remaining: {props.kana.length}</h4>
            <br/>
        </div>
    )
}


export default Review;