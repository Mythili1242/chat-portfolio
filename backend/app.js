const express=require("express");
var logger = require('morgan');
const http=require("http");
const cors=require("cors")
const mongoose=require("mongoose");
const socketIO=require("socket.io");
mongoose.connect("mongodb+srv://Mythili:0aBaXezG4PiUmXjE@atlascluster.roimqdb.mongodb.net/fullchat?retryWrites=true&w=majority").then(()=>console.log("db connected")).catch(err=>console.log(err))
// Create a schema for chat messages
const chatMessageSchema = new mongoose.Schema({
  content: String,
  sender: String,
  timestamp: { type: Date, default: Date.now }
});

// Create a model based on the schema
const ChatMessage = mongoose.model('ChatMessages', chatMessageSchema);

//======================
var usersRouter=require("./routes/users")

const app=express();
const corsOptions = {
    origin: 'http://localhost:4200', 
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
  };
app.use(cors(corsOptions));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });
app.use("/users",usersRouter);

const server=http.createServer(app);
const io=socketIO(server);



// Maintain a mapping of session IDs to usernames
const users = new Map();

io.on('connection', (socket) => {
    console.log('A user connected.');
   // Listen for user login
 socket.on('login', (username) => {
  users.set(socket.id, username);
  socket.emit('new-user');
  socket.broadcast.emit('new-user');
   // Retrieve chat history from the database and emit it to the client
   ChatMessage.find({})
   .sort({ timestamp: 'asc' })
   .exec().then(messages=>
       {socket.emit('chat-history', messages);console.log("history")})
});

    socket.emit('new-user');

    // Retrieve chat history from the database and emit it to the client
  ChatMessage.find({})
  .sort({ timestamp: 'asc' })
  .exec().then(messages=>
      {socket.emit('chat-history', messages);console.log("history")})
   
        


 // Listen for new messages
 socket.on('message', (msg) => {
  console.log(msg)
  const username = users.get(socket.id);
  // Save the chat message to the database
  const message = new ChatMessage({
    content: msg.content,
    sender: msg.sender
  });

  message.save()
    .then(() => {
      // Emit the chat message to all connected clients
      io.emit('message',message );
    })
    .catch((error) => {
      console.error('Error saving chat message:', error);
    });
//   io.emit('message', { username, message });
});

// socket.on('deletereq',()=>{

//   ChatMessage.deleteMany({}).then(res=>console.log(res))
  
// })


//  Handle typing events
  socket.on('typing', () => {
    socket.broadcast.emit('typing',users.get(socket.id) ); // Broadcast typing event to other clients
console.log("typing")
  });

  socket.on('stopTyping', () => {
    socket.broadcast.emit('stopTyping',users.get(socket.id)); // Broadcast stop typing event to other clients
    console.log("stop typing")
  });


  
  // Listen for user disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
    // io.emit('del',users.get(socket.id))
    users.delete(socket.id);
    socket.emit('new-user');
    socket.broadcast.emit('new-user');
  });

 

  });



  app.get("/details",(req,res)=>{
    console.log(users);
    const obj = Object.fromEntries(users);
    res.send(obj)



})

  const port = process.env.PORT || 3001;
  server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

