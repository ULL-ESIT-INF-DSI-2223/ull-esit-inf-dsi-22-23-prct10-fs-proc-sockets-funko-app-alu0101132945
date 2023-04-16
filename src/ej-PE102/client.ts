// import { Socket } from 'net';

// class Client {
//     private socket: Socket;

//     /**
//      * constructor del cliente que crea un nuevo socket
//      */
//     constructor() {
//         this.socket = new Socket();
//     }

//     /**
//      * metodo que conecta el cliente con el servidor
//      * @param host direccion del servidor
//      * @param port puerto de conexion del host
//      */
//     connect(host: string, port: number) {
//         this.socket.connect(port, host, () => {
//         console.log(`Connected to ${host}:${port}`);
//         });

//         this.socket.on('data', data => {
//             console.log(data.toString());
//         });

//         this.socket.on('close', () => {
//             console.log('Connection closed');
//         });
//     }

//     /**
//      * metodo que manda un comando al servidor
//      * @param command comando que va a ser enviado
//      * @param args argumentos del comando
//      */
//     sendCommand(command: string, args: string[]) {
//         this.socket.write(`${command} ${args.join(' ')}\n`);
//     }
// }

// const client = new Client();
// client.connect('localhost', 3000);

// // Ejemplo de uso
// client.sendCommand('ls', ['-l']);
// client.sendCommand('pwd', []);
// client.sendCommand('echo', ['Hola, mundo!']);
