# Problem
"The next level is fairly similar, with a slight twist. You're going to need your own AWS account for this. You just need the free tier."

# Solution
I actually wasn't sure what the slight twist was. Similarly in this problem, you can use AWS S3 CLI to list out the contents of the bucket and find the secret.
```
$ aws s3 ls level2-c8b217a33fcf1f839f6f1f73a00a9ae7.flaws.cloud 
2017-02-26 18:02:15      80751 everyone.png
2017-03-02 19:47:17       1433 hint1.html
2017-02-26 18:04:39       1035 hint2.html
2017-02-26 18:02:14       2786 index.html
2017-02-26 18:02:14         26 robots.txt
2017-02-26 18:02:15       1051 secret-e4443fc.html
```

### UPDATE:
After reading through the hints, it was clarified that you needed your own AWS account to be able to view the contents of the bucket. My AWS CLI was already configured with my AWS account.

I was able to confirm this by visiting the directory listing [here](http://level2-c8b217a33fcf1f839f6f1f73a00a9ae7.flaws.cloud.s3.amazonaws.com). Not publicly available.

# Sources
- https://docs.aws.amazon.com/cli/latest/reference/s3/index.html