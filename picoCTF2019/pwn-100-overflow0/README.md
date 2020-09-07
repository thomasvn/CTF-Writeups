- - - -
### Problem:
This should be easy. Overflow the correct buffer in this program and get a flag. Its also found in /problems/overflow-0_4_e130f4df1710865981d50f778a8059f7 on the shell server. Source.

- - - -
### Goal:
Buffer overlow. Get flag.

- - - -
### Solution:
This problem has two important functions to make note of - `sigsegv_handler()` and `vuln()`. Within `main()` we see that if an argument is provided to this binary, `vuln()` will be called.

The `vuln()` function is a classic example of a vulnerability to a buffer overflow. If we provide more than 128 characters to input, we will overrun the buffer and eventually overwrite the return pointer.
```c
void vuln(char *input){
  char buf[128];
  strcpy(buf, input);
}
```

Now, in the `sigsegv_handler()`, we notice that the flag is being printed. Since this function is used as the handler for segmentation violations, all we need to do is smash the stack willy nilly. We can put "AAAA" (an invalid address) into the return pointer to trigger the `sigsegv_handler()`.
```c
void sigsegv_handler(int sig) {
  fprintf(stderr, "%s\n", flag);
  fflush(stderr);
  exit(1);
}
```

This python one liner will do the trick. For a more detailed explanation of the exploit, see `exploit.py`
```python
python -c 'print "A"*136' | ./vuln
```
