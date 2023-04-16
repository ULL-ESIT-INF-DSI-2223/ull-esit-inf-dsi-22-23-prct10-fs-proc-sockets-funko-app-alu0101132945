import net from 'net';
import { Funko } from './funko.js';
import { FunkoUserStorage } from './usuario.js';
import { RequestType,ResponseType } from './tipos.js';

function gestRequest(peticion: RequestType): ResponseType {
    const user = new FunkoUserStorage(peticion.username);
    switch (peticion.type) {
        case 'add':
            if(peticion.funkoPop){
            const add = user.addFunko(peticion.funkoPop);
            return { type: 'add', success: true , successmsg: add};
            }else{
                return { type: 'add', success: false};
            }
        case 'update':
            if(peticion.funkoPop){
                const update = user.updateFunko(peticion.funkoPop);
                return { type: 'update', success: true , successmsg: update};
            }else{
                return { type: 'update', success: false};
            }
        case 'remove':
            if(peticion.id){
                const remove = user.removeFunko(peticion.id);
                return { type: 'remove', success: true , successmsg: remove};
            }else{
                return { type: 'remove', success: false};
            }
        case 'read':
            if(peticion.id){
                const funko = user.showFunko(peticion.id);
                return { type: 'read', success: true , successmsg: funko};
            }else{
                return { type: 'read', success: false};
            }
        case 'list':
                const funko = user.listFunko();
                if(funko.length == 0){return { type: 'read', success: false};}
                else{
                return { type: 'read', success: true , successmsg: funko};
                }
        default:
        return { type: 'unknown', success: false };
    }
}

const server = net.createServer();

server.on('connection', (socket) => {
    console.log(`Un cliente se ha conectado: ${socket.remoteAddress}:${socket.remotePort}`);

    let buffer = Buffer.alloc(0);
    let longitudMensaje = -1;

    socket.on('request', (request:RequestType) => {
        socket.emit('response',gestRequest(request))
    });

    socket.on('end', () => {
        console.log(`Un cliente se ha desconectado: ${socket.remoteAddress}:${socket.remotePort}`);
    });
});

server.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});
