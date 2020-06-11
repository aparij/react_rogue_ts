import {Attributes} from './attributes';
import World from './World';
import Player from './Player';
import Data from './data';

class Entity {
    x: number;
    y: number;
    size: number;
    attributes: Attributes;
    
    constructor(x:number, y:number, size:number, attributes:Attributes){
        this.x = x;
        this.y = y;
        this.size = size;
        this.attributes = {...attributes};
    }

    draw(context?: CanvasRenderingContext2D | null){
        if(context){
            context.fillStyle = this.attributes.color || 'white';
            context.textBaseline = 'hanging';
            context.font = '16px Helvetica';
            context.fillText(
                this.attributes.ascii,
                this.x*this.size + (this.attributes.offset ? this.attributes.offset.x: 0),
                this.y*this.size + (this.attributes.offset ? this.attributes.offset.y: 0),
            );
        }

    }

    action(verb:string, world:World){
        console.log(`Verb: ${verb}`);
    }
    // copyPlayer(): Player {
    //     const attributes: Attributes = {
    //         ascii: '',
    //         name: '',
    //     }
    //     return new Player(0,0,16, attributes )
    // };

    move(data:Data){
        this.x += data.x;
        this.y += data.y;
    }

    // add(item:Entity){
    //     console.log("Added item in void");
    // }
    
}

export default Entity;