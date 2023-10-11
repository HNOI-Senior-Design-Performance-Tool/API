# API
A repo to hold the nodeJS backend of the system.
## Installation
Install NodeJS from:
``````
https://nodejs.org/en
``````
In your terminal run:
```
cd API
```
In the same terminal that is now in the API directory run:
```
npm install
```
To start the API run:
```
npm run dev
```
## Usage
### Adding new data
To add data to the database, using the API, you need to send a POST request to the server with the following format:
```
{
        "vehicleName": "2016 Ford Escape",
        "mpg": 36,
        "CO": 6,
        "NOx": 9,
        "particulateMatter": 24,
        "fuelLevel": 60,
        "voltage": 31,
        "time": "2023-10-08 05:15:47.123456"
}
```
You can also send multiple data points in the following format:
```
[
        {
        "vehicleName": "2016 Ford Escape",
        "mpg": 30,
        "CO": 10,
        "NOx": 7,
        "particulateMatter": 30,
        "fuelLevel": 58,
        "voltage": 37,
        "time": "2023-10-08 05:15:40.123456"
    },
    {
        "vehicleName": "2016 Ford Escape",
        "mpg": 36,
        "CO": 6,
        "NOx": 9,
        "particulateMatter": 26,
        "fuelLevel": 64,
        "voltage": 31,
        "time": "2023-10-08 05:15:42.123456"
    },
    {
        "vehicleName": "2016 Ford Escape",
        "mpg": 29,
        "CO": 11,
        "NOx": 8,
        "particulateMatter": 31,
        "fuelLevel": 27,
        "time": "2023-10-08 05:15:45.123456"
    }
]
```
#### Using Postman
Install Postman from:
```
https://www.postman.com/downloads/
```
### Following is an example of how to send a POST request using postman:
First, start the API by running these 2 commands:
```
cd API
npm run dev
```
After running npm run dev, the following should be displayed in the terminal:
```
> api@1.0.0 dev
> nodemon server.js

[nodemon] 3.0.1
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,cjs,json
[nodemon] starting `node server.js`
API is running on http://localhost:8080/
HNO Database Connected
```
Second, open up Postman and create a new POST request:

To upload a single data point:
```
localhost:8080/api/vehicleData/uploadData
```
To upload multiple data points:
```
localhost:8080/api/vehicleData/uploadManyData
```

The request should return a JSON object of the data uploaded:
```
{
        "vehicleName": "2016 Ford Escape",
        "mpg": 36,
        "CO": 6,
        "NOx": 9,
        "particulateMatter": 24,
        "fuelLevel": 60,
        "voltage": 31,
        "time": "2023-10-08 05:15:47.123456"
}
```
