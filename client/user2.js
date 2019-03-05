// connecting with sockets.
const socket = io('http://localhost:3000');

const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6Ik1kX3l3eFdxYiIsImlhdCI6MTU1MTgwOTg2NzY2OCwiZXhwIjoxNTUxODk2MjY3LCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJlZENoYXQiLCJkYXRhIjp7InVzZXJJZCI6IkVhcFNzQXR4bCIsImZpcnN0TmFtZSI6ImFzaCIsImxhc3ROYW1lIjoidGl3IiwiZW1haWwiOiJhc2hAZ21haWwuY29tIiwibW9iaWxlTnVtYmVyIjo5ODAxMjEyMzR9fQ.yRB_JSSVhwcS04M7oJB8rM9Acwxca_0eRWtafg914qI"
const userId= "EapSsAtxl"

let chatMessage = {
  createdOn: Date.now(),
  receiverId: 'J959foI3Z',//putting other user
  receiverName: " ashishkiit",
  senderId: userId,
  senderName: "ash tiw"
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


  $("#send").on('click', function () {

    let messageText = $("#messageToSend").val()
    chatMessage.message = messageText;
    socket.emit("chat-msg",chatMessage)

  })

  $("#messageToSend").on('keypress', function () {

    socket.emit("typing","ash tiw")

  })

  socket.on("typing", (data) => {

    console.log(data+" is typing")
    
    
  });



}// end chat socket function

chatSocket();
