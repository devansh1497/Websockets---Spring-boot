const StompJs = require('stompjs');
const WebSocket = require('ws');

const webSocketURL = 'ws://localhost:8080/ws';

const DELIVERY_MAN_ID = 1;
const CUSTOMER_ID = 1;
const TOPIC = `${DELIVERY_MAN_ID}-${CUSTOMER_ID}`;

const stompClient = StompJs.over(new WebSocket(webSocketURL));

stompClient.onConnect = (frame) => {
    console.log(`Delivery person with ${DELIVERY_MAN_ID} is connected to the WebSocket`);
};

stompClient.onStompError = (error) => {
    console.log('Error in STOMP protocol', error);
};

stompClient.onWebSocketError = (error) => {
    console.error('Error with WebSocket connection', error);
};

stompClient.connect({}, () => {
    setInterval(() => {
        const locationUpdate = { longitude: getRandomInt(213, 43245), latitude: getRandomInt(146,435335) };
        console.log('Sending location update:', locationUpdate);
        stompClient.send(`/app/location/${TOPIC}`, {}, JSON.stringify(locationUpdate));
    }, 1000);
}, () => {
    console.log('Error when connecting to WebSocket');
});

function getRandomInt(min, max) {
    min = Math.ceil(min); // Round up the minimum value
    max = Math.floor(max); // Round down the maximum value
    return Math.floor(Math.random() * (max - min + 1)) + min; // Generate random integer
  }
  
  