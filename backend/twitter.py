import tweepy
from tweepy import OAuthHandler
import re
import json
import summarizer
import truthfullness
import nltk
import datetime

def authenticate(consumer_key,consumer_secret,access_token,access_secret):
    auth = OAuthHandler(consumer_key, consumer_secret)
    auth.set_access_token(access_token, access_secret)
    return auth

def getTimeline(screen_name):
    today = datetime.datetime.now()
    DD = datetime.timedelta(days=7)
    earlier = today - DD
    #print(earlier.strftime("%Y-%m-%d"))
    nltk.download('punkt')
    nltk.download('averaged_perceptron_tagger')
    nltk.download('stopwords')
    API_KEY='TNMofXHuNoktIyyO7QQzTKJgu'
    API_SECRET='NyS7y6U7cgILoqSufYLQnAjulZyO9vT8w2Thv7mP8CeFZNYNez'
    ACCESS_TOKEN='2281727036-Ibfs8wgTovMU6BRfTveDhjO5Z6d4rUZtXYbfEMd'
    ACCESS_TOKEN_SECRET='9WNVU4zbLwkcLfhBWbi5MLIoxDulCvIj1J0pLILWkHHR4'

    auth=authenticate(API_KEY,API_SECRET,ACCESS_TOKEN,ACCESS_TOKEN_SECRET)
    api = tweepy.API(auth, wait_on_rate_limit=True)
    all_tweets = []
    count =0;
    truth_value_sum =0
    try:
        new_tweets = api.user_timeline(screen_name=screen_name,count = 1000,result_type='recent',tweet_mode='extended',since=earlier.strftime("%Y-%m-%d"))

        for tweet in new_tweets:
            created_at = str(tweet.created_at).split(' ')
            date = created_at[0].split('-')
            time = created_at[1].split(':')
            text =  re.sub(r'http\S+', '', tweet.full_text)
            #print(text)
            # print(date[0] , date[1] , date[2])
            # print(time[0],time[1],time[2])
            #print(re.sub(r'http\S+', '', tweet.full_text),tweet.created_at,tweet.user.screen_name,)
            create_at = {}
            create_at['yyyy'] = int(date[0])
            create_at['mm'] = int(date[1])
            create_at['dd'] = int(date[2])
            create_at['hh'] = int(time[0])
            create_at['min'] = int(time[1])
            create_at['ss'] = int(time[2])
            t_value = truthfullness.get_value(text)
            truth_value_sum+=t_value
            count+=1
            ret_tweet = {}

            about = summarizer.summary(text)
            if(len(about)<=0):
                about.append('Nothing')

            ret_tweet['text'] = text
            ret_tweet['user_name'] = tweet.user.screen_name
            ret_tweet['truth_score'] = t_value
            ret_tweet['about'] = about
            ret_tweet['create_at'] = create_at
            all_tweets.append(ret_tweet)
    except Exception:
        ret_tweet = {}
        ret_tweet['error'] ='Error, please enter valied screen name'
        all_tweets.append(ret_tweet)

    #print(len(all_tweets))
    ret_tweets={}
    ret_tweets['avg_t_value'] = float(truth_value_sum)/count
    ret_tweets['tweet_list'] = all_tweets

    json_data = json.dumps(ret_tweets, ensure_ascii=False)
    #print(json_data)
    return json_data



if __name__== "__main__":
    screen_name = '@elonmusk'
    json_data = getTimeline(screen_name)
