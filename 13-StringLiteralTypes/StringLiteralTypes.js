var click;
click = 'click'; // valid
click = 'dblclick'; // compiler error
// Type '"dblclick"' is not assignable to type '"click"'.
var mouseEvent1;
mouseEvent1 = 'click'; // valid
mouseEvent1 = 'dblclick'; // valid
mouseEvent1 = 'mouseup'; // valid
mouseEvent1 = 'mousedown'; // valid
mouseEvent1 = 'mouseover'; // compiler error
var mouseEvent2;
mouseEvent2 = 'click'; // valid
mouseEvent2 = 'dblclick'; // valid
mouseEvent2 = 'mouseup'; // valid
mouseEvent2 = 'mousedown'; // valid
mouseEvent2 = 'mouseover'; // compiler error
var anotherEvent;
