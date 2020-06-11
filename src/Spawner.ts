import World from "./World";

import Loot from './Loot';
import Entity from "./Entity";
import {ActorAttributes, Attributes} from "./attributes";
import Monster from "./Monster";

const lootTable: Attributes[] = [
    {name: 'Long Sword', color: 'darkgrey', ascii: '/', offset: {x: 6, y:3}},
    {name: 'Health Potion', color: 'pink', ascii: '!', offset: {x: 6, y:3}},
    {name: 'Gold coin', color: 'yellow', ascii: '$', offset: {x: 3, y:3}},
    {name: 'Armor', color: 'lightgrey', ascii: '#', offset: {x: 4, y:3}},
]

const monsterTable: ActorAttributes[] = [
    {name: 'Ogre', color: 'lightgrey', ascii: 'O', offset: {x: 4, y:3}, health: 3},
    {name: 'Kobold', color: 'green', ascii: 'k', offset: {x: 4, y:3}, health: 3},
    {name: 'Slime', color: 'darkgreen', ascii: 'S', offset: {x: 4, y:3}, health: 2},    
    {name: 'Dragon', color: 'red', ascii: 'D', offset: {x: 4, y:3}, health: 13},
    
]
class Spawner{
    world: World;
    constructor(world:World){
        this.world = world;
    }

    spawn(spawnCount:number, createEntity:Function){
        for(let count:number=0;count < spawnCount;count ++){
            let entity:Entity = createEntity();
            this.world.add(entity);
            this.world.moveToSpace(entity);
        }

    }

    spawnLoot(spawnCount:number){
        this.spawn(spawnCount, ()=>{
            return new Loot(
                this.getRandomInt(this.world.width - 1),
                this.getRandomInt(this.world.height - 1),
                this.world.tilesize,
                lootTable[this.getRandomInt(lootTable.length)]
            );
        })
    }
    spawnMonsters(spawnCount:number){
        this.spawn(spawnCount, ()=>{
            return new Monster(
                this.getRandomInt(this.world.width - 1),
                this.getRandomInt(this.world.height - 1),
                this.world.tilesize,
                monsterTable[this.getRandomInt(lootTable.length)]
            );
        })
    }
    getRandomInt(max:number){
        return Math.floor(Math.random() * Math.floor(max));
    }

    
}
export default Spawner;