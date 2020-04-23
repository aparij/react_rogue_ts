
import {Map} from 'rot-js';

class World {
    width: number;
    height: number;
    tilesize: number;
    worldmap: number[][];

    constructor(width:number, height:number, tilesize:number){
        this.width = width;
        this.height = height;
        this.tilesize = tilesize;
        this.worldmap = new Array(this.width);
        for (let x=0; x < width; x++){
            this.worldmap[x] = new Array(this.height);
        }
        this.createCellularMap();
    }

    createCellularMap(){
        let map = new Map.Cellular(this.width, this.height/*, { 'connected': true }*/);
        map.randomize(0.5);
        let userCallback = (x: number , y: number , value:number ) => {
            if(x === 0 || y === 0 || x === this.width - 1 || y === this.height - 1 ){
                this.worldmap[x][y] = 1;
                return;
            }
            this.worldmap[x][y] = (value === 0)? 1 : 0;
        };
        map.create(userCallback);
        map.connect(userCallback,1);

    }

    draw(context?: CanvasRenderingContext2D | null){
        if(context){
            for (let x=0; x < this.width; x++){
                for(let y=0; y<this.height; y++){
                    if(this.worldmap[x][y] === 1) this.drawWall(x, y, context);

                }
            }
        }
    }

    drawWall( x:number ,y:number, context?: CanvasRenderingContext2D | null ){
        if(context){
            context.fillStyle = '#000';
            context.fillRect(
                x * this.tilesize,
                y * this.tilesize,
                this.tilesize,
                this.tilesize
            );
    
        }
    }


}

export default World;