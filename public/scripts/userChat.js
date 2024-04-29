// // async function run(){
// //     try{
// //         const lastDataResponse =await fetch("/messages");
// //         const lastData = await lastDataResponse.json();
// //         lastData.forEach(element => {
            
// //         });
// //     }
// //     catch(err){
// //         console.log(err);
// //     }
// // }

// const input = document.querySelector("#input-txt");
// const chatbox = document.querySelector(".chatTxt");

// function createMessageElement(){
//     const newTextElement = document.createElement("div");
//     newTextElement.textContent = input.value
//     newTextElement.classList.add("chatMessage")
//     chatbox.append(newTextElement)
// }

// function sendData() {

//   // Make a POST request to the server with the input value
//   fetch('/userChat', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ inputValue: input.value })
// })
// .then(response => {
//     // Handle response from server if needed
//     console.log('Data sent successfully');
// })
// .catch(error => {
//     // Handle errors if any
//     console.error('Error sending data:', error);
// });
  
// }

// setInterval(()=>{
//   let messages;

// // Fetch data from the server
// fetch('/chatData')
//     .then(response => response.json())
//     .then(data => {
//         messages = data;
//         // Now the "messages" variable holds the received data
//         console.log(messages); // Optionally, you can log it here
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });

// }, 2000);

// input.addEventListener('keydown', (event) => {
//     // Check if Enter key was pressed
//     if (event.key === 'Enter') {
//       // Your code to handle Enter key press
//         createMessageElement()
//       sendData(input.value)
      
    
//     }
// });


// async function run(){
//     try{
//         const lastDataResponse =await fetch("/messages");
//         const lastData = await lastDataResponse.json();
//         lastData.forEach(element => {
            
//         });
//     }
//     catch(err){
//         console.log(err);
//     }
// }


const input = document.querySelector("#input-txt");
const chatbox = document.querySelector(".chatTxt");

function createMessageElement(value){
    const newTextElement = document.createElement("div");
    newTextElement.textContent = value
    newTextElement.classList.add("chatMessage")
    chatbox.append(newTextElement)
}

async function sendData(message) {
  // Make a POST request to the server with the input value
    const response = await fetch('/userChat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: message })
        })
    const data = await response.json();
    if(data.saved === "true"){
        // createMessageElement(message)
        console.log("message saved")
    }else{
        console.log("Error sending message")
    }
    

}

let cache=[];
async function fetchChats(){
    const response = await fetch("/allChatsUser");
    const data = await response.json();
        if(cache.length !== data.messages.length){
            let newMessages = data.messages.slice(cache.length);
            newMessages.forEach(element => {
                createMessageElement(element);
            });
            cache = data.messages;
            input.value="";
        }
}

// setInterval(()=>{
//   let messages;

// Fetch data from the server
// fetch('/chatData')
//     .then(response => response.json())
//     .then(data => {
//         messages = data;
//         // Now the "messages" variable holds the received data
//         console.log(messages); // Optionally, you can log it here
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });

// }, 2000);



input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        // createMessageElement()
        sendData(input.value)
    }
});

setInterval(fetchChats,100);