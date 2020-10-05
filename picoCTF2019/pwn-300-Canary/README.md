- - - -
### Problem:
This time we added a canary to detect buffer overflows. Can you still find a way to retreive the flag from this program located in /problems/canary_3_257a2a2061c96a7fb8326dbbc04d0328. Source.

- - - -
### Goal:


- - - -
### Solution:

nm vuln
000007ed T display_flag

KEY_LEN = 4
BUF_SIZE = 32

Format string attack not possible
sscanf(const char* str, const char* format, ...)

Length of entry -> 32 + 4(canary) + 4(ebp) + 4(ret) = 44


## TODO:
- I think I'm close to the code. Figure out why my code requires a longer buffer?