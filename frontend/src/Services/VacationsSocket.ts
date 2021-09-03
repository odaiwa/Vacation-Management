import { io, Socket } from "socket.io-client";
import globals from "./Globals";

class VacationsSocket {

    public socket: Socket;

    public connect(): void {
        if(this.socket === undefined || !this.socket.connected){
            this.socket = io(globals.socketUrl);
        } 
    }

    public disconnect(): void {
        if(!this.socket || this.socket.disconnect()) return;
        this.socket.disconnect();
    }

}

export default VacationsSocket;
