const express=require('express')
const app=express()
const path=require('path');
const http=require('http').createServer(app)

const PORT=process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

http.listen(PORT,()=>{

    console.log(`Listening on port ${PORT}`)
})

app.get('/',(req,res)=>{
 
    res.sendFile(__dirname+'/index.html')

})

//socket io setup
const io=require('socket.io')(http)

io.on('connection',(socket)=>{

    console.log('connected...')

    socket.on('message',(msg)=>{
        socket.broadcast.emit('message',msg)
    })

})
