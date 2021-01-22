# Problem
"This level is *buckets* of fun. See if you can find the first sub-domain."

# Solution
Based on the problem statement, Scott makes it pretty clear that this static website is hosted on an S3 bucket.

Let's confirm that by doing a DNS query on `flaws.cloud` and then its resulting response `52.218.228.242`:
```
$ nslookup flaws.cloud
Server:		192.168.1.1
Address:	192.168.1.1#53

Non-authoritative answer:
Name:	flaws.cloud
Address: 52.218.228.242

$ nslookup 52.218.228.242
Server:		192.168.1.1
Address:	192.168.1.1#53

Non-authoritative answer:
242.228.218.52.in-addr.arpa	name = s3-website-us-west-2.amazonaws.com.
```

As shown above, the IP address of `flaws.cloud` belongs to a host under the domain of `s3-website-us-west-2.amazonaws.com`. To help clarify this point, the original domain name of `flaws.cloud` is actually the subdomain `flaws.cloud-s3-website-us-west-2.amazonaws.com`

Now that we know it's hosted using an S3 bucket, let's see if we can peek inside the bucket to see what else might be there (this requires having AWS CLI installed):
```
$ aws s3 ls flaws.cloud
2017-03-13 20:00:38       2575 hint1.html
2017-03-02 20:05:17       1707 hint2.html
2017-03-02 20:05:11       1101 hint3.html
2020-05-22 11:16:45       3162 index.html
2018-07-10 09:47:16      15979 logo.png
2017-02-26 17:59:28         46 robots.txt
2017-02-26 17:59:30       1051 secret-dd02c7c.html
```

Boom! Visiting the secret file will take us to level2.

# Sources
- https://docs.aws.amazon.com/cli/latest/reference/s3/index.html
