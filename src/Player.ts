import Data from './data';
import Entity from './Entity';
import {ActorAttributes} from './attributes';

class Player extends Entity{
    inventory: Entity[]; 
    attributes: ActorAttributes;

    constructor(x:number, y:number, size:number, attributes:ActorAttributes){
        super(x,y,size,attributes);
        this.inventory = [];
        this.attributes = attributes;
    }

    add(item: Entity){
        this.inventory.push(item);

    }
    move(data:Data){
        if(this.attributes.health <= 0){
            return;
        }
        this.x += data.x;
        this.y += data.y;
    }
    copyPlayer():Player {
        let newPlayer = new Player(0,0,16,this.attributes);
        console.log(this.attributes);
        Object.assign(newPlayer, this);
        return newPlayer;
    }
    
}

export default Player;