import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import {ReadFile} from './readfiles.js'

yargs(hideBin(process.argv))
    .command('l', 'leer las lineas', {
    filename: {
    description: 'lee las lineas de un fichero',
    type: 'string',
    demandOption: true
    }
    }, (argv) => {
        const rf : ReadFile = new ReadFile(argv.filename,'lines')
        console.log(`Lineas del fichero: ${rf.numOf}`)
    })

    .command('w', 'leer las palabras', {
        filename: {
            description: 'lee las palabras de un fichero',
            type: 'string',
            demandOption: true
            }
    }, (argv) => {
        const rf : ReadFile = new ReadFile(argv.filename,'words')
        console.log(`Palabras del fichero: ${rf.numOf}`)
    })

    .command('c', 'leer los caracteres', {
        filename: {
            description: 'lee los caracteres de un fichero',
            type: 'string',
            demandOption: true
            }
    }, (argv) => {
        const rf : ReadFile = new ReadFile(argv.filename,'chars')
        console.log(`Caracteres del fichero: ${rf.numOf}`)

    })

.help()
.argv