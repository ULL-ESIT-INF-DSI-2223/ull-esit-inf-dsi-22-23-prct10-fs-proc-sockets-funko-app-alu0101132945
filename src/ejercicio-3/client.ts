import net from 'net';
import readline from 'readline'
import { RequestType,ResponseType } from './tipos.js';
import { Funko} from './funko.js';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const socket = new net.Socket();

socket.connect(3000, 'localhost', () => {
    console.log('Te has conectado al servidor');
});

yargs(hideBin(process.argv))
    .command('add', 'Añadir un funko', {
    user: {
    description: 'Nombre de usuario',
    type: 'string',
    demandOption: true
    },
    id: {
    description: 'Funko ID',
    type: 'number',
    demandOption: true
    },
    name: {
        description: 'Funko Nombre',
        type: 'string',
        demandOption: true
    },
    desc: {
        description: 'Funko Descripcion',
        type: 'string',
        demandOption: true
    },
    type: {
        description: 'Funko Tipo',
        type: 'string',
        demandOption: true
    },
    gener: {
        description: 'Funko Genero',
        type: 'string',
        demandOption: true
    },
    franq: {
        description: 'Funko Franquicia',
        type: 'string',
        demandOption: true
    },
    num: {
        description: 'Funko Número Franquicia',
        type: 'number',
        demandOption: true
    },
    excl: {
        description: 'Funko Exclusivo',
        type: 'boolean',
        demandOption: true
    },
    esp: {
        description: 'Funko Caractericticas Especiales',
        type: 'string',
        demandOption: true
    },
    val: {
        description: 'Funko Valor Mercado',
        type: 'number',
        demandOption: true
    }

    }, (argv) => {
        const funko =new Funko(argv.id, argv.name, argv.desc,argv.type,argv.gener, argv.franq, argv.num, argv.excl, argv.esp, argv.val);
        const request:RequestType = {
            type:'add',
            username: argv.user,
            funkoPop: funko
        }
        socket.emit('request',request)
        socket.on('response',(response:ResponseType)=>{
            if(response.success){
                console.log(response.successmsg)
            }else{
                console.error('No se pasaron los argumentos correctos al servidor')
            }
        })
    })

    .command('update', 'actualiza un funko', {
        user: {
        description: 'Nombre de usuario',
        type: 'string',
        demandOption: true
        },
        id: {
        description: 'Funko ID',
        type: 'number',
        demandOption: true
        },
        name: {
            description: 'Funko Nombre',
            type: 'string',
            demandOption: true
        },
        desc: {
            description: 'Funko Descripcion',
            type: 'string',
            demandOption: true
        },
        type: {
            description: 'Funko Tipo',
            type: 'string',
            demandOption: true
        },
        gener: {
            description: 'Funko Genero',
            type: 'string',
            demandOption: true
        },
        franq: {
            description: 'Funko Franquicia',
            type: 'string',
            demandOption: true
        },
        num: {
            description: 'Funko Número Franquicia',
            type: 'number',
            demandOption: true
        },
        excl: {
            description: 'Funko Exclusivo',
            type: 'boolean',
            demandOption: true
        },
        esp: {
            description: 'Funko Caractericticas Especiales',
            type: 'string',
            demandOption: true
        },
        val: {
            description: 'Funko Valor Mercado',
            type: 'number',
            demandOption: true
        }
    
    }, (argv) => {
        const funko = new Funko(argv.id, argv.name, argv.desc,argv.type,argv.gener, argv.franq, argv.num, argv.excl, argv.esp, argv.val);
        const request:RequestType = {
            type:'update',
            username: argv.user,
            funkoPop: funko
        }
        socket.emit('request',request)
        socket.on('response',(response:ResponseType)=>{
            if(response.success){
                console.log(response.successmsg)
            }else{
                console.error('No se pasaron los argumentos correctos al servidor')
            }
        })
    })

    .command('remove', 'borrar un funko', {
        user: {
        description: 'Nombre de usuario',
        type: 'string',
        demandOption: true
        },
        id: {
        description: 'Funko ID',
        type: 'number',
        demandOption: true
        },
    
    }, (argv) => {
        const request:RequestType = {
            type:'remove',
            username: argv.user,
            id: argv.id
        }
        socket.emit('request',request)
        socket.on('response',(response:ResponseType)=>{
            if(response.success){
                console.log(response.successmsg)
            }else{
                console.error('No se pasaron los argumentos correctos al servidor')
            }
        })
    })

    .command('show', 'muestra un funko', {
        user: {
        description: 'Nombre de usuario',
        type: 'string',
        demandOption: true
        },
        id: {
        description: 'Funko ID',
        type: 'number',
        demandOption: true
        },
    
    }, (argv) => {
        const request:RequestType = {
            type:'read',
            username: argv.user,
            id: argv.id
        }
        socket.emit('request',request)
        socket.on('response',(response:ResponseType)=>{
            if(response.success){
                console.log(response.successmsg)
            }else{
                console.error('No se pasaron los argumentos correctos al servidor')
            }
        })
    })



    .command('list', 'lista los funkos de un usuario', {
        user: {
        description: 'Nombre de usuario',
        type: 'string',
        demandOption: true
        }
    
    }, (argv) => {
        const request:RequestType = {
            type:'list',
            username: argv.user,
        }
        socket.emit('request',request)
        socket.on('response',(response:ResponseType)=>{
            if(response.success){
                console.log(response.successmsg)
            }else{
                console.error('No se pasaron los argumentos correctos al servidor')
            }
        })
    })

.help()
.argv