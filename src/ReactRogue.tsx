import React,{useRef, useEffect, useState, Fragment} from 'react';
import InputManager from './InputManager';
import Data from './data';
import World from './World';
import Spawner from './Spawner';

interface ReactRogue {
    width:number,
    height:number,
    tilesize:number
}

const ReactRogue: React.SFC<ReactRogue>  = ({width, height, tilesize}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    //const [player, setPlayer] = useState(new Player(1, 2, tilesize));
    const [world, setWorld] = useState(new World(width, height, tilesize));
    let inputManager = new InputManager();
    const handleInput = (action:string, data:Data)=>{
        console.log(action,JSON.stringify(data));
        let newWorld = new World(width, height, tilesize);
        Object.assign(newWorld, world);
        newWorld.movePlayer(data);
        setWorld(newWorld);
    }
    useEffect(() => {
        console.log('binding keys');
        inputManager.bindKeys();
        inputManager.subscribe(handleInput);
        return () => {
            inputManager.unbindKeys();
            inputManager.unsubscribe(handleInput);
        }
    })
    useEffect(() => {
        console.log('Draw to canvas');
        const ctx = canvasRef.current?.getContext('2d');
        ctx?.clearRect(0, 0, width * tilesize, width * tilesize);
        world.draw(ctx);
    });
    useEffect(()=>{
        console.log("Create Map");
        let newWorld = new World(width, height, tilesize);
        Object.assign(newWorld, world);
        newWorld.createCellularMap();
        newWorld.moveToSpace(newWorld.player);
        let spawner = new Spawner(newWorld);
        spawner.spawnLoot(10);
        spawner.spawnMonsters(6);

        setWorld(newWorld);
    },[]);

    return (
        <Fragment>
            <canvas 
                ref={canvasRef}
                width={width * tilesize} 
                height={height * tilesize} 
                style={{border: '1px solid black', background: 'darkgrey'}}>

            </canvas>
            <ul>
                {world.player.inventory.map((item, index) => <li key={index}>{item.attributes.name}</li>)}
            </ul>
            <ul>
                {world.history.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
        </Fragment>
    )
}

export default ReactRogue;