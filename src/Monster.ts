import Entity from "./Entity";
import World from "./World";
import {ActorAttributes} from './attributes';

class Monster extends Entity{
    attributes: ActorAttributes;

    constructor(x:number, y:number, size:number, attributes:ActorAttributes){
        super(x,y,size,attributes);
        this.attributes = attributes;
    }

    action(verb:string, world:World){
        if(verb === 'bump'){
            world.addHistory(`Player attacks ${this.attributes.name}!`);
            this.attributes.health = this.attributes.health - 1;
            if(this.attributes.health <= 0){
                world.addHistory(`${this.attributes.name} dies!`);
                world.remove(this);
            } else{
                world.addHistory(`${this.attributes.name}'s health is ${this.attributes.health}`);
                world.player.attributes.health = world.player.attributes.health - 1;
                if(world.player.attributes.health <= 0){
                    world.addHistory(`You have been killed by ${this.attributes.name}`);
                }else{
                    world.addHistory(`Your health is ${world.player.attributes.health}`);
                }
            }
        }
    }
}

export default Monster;