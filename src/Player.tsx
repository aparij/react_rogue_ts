class Player {
    x:number;
    y:number;
    size: number;

    constructor(x:number, y:number, size:number){
        this.x = x;
        this.y = y;
        this.size = size;
    }

    move(dx:number, dy:number){
        this.x += dx;
        this.y += dy;
    }
    draw(context?: CanvasRenderingContext2D | null){
        if(context){
            context.fillStyle = '#f00';
            context.textBaseline = 'hanging';
            context.font = '16px Helvetica';
            context.fillText('@', this.x*this.size, this.y*this.size);
        }
    }
}

export default Player;