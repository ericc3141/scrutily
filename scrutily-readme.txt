SCRUTILY
--------
Scrutily is a lightweight Twitter-Interface, which rates content quality and visualizes the results graphically. Scrutily was developed by Eric Chen, Fabian Dietrich, Vinuta Hegde, and Tejaswini Kulkarni in the scope of HackTech2019.

// features
Searching with an @ handle gives access to the last 100 tweets of the respective Twitter user, e.g. @ElonMusk. Searching with the # tag gives access to the last 100 tweets using the respective hashtag.
The displayed information is color-coded in terms of its quality. Green is equal to high-quality content, yellow means average and red symbolizes low-quality content. Additionally, the information is length-coded; the longer the tweet, the longer the bar.

// dependencies
Scrutily´s backend is developed in Python3 and requires the following packages:
- nltk
- numpy
- tweepy

// how to run
Run the file requestHandler.py with a local Python interpreter to host the app. Go to localhost:8888 in your browser (tested: Chrome, Firefox) and enter your favorite Twitter-celebs or friends' profiles to gauge their content-quality. Enjoy!
