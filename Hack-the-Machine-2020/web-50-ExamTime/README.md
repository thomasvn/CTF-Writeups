- - - -
## Problem
You have fallen behind on your mandatory trainings. Complete this exam before you hear from your supervisor.
Access the training at http://ctf-chals.hackthemachine.ai:33631/.


- - - -
## Solution
When pulling up the source code for the site, we see the following juicy information:
```html
<script src="js/exam.js"></script>
```

When opening up the source for `exam.js` I realize that this contains the functionality for the entire quiz. This includes the answers for the quiz and the processing of these answers.

When inspecting the array `const myQuestions`, we find the answers to each of the questions. Oddly, the answer to the last question is `y` even though it is not possible ot set this answer on the quiz.

At this point, it seems clear that the goal is to pass the quiz by somehow providing all the correct answers including the last `y` as an answer. For me, the easiest way to solve this was to override the `exam.js` file with my hardcoded answers then reload the page. To learn how to override files in Chrome Devtools, check my sources at the bottom.

To win, I hardcoded the following near the end of the `showResults()` function. The below code formats all of the correct answers into the format that the code is expecting to parse. It then sends this data to the back end.
```javascript
console.log(data)
data="0=d&1=c&2=a&3=b&4=y&"
resultsContainer.innerHTML = "You are %100 correct my good sir."
sendData(data);
```

For more details, check the `exam.js` file included in this repo.


- - - -
## Sources
https://ctf.hackthemachine.ai/
https://stackoverflow.com/questions/16494237/chrome-dev-tools-modify-javascript-and-reload
