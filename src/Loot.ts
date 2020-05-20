import Entity from "./Entity";
import World from "./World";

class Loot extends Entity{
    action(verb:string, world:World) {
        if(verb === 'bump'){
            console.log("Bump", this);
            world.player.add(this);
            world.remove(this);
        }

        if(verb === 'drop'){
            console.log("Drop", this);
        }

    }
}

export default Loot;