// import {createServer,Socket} from 'net';
// import {spawn,spawnSync} from 'child_process';
// import {Buffer} from 'buffer'

// export class Server{
//     private server:any;

//     /**
//      * constructor de la clase del servidor
//      */
//     constructor(){
//         this.server = createServer({allowHalfOpen:true},this.handleConnection.bind(this))
//     }

//     /**
//      * metodo que inicia la escucha del servidor en el puerto indicado
//      * @param port puerto en el que el servidor iniciara la escucha
//      */
//     listen(port:number){
//         this.server.listen(port,()=>{
//             console.log(`Servidor escuchando en el puerto ${port}`)
//         });
//     }

//     /**
//      * metodo que maneja las conexiones entrantes de los clientes
//      * @param socket socket que se ha conectado al servidor y que sera manejado
//      */
//     private handleConnection(socket: Socket) {
//         console.log('Un cliente se ha conectado');
    
//         let buffer = Buffer.alloc(0);

//         socket.on('data', data => {
//             buffer = Buffer.concat([buffer, data]);

//             const messageEnd = buffer.indexOf('\n');
//             if (messageEnd !== -1) {
//                 const message = buffer.subarray(0, messageEnd);
//                 buffer = buffer.subarray(messageEnd + 1);

//                 const [command, ...args] = message.toString().split(' ');

//                 if (this.isValidCommand(command)) {
//                     const result = this.executeCommand(command, args);
//                     socket.write(result);
//                 } else {
//                 socket.write(`El comando no es valido: ${command}\n`);
//             }
//             }
//         });

//         socket.on('close', () => {
//             console.log('Un cliente se ha desconectado');
//         });
//     }

//     /**
//      * metodo que ejecuta un comando recibido del cliente
//      * @param command comando que va a ser ejecutado
//      * @param args argumentos del comando si los necesitase
//      * @returns devuelve una promesa con la ejecucion del comando que se le ha pasado
//      */
//     private async executeCommand(command: string, args: string[]): Promise<string> {

//         return new Promise((resolve, reject) => {
//             const process = spawn(command, args);
    
//             let output = '';
    
//             process.stdout.on('data', data => {
//                 output += data;
//             });
    
//             process.stderr.on('data', error => {
//                 reject(error);
//             });
    
//             process.on('exit', code => {
//                 if (code === 0) {
//                     resolve(output);
//                 } else {
//                     reject(`Command '${command}' failed with exit code ${code}`);
//                 }
//             });
//         });
//     }

//     /**
//      * metodo que comprueba si un comando pasado al servidor es valido
//      * @param command comando que va a ser comprobado
//      * @returns devuelve la ejecucion de which, que devolvera 0 si encuentra el comando en la carpeta donde se almacenan en el servidor, o un valor distinto de 0 si no lo encuentra
//      */
//     private isValidCommand(command: string): boolean {
//         const result = spawnSync('which', [command]);
//         return result.status === 0;
//     }
    
// }

// const server = new Server();
// server.listen(3000);