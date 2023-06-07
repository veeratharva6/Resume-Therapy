import React from "react";
import "./popups.css";

function ViewConnectionPopup(props) {

    const handlePopup = () => { 
        props.setTrigger(false)
        props.setActiveTrigger(null);
    }

    return( props.trigger ) ? (
        <div className = "popup">
            <div className = "popup-inner">
                <button className = "close-btn" onClick = {() => handlePopup()}>close</button>
                    {props.children}
                
            </div>
        </div>
    ) : "";

}

export default ViewConnectionPopup;