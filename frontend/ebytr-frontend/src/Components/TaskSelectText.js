import React from 'react';
import propTypes from 'prop-types';

function TaskSelectText (props) {
  const {editFunction,inputText, setText, editing} = props
  
  const onChangeAction = async (value) =>{
    if (editing) {
      setText(value)
    }
    else{ 
      await editFunction(value)
    }
  }

  return(    
    <select value = {inputText} onChange={(e)=> onChangeAction(e.target.value)}>
        <option value='Pendente'>Pendente</option>
        <option value='Em andamento'>Em andamento</option>
        <option value='Pronto'>Pronto</option>
      </select>
  )

}

export default TaskSelectText

TaskSelectText.propTypes = {
text: propTypes.string,
setText: propTypes.func,
inputText: propTypes.string,
editing: propTypes.bool,
editFunction: propTypes.func
}