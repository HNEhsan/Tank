import { io } from "socket.io-client";

const socket = io("ws://192.168.1.34:3000")

socket.emit("message", "hi")

socket.on("ans_message", (data) => {
    console.log(data);
})
