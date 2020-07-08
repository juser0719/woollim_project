import React, {useState, useEffect} from 'react';
import queryString from 'query-string'; //url에 쿼리 값이 포함되어 있는경우, 쉽게 data 분리 하기위함. 
import io from 'socket.io-client';
import './Chat.css';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';

let socket; //if connected, save info in socket.

const Chat = ({location}) => {

    const [name , setName] = useState('');
    const [room , setRoom] = useState('');
    const [message, setMessage] = useState('');  //single message
    const [messages, setMessages] = useState([]);//total message list
    const CLIENTPOINT = 'https://react-chat-prectice.herokuapp.com/';
    useEffect (() => {
        const {name , room} = queryString.parse(location.search); //쿼리 문자열로 데이터 parse한 객체 생성

        socket = io(CLIENTPOINT);//

        setName(name);
        setRoom(room);
//        console.log(socket);
        socket.emit('join' , {name ,room}, () => {
            
        }); //'join' :key , {name, room} : value  
        return ()=> {
            socket.emit('disconnect');
            socket.off();
        }
    }, [CLIENTPOINT , location.search]);

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message]);
        })
    }, [messages]);

    const sendMessage = (event) => {
        event.preventDefault();

        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }

        
    }
    console.log(message, messages);
    return(
        <div className ="outerContainer">
            <div className = "container">
               <InfoBar room={room} />
               <Messages messages = {messages} name = {name}/>
               <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
           
        </div>
    )
}

export default Chat;