from nltk.corpus import stopwords
from string import punctuation
import re
import nltk
import random

def sanitize_input(data):
    replace = {
        ord('\f') : ' ',
        ord('\t') : ' ',
        ord('\n') : ' ',
        ord('\r') : None
    }
    data = re.sub(r'\d+|@|,|\'|:|\.|’|\$|=|\(|\)|\/|\”|%|\“', '', data)
    return data.translate(replace)


def summary(content):
    content = re.sub(r'\b\w\b', ' ', content)
    stop_words = set(stopwords.words('english') + list(punctuation))
    content = sanitize_input(content)
    tokenized = nltk.word_tokenize(content)
    tokens = [word for word in tokenized if word not in stop_words]
    #print(tokenized)
    nouns = [word for (word, pos) in nltk.pos_tag(tokens) if pos in ['NN','NNP']]
    if len(nouns)>3:
        return(random.sample(nouns,3))
    elif len(nouns)>0:
        return(nouns )
    elif len(nouns)==0:
        if(len(tokens)>3):
            return(random.sample(tokens, 3))
        else:
            return(tokens)
    return nouns

