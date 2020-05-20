interface Attributes {
    color?: string;
    ascii: string;
    offset?: Offset;
    name: string;
    health?: number;
}

interface Offset {
    x: number;
    y: number;
}
export default Attributes;