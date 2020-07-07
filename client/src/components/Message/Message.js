import React from 'react';
import './Message.css';
import ReactEmoji from 'react-emoji';
const Message = ( {message: {user, text} , name} ) => {

    let currentUser = false;

    const Username = name.trim().toLowerCase();//
    
    if (user === Username){
        currentUser =true;
    }
    
    return (
        currentUser ? (
            <div className = "messageContainer justifyEnd">
                <p className = "sentText  pr-10">{Username}</p>
                <div className = "messageBox backgroundBlue">
                    <p className="messageText ">{ReactEmoji.emojify(text)}</p>
                </div>
            </div>
        ) : (
            <div className = "messageContainer justifyStart">
               
                <div className = "messageBox colorDark">
                    <p className="messageText pl-10">{ReactEmoji.emojify(text)}</p>
                </div> 
                <p className = "sentText ">{user}</p>
            </div>         
        )
    )

}

export default Message;