let click: 'click';

click = 'click'; // valid

click = 'dblclick'; // compiler error

// Type '"dblclick"' is not assignable to type '"click"'.

let mouseEvent1: 'click' | 'dblclick' | 'mouseup' | 'mousedown';
mouseEvent1 = 'click'; // valid
mouseEvent1 = 'dblclick'; // valid
mouseEvent1 = 'mouseup'; // valid
mouseEvent1 = 'mousedown'; // valid
mouseEvent1 = 'mouseover'; // compiler error



type MouseEvent2 = 'click' | 'dblclick' | 'mouseup' | 'mousedown';
let mouseEvent2: MouseEvent2;
mouseEvent2 = 'click'; // valid
mouseEvent2 = 'dblclick'; // valid
mouseEvent2 = 'mouseup'; // valid
mouseEvent2 = 'mousedown'; // valid
mouseEvent2 = 'mouseover'; // compiler error

let anotherEvent: MouseEvent2;


