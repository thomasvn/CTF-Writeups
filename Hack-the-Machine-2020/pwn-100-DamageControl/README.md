- - - -
## Problem
The ship is under attack! We've sustained serious damage and we can't seem to engage the AFFF sprinklers or the pumps from Damage Control Central. We're physically cut off from the damage. Can you take a look at the software and see if you can find a way to engage the damage control systems?

ctf-chals.hackthemachine.ai:1337


- - - -
## Solution

### CTF Website
nmap -Pn -p 1337 ctf-chals.hackthemachine.ai
nmap -Pn -T4 -p 1337 ctf-chals.hackthemachine.ai


### GOAL
Engage the AFFF sprinklers or the pumps

### ABOUT
- ELF
- x86-64
- dynamically linked
- Partial RELRO   Canary found      NX enabled    PIE enabled

### Leads
cmd_buf -> 128 bytes
var_8   -> 4 bytes
s       -> 4 bytes
r       -> 4 bytes


- - - -
## Sources
https://ctf.hackthemachine.ai/

