# Problem
For the next level, you need to get access to the web page running on an EC2 at 4d0cf09b9b2d761a7d87be99d17507bce8b86f3b.flaws.cloud
It'll be useful to know that a snapshot was made of that EC2 shortly after nginx was setup on it.

# Solution

```
$ curl 4d0cf09b9b2d761a7d87be99d17507bce8b86f3b.flaws.cloud
<html>
<head><title>401 Authorization Required</title></head>
<body bgcolor="white">
<center><h1>401 Authorization Required</h1></center>
<hr><center>nginx/1.10.3 (Ubuntu)</center>
</body>
</html>
```

```
$ nslookup 4d0cf09b9b2d761a7d87be99d17507bce8b86f3b.flaws.cloud
Server:		192.168.1.1
Address:	192.168.1.1#53

Non-authoritative answer:
4d0cf09b9b2d761a7d87be99d17507bce8b86f3b.flaws.cloud	canonical name = ec2-35-165-182-7.us-west-2.compute.amazonaws.com.
Name:	ec2-35-165-182-7.us-west-2.compute.amazonaws.com
Address: 35.165.182.7
```

```
$ aws ec2 describe-hosts
$ aws ec2 describe-instances
$ aws ec2 describe-snapshots
$ aws ec2 describe-snapshots --owner-ids self
```


TODO:
- password protected
- Nothing found running so far through AWS CLI. Tried the hint too. Didn't work.


# References