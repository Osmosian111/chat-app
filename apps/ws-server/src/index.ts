require("dotenv").config()

import { WebSocketServer } from "ws"

const wss = new WebSocketServer({port:8080})

wss.on("connection",(ws)=>{
    ws.send(JSON.stringify({
        msg:"connected to ws server"
    }))
})