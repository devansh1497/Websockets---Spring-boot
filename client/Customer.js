
const StompJs = require('stompjs');
const WebSocket = require('ws');

const webSocketURL = 'ws://localhost:8080/ws';

const DELIVERY_MAN_ID = 1;
const CUSTOMER_ID = 1;
const TOPIC = `${DELIVERY_MAN_ID}-${CUSTOMER_ID}`;



const stompClient = StompJs.over(new WebSocket(webSocketURL));



stompClient.onConnect = (frame) => {
    const msg = `Delivery person with ${DELIVERY_MAN_ID} is connected to the ws...`
    console.log(msg);
    stompClient.subscribe(`/location/@${TOPIC}`, (msg) => {
        console.log("Receoved update: "+ msg)
    })
}

stompClient.onStompError = (error) => {
    console.log('error in delivery client', error);
}

stompClient.onWebSocketError = (error) => {
    console.error('Error with websocket', error);
};

stompClient.onWebSocketError = (error) => {
    console.log("Error in web socket error for the delivery man", error)
}

stompClient.connect({}, () => {
    stompClient.subscribe(`/location/${TOPIC}`, (msg) => {
        console.log("Received location update: "+ msg.body)
    })    
}, () => {
    console.log('error when connecting')
});
