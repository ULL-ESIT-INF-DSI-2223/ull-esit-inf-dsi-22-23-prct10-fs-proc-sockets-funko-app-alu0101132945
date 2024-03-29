import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';
import { Funko } from './funko.js';

export class FunkoUserStorage{
    
    private readonly userDir: string;
    private readonly funkomap: Map<number,Funko> = new Map();
    
    /**
     * constructor de la clase FunkoUserStorage
     * @param user usuario de la aplicacion
     */
    constructor(private readonly user:string){
        
        this.userDir = path.join('./','data',user);
        if(!fs.existsSync(this.userDir)){
            fs.mkdirSync(this.userDir,{recursive:true});
        }
        if(fs.existsSync(this.userDir) && fs.readdirSync(this.userDir).length != 0 && this.funkomap.size == 0){
            this.funkomap = this.funkoUpload();
        }
    }

    /**
     * metodo que carga el map del usuario con los funkos guardados en su directorio
     * @returns el map con los funkos del usuario
     */
    private funkoUpload(): Map<number, Funko> {
        let funkos = new Map<number, Funko>();
          // Verificar si el directorio existe, y crearlo si no existe
            if (!fs.existsSync(this.userDir)) {
                fs.mkdirSync(this.userDir);
            }

            const files = fs.readdirSync(this.userDir);
            files.forEach(file => {
                const filePath = path.join(this.userDir, file);
                const funkofile = fs.readFileSync(filePath,'utf-8')
                const funkodata= JSON.parse(funkofile)
                const funko : Funko = new Funko(funkodata.id,funkodata.name,funkodata.descripcion,funkodata.tipo,funkodata.genero,funkodata.franquicia,funkodata.numero,funkodata.exclusivo,funkodata.especial,funkodata.valor);
                funkos.set(funko.getID(),funko);
                
            });
        return funkos;
    }
    /**
     * metodo que guarda un funko del usuario en el directorio
     * @param funko funko que va a ser guardado
     */
    private funkoSave(funko:Funko):void{
        const filePath = path.join(this.userDir,`${funko.getName()}.json`);
        const funkoData = JSON.stringify(funko,null,2);
        fs.writeFileSync(filePath,funkoData,'utf-8');
    }
    
    /**
     * metodo que borra un fichero json con un funko del directorio del usuario
     * @param funko funko que va a ser borrado
     */
    private funkoDelete(funko:Funko):void{
        const filePath = path.join(this.userDir,`${funko.getName()}.json`);
        fs.unlinkSync(filePath);
    }

    /**
     * metodo que establece el color de un funko  por su precio
     * @param funko funko cuyo color va a ser determinado
     * @returns devuelve el color en una cadena del funko 
     */
    private funkoColor(funko: Funko){
        if(funko.getVal() <= 30){
            return '#FF334F';
            
        }else if(funko.getVal() > 30 && funko.getVal() <= 70){
            return'#FFA833';
            
        }else if(funko.getVal() > 70 && funko.getVal() <= 100){
            return '#F6FF33';
        }else{
            return '#33FFF9';
        }
    }

    /**
     * metodo que devuelve un funko del map del usuario
     * @param id ID del funko que se va a buscar
     * @returns un funko si lo encuentra o undefined si no esta en el map
     */
    public getFunko(id:number):Funko | undefined{
        return this.funkomap.get(id);
    }

    /**
     * metodo que añade un funko al map del usuario y a su directorio
     * @param funko funko que se va a añadir al usuario
     */
    public addFunko(funko:Funko): string{
        if(this.funkomap.has(funko.getID())){
            return (chalk.red(`El funko con ID ${funko.getID()} ya existe en la lista`));
        }else{
            this.funkomap.set(funko.getID(),funko);
            this.funkoSave(funko);
            return (chalk.green(`Funko con ID ${funko.getID()} añadido a la lista`));
        }
    }

    /**
     * metodo que actualiza los datos de un funko del usuario
     * @param funko funko que va a ser actualizado
     */
    public updateFunko(funko: Funko):string{
        const id = funko.getID();

        const filedir = path.join(this.userDir,`${this.funkomap.get(id)?.getName()}.json`)
        if(!fs.existsSync(filedir)){
            return (chalk.red(`No se encontro ningun funko con ID ${funko.getID()} en la lista`))
        }else{
            const funkofile = fs.readFileSync(filedir,'utf-8')
            const funkodata= JSON.parse(funkofile)
            const funko2 : Funko = new Funko(funkodata.id,funkodata.name,funkodata.descripcion,funkodata.tipo,funkodata.genero,funkodata.franquicia,funkodata.numero,funkodata.exclusivo,funkodata.especial,funkodata.valor);
            this.funkoDelete(funko2);
            this.funkomap.delete(funko2.getID())    
            this.funkomap.set(id,funko);
            this.funkoSave(funko);
            return (chalk.green(`funko con ID ${funko.getID()} modificado en la lista`));
        }
    }

    /**
     * metodo que borra un funko del map y del directorio del usuario
     * @param id id del funko que va a ser borrado
     */
    public removeFunko(id:number):string{
        const funko = this.getFunko(id);
        if(funko){
            this.funkomap.delete(id);
            this.funkoDelete(funko);
            return (chalk.green(`funko con ID ${id} eliminado de la lista`))
        }else{
            return (chalk.red(`No se encontro ningun funko con ID ${id} en la lista`))
        }
    }

    /**
     * metodo que devuelve los funkos de un usuario con sus datos
     */
    public listFunko():string{
        let result = ''
        this.funkomap.forEach(funko => {
            result += `-------------------------------\n`
            result += this.showFunko(funko.getID());
            result += `\n`
        });
        return result;
    }

    /**
     * metodo que muestra los datos de un funko en concreto
     * @param id id del funko del que se buscan los datos
     */
    public showFunko(id:number):string{
        const funko = this.getFunko(id);
        if (funko) {
            const color = this.funkoColor(funko);
            const info = chalk.hex(color)(`ID: ${funko.getID()}\n Nombre: ${funko.getName()}\n Descripcion: ${funko.getDesc()}\n Tipo: ${funko.getTipo()}\n Genero: ${funko.getGen()}\n Franquicia: ${funko.getFran()}\n Numero: ${funko.getNum()}\n Exclusivo: ${funko.getExc()}\n Especial: ${funko.getEsp()}\n Precio ${funko.getVal()}€`)
            return info;
            
        } else {
            return (chalk.red(`No se encontró ningún Funko con ID ${id} en la lista.`));
        }
    }
    public getMap(){return this.funkomap}
}