import React from 'react'
import {Link} from 'react-router-dom';

function SelectionButtons(props){


    return(
        <div className='button-container'>
            <Link to='/hiragana'>
                <button className='kana-button' onClick={() => props.setKana('hiragana')}>Hiragana</button>
            </Link>

            <Link to='/katakana'>
                <button className='kana-button' onClick={() => props.setKana('katakana')}>Katakana</button>
            </Link>
      </div>
    )
}



export default SelectionButtons;