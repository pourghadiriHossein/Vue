function raiseError(message: string): never {
    throw new Error(message);
}


function reject() { 
    return raiseError('Rejected');
 }

//  console.log(reject());
 


 let loop = function forever() {
    while (true) {
        console.log('Hello');
    }
}

// console.log(loop());



function fn1(a: string | number): boolean {
    if (typeof a === "string") {
      return true;
    } else if (typeof a === "number") {
      return false;
    }   
  }

//   console.log(fn1(5));
//   console.log(fn1('5'));
  

  function fn2(a: string | number): boolean {
    if (typeof a === "string") {
      return true;
    } else if (typeof a === "number") {
      return false;
    }  
    // make the function valid
    return neverOccur();
  }
  
  let neverOccur = () => {
     throw new Error('Never!');
  } 


// console.log(fn2(5));
// console.log(fn2('5'));
// console.log(fn2([1,2]));