Intro
=====

Turing machines are awesome, and modern computers are basically Turing machines with dynamic state transitions.

A programming language is said to be Turing complete if it has:

* conditional branching
* ability to change arbitrary memory locations
  * requires HALT state

These are fine, but not very interesting. The more interesting way is to simulate a *universal Turing machine*.

The attempt of this project is to simulate a universal Turing machine with interesting languages, therefore proving them as Turing complete.

Turing Machine
--------------

There are differing definitions of what a Turing machine is, but we'll try to use one that is as restrictive as possible while still recognizing all languages that other Turing machines recognize.

A Turing machine is a state machine with these properties:

* infinite, 1-dimensional memory (tape)
  * divided into cells
  * has beginning, but no end
  * usually described as horizontal, with leftmost being the beginning
* read/write head that can move left and right, cell-by-cell
* each transition function moves the head left or right
  * reading is optional
  * writing is optional
  * moving is mandatory (cannot move to same cell)

Here is the formal definition of a Turing machine:

> A Turing machine is a 7-tuple, (Q, Σ, Γ, δ, q0, qaccept, qreject), where Q, Σ, Γ are all finite sets and:
> 
> 1. Q- set of states
> 2. Σ- input alphabet, not containing blank symbol ␢
> 3. Γ- tape alphabet, where ␢ ∈ Γ and Σ ⊆ Γ
> 4. δ- `Q × Γ → Q × Γ × {L,R}` is the transition function
> 5. q0 ∈ Q- start state
> 6. qaccept ∈ Q- accept state
> 7. qreject ∈ Q- reject state, where qreject ≠ qaccept
> &mdash; <cite>[Michael Sipser][1]</cite>

[1]:http://www.amazon.com/gp/product/0534950973/ref=pd_lpo_k2_dp_sr_1?pf_rd_p=486539851&pf_rd_s=lpo-top-stripe-1&pf_rd_t=201&pf_rd_i=053494728X&pf_rd_m=ATVPDKIKX0DER&pf_rd_r=05RTFVTV691Z1NWADPV4

An alternative syntax explaining the same thing can be found [here](http://planetmath.org/encyclopedia/FormalDefinitionOfATuringMachine.html).

Universal Turing Machine
========================

Input
-----

In order to be complete and accept all possible input, each implementation takes two files as input:

* state transitions- line delimited text file, wich each state transition represented as a 5-tuple (q,a,b,d,r)
  * q- current state
  * a- symbol at the current head location
  * b- symbol to write to the current head location
  * d- direction to move (L or R, meaning respectively left or right)
  * r- next state to transition to (accept and reject are special states, meaning reject what they imply)
* input- comma-delimited sequence of input
  * allows implementations to accept strings of arbitrary length as input to a single state

Here is an example state transition going from state 'start' to state 'first' on input 'a', writes the character 'c', and moves the head right:

`start,a,c,R,next`

For simplicity, all implementations assume that Σ and Γ contain only single-characters.

Note:

* Σ is calculated from the state transitions file
  * to be complete, the Σ calculated from the input file must be a subset of this Σ calculated from transition file
* Γ is calculated from taking the union of Σ, ␢ (empty write will write a null), and the symbols written from the state transition file

This means that in order for a state transition to not modify the tape, it must write the same symbol it read. Because this can be tedious, the '\*' symbol is reserved and cannot be part of Σ or Γ:

* when used as the symbol read, it means read any symbol
* when used as the symbol to write, it mean write the same symbol read (don't modify the tape)

Output
------

An implementation does not necessarily output anything, but must use correct error codes to signify success (accept) or failure (reject).

Following Unix-style exit codes, 0 means success and non-zero means failure.
