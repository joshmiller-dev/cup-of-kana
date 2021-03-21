import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import Cell from './Cell';
import './KanaTable.css';

function KanaTable(props){

    //TODO:  Create own hook to handle all button toggles
    const [selectToggle, setSelectToggle] = useState(false);
    const [dakutenEnabled, setDakutenEnabled] = useState(false);
    const [comboEnabled, setComboEnabled] = useState(false);


    const handleClear = () =>{
        props.clearKana();
    }

    const handleReview = () =>{
        shuffleArr(props.kanaReviewing);
    }
    //SELECT ALL
    const handleSelectAll = () =>{
        if (selectToggle === true){
            props.clearKana();
            setSelectToggle(false);
            setDakutenEnabled(false);
            setComboEnabled(false);
        }else{
            props.kana.forEach((kana) =>{
                props.updateKana(kana);
            });
            setSelectToggle(true);
        }
    }
    //DAKUTEN HIRAGANA
    const toggleDakuten = ()=>{
        if (dakutenEnabled === false){
            props.dakuten.forEach((dakuten)=>{
                props.updateKana(dakuten);
            });
        }else{
            props.filterKana(props.dakuten);
        }
        setDakutenEnabled(!dakutenEnabled);
    }
    //COMBO HIRAGANA
    const toggleCombo = ()=>{
        if (comboEnabled === false){
            props.combo.forEach((combo)=>{
                props.updateKana(combo);
            });
        }else{
            props.filterKana(props.combo);
        }
        setComboEnabled(!comboEnabled);

    }


    const shuffleArr = (arr) =>{
        for (let i = arr.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }

    const reviewMessage = () =>{
        alert("No Kana Selected");
    }

    let conditionalLink = props.kanaReviewing.length > 0 ? <Link to='/review'><button onClick={handleReview}>Review</button></Link> 
                                                         : <div><button onClick={reviewMessage}>Review</button></div>;   
    let conditionalButton = !selectToggle ? "Select All" : "Deselect All";  
    let dakutenClass = !dakutenEnabled ? "" : "active";  
    let comboClass = !comboEnabled ? "" : "active";  
    //Todo:  Conditionals for Dakuten & Combo buttons
    

    console.log(props.kanaReviewing);
    return(
        <div className="kanaTable">
            <Link to='/'><button onClick={handleClear}>Go Back</button></Link>
            <button className={dakutenClass} onClick={toggleDakuten}>Enable Dakuten</button>
            <button className={comboClass} onClick={toggleCombo}>Enable Combo {props.kanaType}</button>
            {conditionalLink}
            <table>
                <thead>
                    <tr>
                        <th colSpan="5">
                            <h1>Select {props.kanaType} To Review</h1>
                            <button onClick={handleSelectAll}>{conditionalButton}</button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {props.kana.map((kana) =>
                        <Cell 
                            kanaType={props.kanaType}
                            id={kana}
                            key={props.kanaType + kana}
                            updateKana={props.updateKana}
                            removeKana={props.removeKana}
                            kanaReviewing={props.kanaReviewing}
                        />
                    )}
                </tbody>
            </table>
        </div>
    )
}


export default KanaTable;