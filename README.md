# fastify-node-server
Small http server with Fastify


### install
 
 - use node v16 (mac: https://noviello.it/come-installare-nvm-su-macos-con-homebrew/)
 - clone repo
 - yarn install (or npm install if you like more)
 - yarn server:start


### server
 - server run on port 3000 as default
 - open browser 
 - localhost:3000/character -> list of characters available
 - localost:3000/character/pippo -> test if exist pippo character in the list



 - post request (curl example : `curl -d "first_name=pippo" -X POST http://localhost:3000/characters`)