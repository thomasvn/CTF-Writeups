- - - -
### Problem:
Can you take advantage of misused malloc calls to leak the secret through this service and get the flag? Connect with nc jupiter.challenges.picoctf.org 42962. Source.

- - - -
### Goal:


- - - -
### Solution:
nc jupiter.challenges.picoctf.org 42962

struct user {
    char *username;  // address of char* username
    char access_code[ACCESS_CODE_LEN];  // 16
    char *files;
}

if (ac1 != 0x4343415f544f4f52 || ac2 != 0x45444f435f535345)
0x4343415f544f4f52 -> CCA_TOOR
0x45444f435f535345 -> EDOC_SSE

17
"ROOT_ACCESS_CODE"


WHAT DO I CONTROL?
- addresses for `anon_user` and `u`
- what can I write to (username)

HOW DO I EXPLOIT IT?
- I can write to that username (login), then free it (logout)
- print_flag() only cares about u->access_code
- how do I overwrite access_code? username is an address that points to other space in memory

## TODO:
- 1D112B0h + 8 is the location where they are reading the access code. Unfortunately, the username I am writing to is AFTER the entire struct where the access code is in
- when performing the `logout` command, my username seems to disappear.