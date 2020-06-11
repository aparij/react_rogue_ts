
import {Map} from 'rot-js';
import Player from './Player';
import Data from './data';
import Entity from './Entity';
class World {
    width: number;
    height: number;
    tilesize: number;
    worldmap: number[][];
    entities: Entity[];
    player: Player;
    history: string[];

    constructor(width:number, height:number, tilesize:number){
        this.width = width;
        this.height = height;
        this.tilesize = tilesize;
        this.worldmap = new Array(this.width);
        this.entities = [];
        this.player = new Player(0,0,16,
             {
                name: 'Player',
                ascii: '@',
                health: 10,
                color: 'red',
            }
        )
        for (let x=0; x < width; x++){
            this.worldmap[x] = new Array(this.height);
        }
        this.history = ['You are starting your adventure']
    }

    // get player(): Entity{
    //     return this.entities[0];
    // }

    movePlayer(data:Data){
        let tempPlayer = this.player.copyPlayer();
        tempPlayer.move(data);
        let entity = this.getEntityAtLocation(tempPlayer.x, tempPlayer.y);
        if(entity){
            console.log(entity);
            entity.action('bump',this);
        }
        if(this.isWall(tempPlayer.x, tempPlayer.y)){
            console.log("Player is blocked by wall")
        } else {
            this.player.move(data);
        }
    }
    moveToSpace(entity:Entity){
        for(let x=entity.x;x<this.width;x++){
            for(let y=entity.y;y<this.height;y++){
                if(this.worldmap[x][y]===0 && !this.getEntityAtLocation(x,y) ){
                    entity.x = x;
                    entity.y = y;
                    return;
                }
            }
        }
    }

    isWall(x:number , y:number): boolean{
        return (
            this.worldmap[x] === undefined ||
            this.worldmap[y] === undefined || 
            this.worldmap[x][y] === 1
        );
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
            this.entities.forEach(entity => entity.draw(context));
            this.player.draw(context);
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

    add(entity:Entity){
        this.entities.push(entity);

    }

    remove(entity: Entity){
        this.entities = this.entities.filter(e=> e !== entity)
    }

    getEntityAtLocation(x: number,y:number){
        return this.entities.find(entity => entity.x === x && entity.y === y);
    }

    addHistory(history_log:string){
        this.history.push(history_log);
        if(this.history.length >6 ) {
            this.history.shift();
        }

    }
}

export default World;