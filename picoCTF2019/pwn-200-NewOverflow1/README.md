- - - -
### Problem:
Lets try moving to 64-bit, but don't worry we'll start easy. Overflow the buffer and change the return address to the flag function in this program. You can find it in /problems/newoverflow-1_4_3fc8f7e1553d8d36ded1be37c306f3a4 on the shell server. Source.

- - - -
### Goal:
Overflow the `vuln()` function and jump to the `flag()` function

- - - -
### Solution:
`nm vuln`
0000000000400767 T flag


- - - - 
### TODO:
- Works locally, but not remotely yet. Not even segfaulting remotely
