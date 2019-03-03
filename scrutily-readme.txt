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


SCRUTILY STORY
--------------

// inspiration
All of us, at least many of want to be time efficient. But we all know what happens: we bow to the notification popping up on the screen. How can we resist?
In our social-media-scepticism we don't argue for complete withdrawal from the world. However, we also think that oversharing is often harmful to the people doing it. This is well illustrated with the example of a mall: you enter for one thing and buy 20 others. But we don't need that stuff, we don't want to spend that much time! This train of thought led us to the conceptualization of Scrutily: giving people the possibility to easily judge the quality of the content which they consume at a daily basis.

// how we built it
We started with an open brainstorming session about machine learning, educational tools, and a critical stance towards social networks. From the start we were passionate about user-friendly graphical representation of data. In close teamwork in our interdisciplinary team, we collaborated heavily to facilitate a strong integration between backend- and frontend-mechanisms of Scrutily.

// challenges
-> Finding relevant training data that could be used as a basis to correctly classify the tweets
-> Transformation of data into an informative and visually appealing illustration

// accomplishments
We are especially proud of our innovative app concept which bridges awareness-raising, art, and education with a fun and easy-to-use rating feature.

// what we learned
Our key take-aways:
-> Designing things is demanding, and can be very fulfilling.
-> Conceptualizing and applying natural-language-processing in a socially conscious application was an intriguing task.
-> Communication and collaboration of ideas and brains is important and when done well (like we did ;)) a lot of fun!

// next steps
-> Add more measures of quality to train the system
-> Extend the functionalities to other social media platforms
