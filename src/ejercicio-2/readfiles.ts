import fs from 'fs'

export class ReadFile{
    numOf: number = 0;
    constructor(filename:string, option:string){
        if (!fs.existsSync(filename)) {
            console.error(`Error: File '${filename}' does not exist`);
            return;
        }
        try{
            const data = fs.readFileSync(filename,'utf-8')

            if(option == 'lines'){
                this.countLines(data);
            }
            else if(option == 'words'){
                this.countWords(data);
            }
            else if(option == 'chars'){
                this.countChars(data);
            }
        }catch(error){
            console.error(`Error al leer el fichero ${filename}: ${error}`)
        }
    }
    countLines(data:string){
        this.numOf = data.split('\n').length;
    }
    countWords(data:string){
        this.numOf = data.split(/\s+/).length;
    }
    countChars(data:string){
        this.numOf = data.length;
    }

}