import React from 'react'
import {Link} from "react-router-dom";

function TagItem(props) {
  const {tag} = props;
  const style = {
    border: "1px solid white",
    borderRadius: "10px",
    width: "120px",
    height: "30px",
    top: tag.topY*600,
    left: tag.leftX*600,
    position: "absolute",
    color: "white",
    textAlign: "center",
  }
  return (
    <div style={style}>
      {tag.handle}
    </div>
  )
}

export default TagItem;
