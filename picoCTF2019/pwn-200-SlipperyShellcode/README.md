- - - -
### Problem:
This program is a little bit more tricky. Can you spawn a shell and use that to read the flag.txt? You can find the program in /problems/slippery-shellcode_5_5cea4ae04c57923484bda350da9f4015 on the shell server. Source.

- - - -
### Goal:


- - - -
### Solution:

BUFSIZE = 512
Shellcode is run on an offset of 256
Add 256 NOPS

- - - - 
### TODO:
- I think this is correct. I just need to fix the pipes
