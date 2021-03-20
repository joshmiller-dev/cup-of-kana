import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import Cell from './Cell';
import './KanaTable.css';

function KanaTable(props){

    const [buttonToggle, setButtonToggle] = useState(false);

    const handleClear = () =>{
        props.clearKana();
    }

    const handleShuffle = () =>{
        for (let i = props.kanaReviewing.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * (i + 1));
            [props.kanaReviewing[i], props.kanaReviewing[j]] = [props.kanaReviewing[j], props.kanaReviewing[i]];
        }
    }

    const handleSelectAll = () =>{
        if (buttonToggle === true){
            props.clearKana();
            setButtonToggle(false);
        }else{
            setButtonToggle(true);
            for (let i = 0; i < props.kanaList.length; i++){
                props.updateKana(props.kanaList[i]);
            }
        }
    }

    const reviewMessage = () =>{
        alert("No Kana Selected");
    }

    let conditionalLink = props.kanaReviewing.length > 0 ? <Link to='/review'><button onClick={handleShuffle}>Review</button></Link> 
                                                         : <div><button onClick={reviewMessage}>Review</button></div>;   
    let conditionalButton = !buttonToggle ? "Select All" : "Deselect All";               


    return(
        <div className="kanaTable">
            <Link to='/'><button onClick={handleClear}>Go Back</button></Link>
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
                    {/* TODO:  Consider doing a forEach here instead */}
                    {props.kana.map((kana) =>
                        <Cell 
                            kanaType={props.kanaType}
                            id={kana}
                            key={props.kanaType + kana}
                            updateKana={props.updateKana}
                            clearKana={props.clearKana}
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