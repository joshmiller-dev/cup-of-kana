import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import './Review.css';


function Review(props){

    const [guess, setGuess] = useState("");
    const [numCorrect, setNumCorrect] = useState(0);
    const [numIncorrect, setNumIncorrect] = useState(0);
    // const [isCorrect, setIsCorret] = useState(null);
    const [currentKana, setCurrentKana] = useState(props.kana[0]);

    const image = `https://res.cloudinary.com/joshmiller-dev/image/upload/v1615699417/CupOfKana/
${props.kanaType}/Japanese_${props.kanaType}_kyokashotai_${currentKana}.svg`;
    let imageClass = "review-image";


    const handleKeyPress = (event) =>{
        if(event.key === 'Enter'){
            checkGuess();
            event.target.value = "";
        }
        if (props.kana.length === 0){
            alert("Good reviewing!");
            //TODO:  Make the win screen nicer, remove/disable input
        }
        setCurrentKana(props.kana[0]);
    }

    const checkGuess = () =>{
        if (guess === props.kana[0]){
            props.kana.shift();
            setNumCorrect(numCorrect + 1);
            //TODO:  Give an indication whether user was correct or incorrect
            //Try flashing the correct or incorrect display color
        }else{
            props.kana.push(props.kana[0]);
            props.kana.splice(0,1);
            setNumIncorrect(numIncorrect + 1);
        }
    }
    
    let kanaDisplay = <img src={image} className={imageClass} alt={props.kanaType + " " + currentKana}  tabIndex="0"/>
    let correctDisplay = <h3>Correct: {numCorrect}</h3>;
    let incorrectDisplay = <h3>Incorrect: {numIncorrect}</h3>;
    let percentage = Math.trunc(numCorrect / (numCorrect + numIncorrect) * 100);
    let scoreDisplay = percentage ? <h3>Score: {percentage}%</h3> : <h3>Score: </h3>;    
    //TODO: Consider also listing number of kana left to review

    console.log(props.kana);
    return(
        <div>
            <Link to={'/' + props.kanaType}><button onClick={props.clearKana}>Go Back</button></Link>
            <h1>Reviewing {props.kanaType}</h1>
            {kanaDisplay}
            <br></br><br/><br/>
            <input type="text" placeholder="Name that kana..." onChange={event => setGuess(event.target.value)} onKeyPress={handleKeyPress}/>
            <br/><br/>
            {correctDisplay}
            {incorrectDisplay}
            {scoreDisplay}
            <br/>
        </div>
    )
}


export default Review;