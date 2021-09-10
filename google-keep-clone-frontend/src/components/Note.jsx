import React from "react";
import DeleteIcon from '@material-ui/icons/Delete'
import axios from "axios"

function Note(props) {

  function handleClick(){
    const note = {
      _id: props.id,
      title: props.title,
      content: props.content,
    }
    axios.delete("http://localhost:4000/notes", {data: note})
    props.onDelete(props.id)
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={handleClick} > <DeleteIcon/> </button>
    </div>
  );
}

export default Note;
