import Data from './data';
import Entity from './Entity';
import Attributes from './attributes';

class Player extends Entity{
    inventory: Entity[]; 
    attributes: Attributes = {
        name: 'Player',
        ascii: '@',
        health: 10,
        color: 'red',
    }

    constructor(x:number, y:number, size:number, attributes:Attributes){
        super(x,y,size,attributes);
        this.inventory = [];
      
    }
    add(item: Entity){
        this.inventory.push(item);

    }
    move(data:Data){
        this.x += data.x;
        this.y += data.y;
    }
    copyPlayer():Player {
        let newPlayer = new Player(0,0,16,this.attributes);
        Object.assign(newPlayer, this);
        return newPlayer;
    }
    
}

export default Player;