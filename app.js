/**
// Created by Tim Kramer!
**/

const not = a => ~a & 1;  // Defining the not operation in a function
const and = (a, b) => a && b; //Defining the end operation function
const nand = (a, b) => not(a && b); //defining the nand operation function
const or = (a, b) => a || b; //defining the or operation function
const nor = (a, b) => not(a||b); // defining the nor operation function
const xor = (a, b) => a ^ b; // defining the xor operation function
const xnor = (a, b) => not(a^b); // defining the xnor operation function

// Setting the components here!
const components = [
  {
    id: 'clock',
    type: 'controlled',
    inputs: [],
    state: 0,
  },
  {
    id: 'A',
    type: 'controlled',
    inputs: [],
    state: 0,
  },
  {
    id: 'and',
    type: 'and',
    inputs: ['clock', 'A'],
    state: 0,
  },
  {
    id: 'nand',
    type: 'nand',
    inputs: ['clock', 'A'],
    state: 0,
  },
  {
    id: 'or',
    type: 'or',
    inputs: ['clock', 'A'],
    state: 0,
  },
  {
    id: 'xor',
    type: 'xor',
    inputs: ['clock', 'A'],
    state: 0,
  },
  {
    id: 'nor',
    type: 'nor',
    inputs: ['clock', 'A'],
    state: 0,
  },
  {
    id: 'xnor',
    type: 'xnor',
    inputs: ['clock', 'A'],
    state: 0,
  },
  {
    id: 'not',
    type: 'not',
    inputs: ['clock'];
    state: 0,
  }
];

/**
  since we won't always want to go through every component on the list above, here is a little something
  to just get what we want!
**/
const componentLookup = indexBy(components, 'id');

// function to evaluate what are the component and it's out put
const evaluate = (components, componentLookup) => {
  const binaryOp = (logicFn, component) =>{
    //this will get if any of the inputs is a floating value and therefore, with that, what is the operation we're trying to do.
    const aOut = componentLookup[component.inputs[0]];
    const bOut = componentLookup[component.inputs[1]];

    component.state = (aOut === 'x' || bOut === 'x')
      ? 'x'
      : logicFn(aOut.state, bOut.state);
    return;
  }
  components.forEach(component => {
    switch(component.type){
      case 'controlled':
        return;
        break;
      case 'and':
        return binaryOp(and, component);
        break;
      case 'nand':
        return binaryOp(nand, component);
        break;
      case 'or':
        return binaryOp(or, component);
        break;
      case 'xor':
        return binaryOp(xor, component);
        break;
      case 'nor':
        return binaryOp(nor, component);
        break;
      case 'xnor':
        return binaryOp(xnor, component);
        break;
      case 'not': // since not isn't exactly a binary operation, we'll have something a bit different.
        const aOut = componentLookup[component.inputs[0]];
        components.state = (aOut === 'x') ? 'x' : not(aOut.state);
        return;
        break;
    }
  });
}

const EVALS_PER_STEP = 5;

const runFor = 25;
for (let iteration = 0; iteration < runFor; iteration ++){
  componentLookup.clock.state = not(componentLookup.clock.state);

  if (interation % 5 === 0){
    componentLookup.A.state = not(componentLookup.A.state);
  }

  for(let i = 0; i < EVALS_PER_STEP; i++){
    evaluate(components, componentLookup);
  }
}
