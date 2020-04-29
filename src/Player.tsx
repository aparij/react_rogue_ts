import Data from './data';

class Player {
    x:number;
    y:number;
    size: number;

    constructor(x:number, y:number, size:number){
        this.x = x;
        this.y = y;
        this.size = size;
    }

    move(data:Data){
        this.x += data.x;
        this.y += data.y;
    }
    copyPlayer(){
        let newPlayer = new Player(0,0,16);
        Object.assign(newPlayer, this);
        return newPlayer;
    }
    draw(context?: CanvasRenderingContext2D | null){
        if(context){
            context.fillStyle = '#f00';
            context.textBaseline = 'hanging';
            context.font = '16px Helvetica';
            context.fillText('@', this.x*this.size, this.y*this.size);
        }
    }
}

export default Player;