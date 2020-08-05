import React, { Component } from "react";
import "./settings.css";

function Settings(props) {

  if (!props.show) {
    return null;
  }
 
  return (
    <div className='firstset'>
      <div className='secondset'>
        <div className='thirdset'>
          <div className='followers-containerset' style={{ height: "150px" }}>
            <button
              onClick={props.onLogout}
              style={{
                borderTopLeftRadius: "15px",
                borderTopRightRadius: "15px",
              }}
              className='w3-button w3-block '
            >
              Log Out
            </button>

            <button
              onClick={props.onDelete}
              className='w3-button w3-block'
              style={{ color: "#ed4956" }}
            >
              Delete account
            </button>

            <button
              onClick={props.close}
              style={{
                borderBottomLeftRadius: "15px",
                borderBottomRightRadius: "15px",
                lineHeight: "30px",
              }}
              className='w3-button w3-block'
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default (Settings);
