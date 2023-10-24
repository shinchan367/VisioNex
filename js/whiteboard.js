

           import { on } from "socket.io-client";
        
           on('connection', (s) => {
               console.log(s);
           })