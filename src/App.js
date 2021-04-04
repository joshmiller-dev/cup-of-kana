import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import React, {useState} from 'react'
import SelectionButtons from './SelectionButtons';
import KanaTable from './KanaTable';
import Review from './Review';


function App() {

  const [kanaReviewing, updateKanaReviewing] = useState([]);
  const [kanaType, setKanaType] = useState("");

  const updateKana = (selectedKana) => {
    if (kanaReviewing.includes(selectedKana)){
      return;
    }else{
      updateKanaReviewing(prevArr => [...prevArr, selectedKana]);
    }
  }

  const skipKana = (kanaToSkip) =>{
    if (kanaReviewing.length > 1){
      kanaReviewing.splice(0,1);
      updateKanaReviewing(prevArr => [...prevArr, kanaToSkip]);
    }
  }

  const removeKana = (kanaToRemove) =>{
    let updatedArr = kanaReviewing.filter(kana => kana !== kanaToRemove);
    updateKanaReviewing(updatedArr);
  }

  const filterKana = (kanaToRemove) =>{
    let filteredArr = kanaReviewing.filter((kana) => !kanaToRemove.includes(kana));
    updateKanaReviewing(filteredArr);
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
          <Route path='/hiragana' render={() => <KanaTable kanaType='hiragana' updateKana={updateKana} clearKana={clearKana} filterKana={filterKana} kanaReviewing={kanaReviewing} removeKana={removeKana}/>} />
          <Route path='/katakana' render={() => <KanaTable kanaType='katakana' updateKana={updateKana} clearKana={clearKana} filterKana={filterKana} kanaReviewing={kanaReviewing} removeKana={removeKana}/>} />
          <Route path='/review' render={() => <Review kanaType={kanaType} kana={kanaReviewing} clearKana={clearKana} skipKana={skipKana}/>} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
