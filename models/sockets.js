class Sockets {
    constructor(io){
        this.io=io;
        this.socketEvents();
    }
    socketEvents(){
        this.io.on('connection', (socket) => { 
            console.log(`socket.id`, socket.handshake.query.nombre);
            this.io.emit('mensaje-bienvenida','Se conecto el usuario '+socket.handshake.query.nombre);
            socket.on('mensaje-cliente',(datos)=>{
                console.log(`mensaje-cliente`, datos);
                this.io.emit('mensaje-server',socket.handshake.query.nombre+': '+datos);
            });
            socket.on("disconnect", () => {
                console.log(`disconnect`);
                this.io.emit('mensaje-bienvenida','Se Desconecto el usuario '+socket.handshake.query.nombre);
              });
            socket.on("mensaje-escribiendo", () => {
                this.io.emit('mensaje-escribiendo','Escribiendo el usuario '+socket.handshake.query.nombre);
            });  

            socket.on("mensaje-soltando", () => {
                this.io.emit('mensaje-soltando','');
            });
         });

    }
}

module.exports=Sockets;