import { Funko } from "./funko.js";

export type RequestType = {
    type: 'add' | 'update' | 'remove' | 'read' | 'list';
    id? : number;
    username: string
    funkoPop?: Funko;
}
  
export type ResponseType = {
    type: 'add' | 'update' | 'remove' | 'read' | 'list' |'unknown';
    success: boolean;
    successmsg? : string;
}