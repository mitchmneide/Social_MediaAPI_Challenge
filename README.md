# Social Network API 
![Github license](https://img.shields.io/badge/MIT-blue.svg)
## Description
A backend API for a social media using NoSQL database, where users can share their thoughts,reactions and poteinally make friends. This project uses Node/Express.js/MongoDB/Mongoose ODM Tested in Insominia. 
[Video Demo](https://drive.google.com/file/d/1u24xmABtKREpj3GkZ1MNPPx16QUJF-PT/view?usp=sharing)
## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [Technologies](#technologies)
* [License](#license)
* [Credits](#credits)

## Installation
In order to install this you must first have Node.js & MongoDB installed on your local machine .
If you have them once installed. run `npm init -y` to initialize. Follow up with `npm install/ npm i`

## Usage
To start this server and test the API routes. Type `npm start` or `node server` in the command line. 
Once started we are ready to test out the routes.
User Routes:
* `localhost:3001/api/users/` to get all users
* `localhost:3001/api/users/:userId` to get users by ID,PUT Delete
* `localhost:3001/api/users/:userId/friends/:userId` To Add and Remove Friend

Thoughts Routes: 
* `localhost:3001/api/thoughts` to GET all thoughts
* `localhost:3001/api/thoughts/:thoughtId`to GET Thought by ID, PUT & Delete thoughts
* `localhost:3001/api/thoughts/:thoughtId/reactions` POST a reaction to a Thought
* `localhost:3001/api/thoughts/:thoughtId/reactions/reactionId` Delete Reaction 




## Technologies
* [Node.js](https://nodejs.org/en/)
* [MongoDB](https://www.mongodb.com/)
* [Express](https://www.npmjs.com/package/express)
* [Mongoose](https://www.npmjs.com/package/mongoose)
## License
 &copy; 2022 by Mitchel Eide
  Project is licensed under MIT license
  [License: MIT](https://opensource.org/licenses/MIT)
## Credits
The weeks module really helped in finishing this project<br>
Dateformat code from Module 18 <br>
For Validate Email this is what helped me to get it done: [theWebdev](https://thewebdev.info/2022/03/16/how-to-validate-email-syntax-with-mongoose/)
