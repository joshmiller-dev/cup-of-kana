import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import Cell from './Cell';
import './KanaTable.css';
import {kana, dakuten, combo} from './kana';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

function KanaTable(props){


    //TODO:  Refactor this component in general
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
            kana.forEach((kana) =>{
                props.updateKana(kana);
            });
            setSelectToggle(!selectToggle);
        }
    }
    //DAKUTEN HIRAGANA
    const toggleDakuten = ()=>{
        if (dakutenEnabled === false){
            dakuten.forEach((dakuten)=>{
                props.updateKana(dakuten);
            });
        }else{
            props.filterKana(dakuten);
        }
        setDakutenEnabled(!dakutenEnabled);
    }
    //COMBO HIRAGANA
    const toggleCombo = ()=>{
        if (comboEnabled === false){
            combo.forEach((combo)=>{
                props.updateKana(combo);
            });
        }else{
            props.filterKana(combo);
        }
        setComboEnabled(!comboEnabled);

    }


    //Move this to helper file
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
                                                         : <button onClick={reviewMessage}>Review</button>;   
    
    return(
        <div className="kanaTable">
            <div className='back-button'>
                <Link to='/' onClick={handleClear}><ArrowBackIcon /></Link>
            </div>
            <button className={dakutenEnabled ? "active" : "inactive"} onClick={toggleDakuten}>Enable Dakuten</button>
            <button className={comboEnabled ? "active" : "inactive"} onClick={toggleCombo}>Enable Combination {props.kanaType}</button>
            {conditionalLink}
            <table>
                <thead>
                    <tr>
                        <th colSpan="5">
                            <h1>Select {props.kanaType.charAt(0).toUpperCase() + props.kanaType.slice(1)} To Review</h1>
                            <button onClick={handleSelectAll}>{!selectToggle ? "Select All" : "Deselect All"}</button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {kana.map((kana) =>
                        <Cell 
                            kanaType={props.kanaType}
                            kana={kana}
                            key={props.kanaType + " " + kana.name}
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