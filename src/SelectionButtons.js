import React from 'react'
import {Link} from 'react-router-dom';

function SelectionButtons(props){


    return(
        <div className="SelectionButtons">
            <Link to='/hiragana'>
                <button onClick={() => props.setKana('hiragana')}>Hiragana</button>
            </Link>

            <Link to='/katakana'>
                <button onClick={() => props.setKana('katakana')}>Katakana</button>
            </Link>
      </div>
    )
}



export default SelectionButtons;