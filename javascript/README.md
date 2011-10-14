Intro
=====

Turing machines are cool and JavaScript is cool. This project tries to prove the statement:

> Anything that can be written in JavaScript eventually will be written in JavaScript

The proof relies on these premises:

* Turing machines can solve any problem that can be solved with a modern computer (given enough time and memory)
* A Universal Turing Machine can recognize and run any Turing machine (given enough time ond memory)

By implementing a Universal Turing Machine in JavaScript, the above quote is proven. =)

Design
------

The only design goal was to get something working, and that's about the extent of it. In order to achieve this goal in a reasonable amount of time, the problem was broken up into chewable components:

* TuringMachine- main component; has a tape, states, and accepts input
* State- generic state; has transitions and a transition function
* Tape- simple tape with access only to the current head and a move function (one cell at a time)
* Transition- just a data-store immitating the formal definition (read symbol, write symbol, action, next state)

Since Turing machines are supposed to be simple and time/memory aren't important, neither of the latter were taken into consideration.

Here's a breakdown of each component:

**Turing Machine**

`function TuringMachine(transitions)`

The constructor takes a single argument, transitions, which is a string representing all of the transitions.  The string is newline delimited with each line representing a unique transition. The first transition is considered to be the start state with the other transitions listed in no particular order.

A transition has 5 parts (comma delimited):

* state- state transitioning from
* read- symbol expected from the head
* write- symbol to write to the head
* direction- the direction to travel on the tape
  * 'L'- left, or towards the beginning of the tape
  * 'R'- right, or away from the beginning of the tape
* next state- the state transitioning to

The constructed object will have a single function, `run`, which takes a single argument (the input) and runs the Turing Machine on that input. The input is just a comma-delimited list of symbols. Whitespace at the beginning and end are removed.

For convenience, the TuringMachine object (the constructor, not objects constructed with it) has a convenience function `run` attached to it, which takes the same transitions parameter as the constructor and the input.  This can be called by doing:

`require('turing-machine').run(transitions, input)`

**State**

State exports a constructor that doesn't take any parameters and has two properties:

* transitions- an array of transitions
* transition- the transition function; takes a Tape object
  * This handles everything (find correct transition, advance head, etc)
  * returns the next state (or reject of no transition function found)

**Tape**

`function Tape(input)`

Takes a single parameter, input, which is comma-delimited. The created object has these properties:

* head- assign to it to write to the current position or read to get the current head contents
* move- function that accepts a single direction parameter (must be 'L' or 'R'
  * 'L'- move head left (towards beginning of tape); if this would cause the head to go off the end, the head stays put
  * 'R'- move head right (away from beginning of tape)

**Transition**

`function Transition(input, output, direction, nextState)`

This is just a data-store. The created object will have the same properties as passed in.

That's all there is to it!
