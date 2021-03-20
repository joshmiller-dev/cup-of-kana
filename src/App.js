import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import React, {useState} from 'react'
import SelectionButtons from './SelectionButtons';
import KanaTable from './KanaTable';
import Review from './Review';


function App(props) {

  const kanaList = ['a', 'i', 'u', 'e', 'o', 'ka', 'ki', 'ku', 'ke', 'ko', 'ha', 'hi', 'hu', 'he', 'ho', 'ma', 
  'mi', 'mu', 'me', 'mo', 'sa', 'shi', 'su', 'se', 'so', 'ya', 'yu', 'yo', 'ta', 'chi', 'tsu', 'te', 'to', 'ra', 
  'ri', 'ru', 're', 'ro', 'na', 'ni', 'nu', 'ne', 'no', 'wa', 'wo'];

  const [kanaReviewing, updateKanaReviewing] = useState([]);
  const [kanaType, setKanaType] = useState("");

  let chosenKana = 'Hiragana';

  //Update the Kana under Review with the user selected kana
  const updateKana = (selectedKana) => {
    if (kanaReviewing.includes(selectedKana)){
      return;
    }else{
      updateKanaReviewing(prevArr => [...prevArr, selectedKana]);
    }
  }

  function removeKana(kanaToRemove){
    let updatedArr = kanaReviewing.filter(kana => kana !== kanaToRemove);
    updateKanaReviewing(updatedArr);
  }

  const clearKana = () =>{
    if (kanaReviewing.length > 0){
      updateKanaReviewing([]);
    }
  }

  const setKana = (kana) =>{
    setKanaType(kana);
  }


  return (
    <div className="App">
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route exact path='/' render={() => <SelectionButtons setKana={setKana}/>} />
          <Route path='/hiragana' render={() => <KanaTable kanaType='hiragana' kana={kanaList} updateKana={updateKana} clearKana={clearKana} kanaReviewing={kanaReviewing} removeKana={removeKana} kanaList={kanaList}/>} />
          <Route path='/katakana' render={() => <KanaTable kanaType='katakana' kana={kanaList} updateKana={updateKana} clearKana={clearKana} kanaReviewing={kanaReviewing} removeKana={removeKana} kanaList={kanaList}/>} />
          <Route path='/review' render={() => <Review kanaType={kanaType} kana={kanaReviewing} clearKana={clearKana}/>} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
