import React,{useRef, useEffect, useState} from 'react';
import InputManager from './InputManager';
import Data from './data';
import Player from './Player';

interface ReactRogue {
    width:number,
    height:number,
    tilesize:number
}

const ReactRogue: React.SFC<ReactRogue>  = ({width, height, tilesize}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [player, setPlayer] = useState(new Player(1, 2, tilesize));
    let inputManager = new InputManager();
    const handleInput = (action:string, data:Data)=>{
        console.log(action,JSON.stringify(data));
        let newPlayer = new Player(0, 0, tilesize);
        Object.assign(newPlayer, player);
        newPlayer.move(data.x, data.y);
        setPlayer(newPlayer);
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
        player.draw(ctx);
    });
    return (
        <canvas 
            ref={canvasRef}
            width={width * tilesize} 
            height={height * tilesize} 
            style={{border: '1px solid black'}}>

        </canvas>
    )
}

export default ReactRogue;