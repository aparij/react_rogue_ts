import World from "./World";

import Loot from './Loot';
import Entity from "./Entity";
import Attributes from "./attributes";

const lootTable: Attributes[] = [
    {name: 'Long Sword', color: 'darkgrey', ascii: '/', offset: {x: 6, y:3}},
    {name: 'Health Potion', color: 'pink', ascii: '!', offset: {x: 6, y:3}},
    {name: 'Gold coin', color: 'yellow', ascii: '$', offset: {x: 3, y:3}},
    {name: 'Armor', color: 'lightgrey', ascii: '#', offset: {x: 4, y:3}},
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
                this.getRandomInt(this.world.width),
                this.getRandomInt(this.world.height),
                this.world.tilesize,
                lootTable[this.getRandomInt(lootTable.length)]
            );
        })
    }

    getRandomInt(max:number){
        return Math.floor(Math.random() * Math.floor(max));
    }

    
}
export default Spawner;