import { Funko} from './funko.js';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import {FunkoUserStorage} from './usuario.js';

/**
 * Ejecucion:
 * 
 * $ node dist/funkoApp/funko-app.js add --user 'user1' --id 1 --name 'Classic Sonic' --desc 'The best Sonic Funko ever' --type 'p' --gener 'g' --franq 'Sonic' --num 400 --excl false --carac 'Quick Funko' --value 30.15
 * $ node dist/funkoApp/funko-app.js modify --user 'user1' --id 1 --name 'New Sonic' --desc 'A better Sonic Funko' --type 'pr' --gener 'g' --franq 'Sonic' --num 400 --excl true --carac 'Quick Funko' --value 60.87
 * $ node dist/funkoApp/funko-app.js remove --user 'user1' --id 1
 * $ node dist/funkoApp/funko-app.js list --user 'user1'
 * $ node dist/funkoApp/funko-app.js show --user 'user1' --id 1
 * 
 */

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
    let user: FunkoUserStorage = new FunkoUserStorage(argv.user);
    user.addFunko(new Funko(argv.id, argv.name, argv.desc,argv.type,argv.gener, argv.franq, argv.num, argv.excl, argv.esp, argv.val));
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
    const user = new FunkoUserStorage(argv.user);
    user.updateFunko(new Funko(argv.id, argv.name, argv.desc,argv.type,argv.gener, argv.franq, argv.num, argv.excl, argv.esp, argv.val));
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
    const user = new FunkoUserStorage(argv.user);
    user.removeFunko(argv.id);
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
    const user = new FunkoUserStorage(argv.user);
    user.showFunko(argv.id);
    })



    .command('list', 'lista los funkos de un usuario', {
        user: {
        description: 'Nombre de usuario',
        type: 'string',
        demandOption: true
        }
    
    }, (argv) => {
    const user = new FunkoUserStorage(argv.user);
    user.listFunko();
    })

.help()
.argv