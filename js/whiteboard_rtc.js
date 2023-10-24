// Function to handle a new member joining the room
let handleMemberJoined = async (MemberId) => {
    console.log('A new member has joined the room:', MemberId);
}

// Function to handle a new channel message
let handleChannelMessage = async (messageData, MemberId) => {
    console.log('A new message was received');
    let data = JSON.parse(messageData.text); // Correct the typo "perse" to "parse"
    if(data.type ==='chat'){
        addMessageToDom(data.displayName,data.message)
    }
}

// Function to send a message
let sendMessage = async (e) => {
    e.preventDefault();
    let message = e.target.message.value;
    channel.sendMessage({ text: JSON.stringify({ 'type': 'chat', 'message': message, 'displayName': displayName }) });
    addMessageToDom(displayName, message);
    e.target.reset();
}

// Function to add a message to the DOM
let addMessageToDom = (name, message) => {
    let messageWrapper = document.getElementById('messages');
    let newMessage = `<div class="message__wrapper">
                         <div class="message__body">
                           <strong class="message__author">${name}</strong>
                           <p class="message__text">${message}</p>
                        </div>
                    </div>`;
    messageWrapper.insertAdjacentHTML('beforeend', newMessage);
    let lastMessage = document.querySelector('#messages .message__wrapper:last-child'); // Added a space to select the last child with the class "message__wrapper"
    if (lastMessage) {
        lastMessage.scrollIntoView();
    }
    
}

//let messageForm = document.getElementById('message__form');
document.body.addEventListener('mousemove', sendMessage);
