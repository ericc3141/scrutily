import tweepy
from tweepy import OAuthHandler
import re
import json


def authenticate(consumer_key,consumer_secret,access_token,access_secret):
    auth = OAuthHandler(consumer_key, consumer_secret)
    auth.set_access_token(access_token, access_secret)
    return auth

def getTimeline(screen_name):
    API_KEY='TNMofXHuNoktIyyO7QQzTKJgu'
    API_SECRET='NyS7y6U7cgILoqSufYLQnAjulZyO9vT8w2Thv7mP8CeFZNYNez'
    ACCESS_TOKEN='2281727036-Ibfs8wgTovMU6BRfTveDhjO5Z6d4rUZtXYbfEMd'
    ACCESS_TOKEN_SECRET='9WNVU4zbLwkcLfhBWbi5MLIoxDulCvIj1J0pLILWkHHR4'

    auth=authenticate(API_KEY,API_SECRET,ACCESS_TOKEN,ACCESS_TOKEN_SECRET)
    api = tweepy.API(auth, wait_on_rate_limit=True)
    new_tweets = api.user_timeline(screen_name=screen_name,count = 80,result_type='recent')
    for tweet in new_tweets:
        created_at = str(tweet.created_at).split(' ')
        date = created_at[0].split('-')
        time = created_at[1].split(':')
        # print(date[0] , date[1] , date[2])
        # print(time[0],time[1],time[2])
        # #print(re.sub(r'http\S+', '', tweet.text),tweet.created_at,tweet.user.screen_name,)
        create_at = {}
        create_at['yyyy'] = date[0]
        create_at['mm'] = date[1]
        create_at['dd'] = date[2]
        create_at['hh'] = time[0]
        create_at['mm'] = time[1]
        create_at['ss'] = time[2]

        ret_tweet = {}
        ret_tweet['text'] = re.sub(r'http\S+', '', tweet.text)
        ret_tweet['user_name'] = tweet.user.screen_name
        ret_tweet['truth_score'] = 0.5
        ret_tweet['about'] = re.sub(r'http\S+', '', tweet.text).split(' ')[0]
        ret_tweet['create_at'] = create_at

        json_data = json.dumps(ret_tweet,ensure_ascii=False)
        print(json_data)


if __name__== "__main__":
    screen_name = '@BillGates'
    getTimeline(screen_name)
