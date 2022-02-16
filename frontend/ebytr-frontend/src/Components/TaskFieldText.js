import React from 'react';
import propTypes from 'prop-types';

function TaskFieldText (props) {
  const {text, inputText, setText, editing} = props
  
  return(    
    editing
    ? <input type="text" value={inputText} onChange={e=>setText(e.target.value)} />
    : <p>{text}</p>
  )

}

export default TaskFieldText

TaskFieldText.propTypes = {
text: propTypes.string,
setText: propTypes.func,
inputText: propTypes.string,
editing: propTypes.bool
}