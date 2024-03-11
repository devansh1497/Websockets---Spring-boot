## Steps to run

### Server side

Just run the Spring boot app normally. 

### Client side

1. Go to the ```/client``` directory.
2. Run ```npm install``` to install all the dependencies. 
3. Open a terminal window/tab and run ```node DeliveryPerson.js```. This will be sending location coordinates to the server via websocket.
4. Open a another terminal window/tab and run ```node Customer.js```. This will print the location updates received from the server via the websocket connection,
