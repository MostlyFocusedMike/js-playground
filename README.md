# js-playground
my coding scratch pad. it's gonna be a mess

### topic one: promise one at a time with updating callback 
I just wanted to see if it was possible not to call another promise until the previous one in the array is *done*, since each promise has a callback that updates the "progress" of a hypothetical file upload    
turns out it is and recursion (my old solution) was not needed. which I suspected because recursion is ridiculous.