export class VisualItem{
    x: number = 0; // pozicija na gridu
    y: number = 0;
    isVisible: boolean = false;
    color: 'red' | 'blue' = 'red';
    orientation: string = 'rotated';
    isTarget: boolean = false;
}