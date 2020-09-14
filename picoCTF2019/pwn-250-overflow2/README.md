- - - -
### Problem:
Now try overwriting arguments. Can you get the flag from this program? You can find it in /problems/overflow-2_6_97cea5256ff7afcd9c8ede43d264f46e on the shell server. Source.

- - - -
### Goal:


- - - -
### Solution:

nm vuln
080485e6 T flag

Pass the following arguments when jumping to flag function

arg1
0xDEADBEEF

arg2
0xC0DED00D


- - - -
### TODO:
- Figure out how to properly pass the arguments
- Is there a way to reset the stack pointer? Is mine off?
- I fail at the fgets() function
