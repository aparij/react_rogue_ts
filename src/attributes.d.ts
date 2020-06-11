interface Attributes {
    color: string;
    ascii: string;
    offset?: Offset;
    name: string;
    
}
interface ActorAttributes extends Attributes{
    health: number;
}

interface Offset {
    x: number;
    y: number;
}
export {Attributes, ActorAttributes}