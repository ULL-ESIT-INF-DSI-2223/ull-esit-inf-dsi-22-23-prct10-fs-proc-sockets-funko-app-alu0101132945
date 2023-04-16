import yargs from 'yargs';
import { Stream } from 'stream';
import fs from 'fs'
import { hideBin } from 'yargs/helpers';

yargs(hideBin(process.argv))
    .command('l', 'leer las lineas', {
    filename: {
    description: 'lee las lineas de un fichero',
    type: 'string',
    demandOption: true
    }
    }, (argv) => {
        let contLin = 0;
        const readStream = fs.createReadStream(argv.filename, { encoding: 'utf-8' }); 
        readStream.on('data', (chunk : string) => {
            contLin += chunk.split('\n').length - 1
        });
        let result = `Lineas del fichero: ${contLin}\n`
        process.stdout.write(result);
        process.stdin.resume();
    })

    .command('w', 'leer las palabras', {
        filename: {
            description: 'lee las palabras de un fichero',
            type: 'string',
            demandOption: true
            }
    }, (argv) => {     
        let contPal = 0;
        const readStream = fs.createReadStream(argv.filename, { encoding: 'utf-8' }); 
        readStream.on('data',(chunk : string) => {
            const words = chunk.split(/\s+/).filter((word) => word);
            contPal += words.length;
        });
        let result = `Palabras del fichero: ${contPal}\n`
        process.stdout.write(result);
        process.stdin.resume();
    })

    .command('c', 'leer los caracteres', {
        filename: {
            description: 'lee los caracteres de un fichero',
            type: 'string',
            demandOption: true
            }
    }, (argv) => {
        let contCar = 0;
        const readStream = fs.createReadStream(argv.filename, { encoding: 'utf-8' });
        readStream.on('data', (chunk) => {
            contCar += chunk.length;
        });
        let result = `Palabras del fichero: ${contCar}\n`
        process.stdout.write(result);
        process.stdin.resume();
    })

.help()
.argv