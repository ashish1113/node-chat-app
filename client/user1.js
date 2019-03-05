// connecting with sockets.
const socket = io('http://localhost:3000');

const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6InhzN0p3ckYwSyIsImlhdCI6MTU1MTgwOTk4NDA1MCwiZXhwIjoxNTUxODk2Mzg0LCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJlZENoYXQiLCJkYXRhIjp7InVzZXJJZCI6Iko5NTlmb0kzWiIsImZpcnN0TmFtZSI6ImFzaGlzaGtpaXQiLCJsYXN0TmFtZSI6InRpdyIsImVtYWlsIjoiYXNraWl0QGdtYWlsLmNvbSIsIm1vYmlsZU51bWJlciI6OTgwMTIxMjM0OTEzfX0.6FjcdtVN2bDQ-dFndI0mF58TKkvzFWn79lPszRU6jZA"
const userId = "J959foI3Z"

let chatMessage = {
  createdOn: Date.now(),
  receiverId: 'EapSsAtxl',//putting user2's id here 
  receiverName: "ashtiw",
  senderId: userId,
  senderName: "ashishkiit"
}

let chatSocket = () => {

  socket.on('verifyUser', (data) => {

    console.log("socket trying to verify user");

    socket.emit("set-user", authToken);

  });

  socket.on(userId, (data) => {

    console.log("you received a message from "+data.senderName)
    console.log(data.message)

  });

  socket.on("online-user-list", (data) => {

    console.log("Online user list is updated. some user can online or went offline")
    console.log(data)

  });

  socket.on("typing", (data) => {

    console.log(data+" is typing")
    
    
  });

  $("#send").on('click', function () {

    let messageText = $("#messageToSend").val()
    chatMessage.message = messageText;
    socket.emit("chat-msg",chatMessage)

  })

  $("#messageToSend").on('keypress', function () {

    socket.emit("typing","ashishkiit")

  })




}// end chat socket function

chatSocket();
