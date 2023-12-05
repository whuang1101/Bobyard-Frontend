# How to run it locally

1. Git clone from this repository
2. cd into bobyard-frontend
3. npm install
4. npm run dev
5. It should run on localhost:5173

Right now this frontend is made to work with the backend of django.
If you would like it to try out the node version 
- To convert this from a backend using django to a backend using node.js you will need to change the http://127.0.0.1:8000/message/ to http://localhost:3000/comments/
- and switch id in the map with _id because you're using MongoDB instead of sqlite3
