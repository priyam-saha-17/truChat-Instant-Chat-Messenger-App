// giving variable names to respective DOM(Document Object Modelling) elements
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInput');
const messageContainer = document.querySelector('.container');

const socket = io('http://localhost:8000');

// for creating a time-delay
var delayInMilliseconds = 3000; //3 second

// load the audio files
var user_joined = new Audio('user_joined.mp3');
var user_left = new Audio('user_left.mp3');
var message_sent = new Audio('message_sent.mp3');
var message_received = new Audio('message_received.mp3');


// function to append a message element to the main message container
function append(message, position, audio) {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    audio.play();
}

function append2(message2, position, audio) {
    const messageElement = document.createElement('div');
    messageElement.innerText = message2;
    messageElement.classList.add('message2');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    audio.play();
}

function append3(message3, position, audio) {
    const messageElement = document.createElement('div');
    messageElement.innerText = message3;
    messageElement.classList.add('message3');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    //audio.play();
}

function append4(message4, position) {
    const messageElement = document.createElement('div');
    messageElement.innerText = message4;
    messageElement.classList.add('message4');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    //audio.play();
}

// trigger an event to the server in response to the user clicking on the 'Send!' button for sending a message
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;

    var today = new Date();
    var date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime;
    if (date == global_date)
        dateTime = 'Time--> ' + time;
    else
        dateTime = 'Time--> ' + time + ', Date--> ' + date;


    append3(`${dateTime}`, 'right', message_sent);
    append(`You: ${message}`, 'right', message_sent);
    socket.emit('send', message);
    messageInput.value = '';
})


// Prompt to ask a user his or her name before he/she joins the chat
const name = prompt("Enter your name to join the chat: ");
console.log("user joined", `${name}`);
socket.emit('new-user-joined', name);

var global_today = new Date();
var global_date = global_today.getDate()+'/'+(global_today.getMonth()+1)+'/'+global_today.getFullYear();
var global_time = global_today.getHours() + ":" + global_today.getMinutes() + ":" + global_today.getSeconds();
const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
var global_dateTime = global_time + '   hours   on   Date =  ' +  global_date + '  (' + weekday[global_today.getDay()] + ')';
welcomeMessage = '******Welcome   to   truChat :   Instant   Chat   Messenger   App******\n\n' ;
welcomeMessage += `You joined the Chat Room  at  Time =  ${global_dateTime}` ;
append4('\n'+welcomeMessage+'\n  ', 'left');






// receive the event from the Server whenever another user joins
socket.on('user-joined', name => {
    console.log(typeof(name));


    var today = new Date();
    var date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime;
    if (date == global_date)
        dateTime = 'Time--> ' + time;
    else
        dateTime = 'Time--> ' + time + ', Date--> ' + date;
  

    append2(`${dateTime}\n` + `${name} joined the chat!`, 'center', user_joined);
})



// receive messages sent by other users in the chat
socket.on('receive', data=> {
    setTimeout(function() {
        //your code to be executed after 1 second
        var today = new Date();
        var date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime;
        if (date == global_date)
            dateTime = 'Time--> ' + time;
        else
            dateTime = 'Time--> ' + time + ', Date--> ' + date;


        append3(`${dateTime}`, 'left', message_sent);
        append(`${data.name}: ${data.message}`, 'left', message_received);
      }, delayInMilliseconds);
})


// receive the event from the Server whenever another user leaves the chat
socket.on('left', name=> {

    var today = new Date();
    var date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime;
    if (date == global_date)
        dateTime = 'Time--> ' + time;
    else
        dateTime = 'Time--> ' + time + ', Date--> ' + date;


    append2(`${dateTime}\n` + `${name} left the chat!`, 'center', user_left);
})