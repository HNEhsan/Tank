// import package
import { Server } from "socket.io";
import { io } from "socket.io-client";

// import lib

// const httpServer = createServer(app);
const IO = new Server(3000)


// define global variables
let user_info = {}

// socket-server function
let Connection = () => {

    // alert socket is run
    console.log("\x1b[32m%s\x1b[0m","server is run ...")

    // main-socket event
    IO.on("connection", (socket) => {

        // alert client is connected 
        console.log("\x1b[34m%s\x1b[0m","socket-client is connected and socket-ID is : "+socket.id)        
        
        // fetch client-ip from socket
        let address = socket.request.connection.remoteAddress

        // remove format ipV6
        address = address.replace("::ffff:","")

        // log full-info client connected to  ther server
        console.log("\x1b[33m%s\x1b[0m","socket-client is connected and socket-ID is : "+socket.id+" and client-IP is : "+address)        

        //  assign ip with socket.id user key
        user_info[socket.id] = address

        console.log("user info is : ", user_info)

        // join to room
        socket.join("room")

        // chat event 
        socket.on("message", (data) => {
            console.log("user with ip : ",user_info[socket.id], "send this message : ", data);

            // send message to another user
            IO.to("room").emit("ans_message", data)
        })

        // 
        IO.to("room").emit("player_info", user_info);

        // 
        let user_number = Object.keys(user_info).length
        if (user_number === 2)
        {
            console.log("game is start");
            IO.to("room").emit("start_game")
        }

        // 
        // socket.on("test", (data) => {
        //     console.log("data is : ", data);
        // })

        // disconnect event
        socket.on("disconnect", () => {
            delete user_info[socket.id]
            console.log("\x1b[31m%s\x1b[0m","socket-client is connected and socket-ID is : "+socket.id+"and other user is : \n",user_info)        
        })
    })
}

// run main-app
Connection()
