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

  const dakutenList = ['pa', 'ba', 'da', 'za', 'ga', 'pi', 'bi', 'dzi', 'ji', 'gi', 'pu', 'bu', 'dzu', 'zu', 'gu', 'pe', 
  'be', 'de', 'ze', 'ge', 'po', 'bo', 'do', 'zo', 'go'];

  const comboList = ['nya', 'cha', 'sha', 'kya', 'nyu', 'chu', 'shu', 'kyu', 'nyo', 'cho', 'sho', 'kyo', 'gya', 'rya', 'mya', 'hya', 
  'gyu', 'ryu', 'myu', 'hyu', 'gyo', 'ryo', 'myo', 'hyo', 'pya', 'bya', 'dzya', 'jya', 'pyu', 'byu', 'dzyu', 'jyu', 'pyo', 'byo', 
  'dzyo', 'jyo'];


  const [kanaReviewing, updateKanaReviewing] = useState([]);
  const [kanaType, setKanaType] = useState("");

  const updateKana = (selectedKana) => {
    if (kanaReviewing.includes(selectedKana)){
      return;
    }else{
      updateKanaReviewing(prevArr => [...prevArr, selectedKana]);
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
          <Route path='/hiragana' render={() => <KanaTable kanaType='hiragana' kana={kanaList} dakuten={dakutenList} combo={comboList} updateKana={updateKana} clearKana={clearKana} filterKana={filterKana} kanaReviewing={kanaReviewing} removeKana={removeKana}/>} />
          <Route path='/katakana' render={() => <KanaTable kanaType='katakana' kana={kanaList} dakuten={dakutenList} combo={comboList} updateKana={updateKana} clearKana={clearKana} filterKana={filterKana} kanaReviewing={kanaReviewing} removeKana={removeKana}/>} />
          <Route path='/review' render={() => <Review kanaType={kanaType} kana={kanaReviewing} clearKana={clearKana}/>} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
