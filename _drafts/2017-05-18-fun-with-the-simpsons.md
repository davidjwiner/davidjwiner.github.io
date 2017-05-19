---
layout: posts
title:  "Fun with The Simpsons"
date:   2017-05-17 10:44:57 -0700
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/SR8WWFzrZAg" frameborder="0" allowfullscreen></iframe>

Growing up, The Simpsons was my favorite show. Friends was a close second and the Dr. Phil reruns my sister insisted upon watching when we got home from school were a very distant third. Inexplicably, there is a delightful little book called [_The Simpsons: A Complete Guide to Our Favorite Family_](https://www.amazon.com/Simpsons-Complete-Guide-Favorite-Family/dp/0060952520), which provides more detail than anyone would want on seasons 1-8. (NB: Ask any Simpsons true believer and s/he will confirm that these episodes were by far the finest of the series.) I owned said book as an impressionable 10-year-old and read it from cover to cover, in spite of the fact that all of the information contained in it could be gleaned from owning every DVD and watching every episode multiple times---which I of course did, too.

Fast forward 15 years: I discovered this spring that a kind soul uploaded a [massive data dump](https://www.kaggle.com/wcukierski/the-simpsons-by-the-data) of 600 Simpsons episodes (episode names, characters, and _every damn line from all 600 scripts_) to Kaggle. Needless to say, I got pretty excited. <!--more--> 

If you're an avid reader of this blog, you might be aware that I have been on a bit of an NLP (natural language processing) streak recently. A couple of fun facts I found pretty quickly after playing around with the data in Jupyter:

* Across 600 episodes from 1989 to the present, there were __158K__ lines, for an average of __280__ lines per episode
* The character with the most lines by nearly a factor of two was Homer. Marge, Lisa, and Bart switch off on second place depending on the season:

<img class='inline-image' src='/assets/simpsons/total_lines_by_character.png'/>
<p class="caption">Homer domination</p>

* The average number of viewers declined pretty substantially as the seasons went on...:sad_face:

<img class='inline-image' src='/assets/simpsons/viewers_by_season.png'/>
<p class="caption">Not all viewers were quite so loyal</p>

* Trying to predict an episode's IMDB score based on each character's number of lines in that episode _does not work_

## Predicting whether lines were Lisa's or Bart's (code and replication data [here](https://github.com/davidjwiner/simpsons_analysis/blob/master/simpsons_analysis.ipynb))

One thing I wondered was whether you could predict who spoke a line based on the contents of the line. Certain signals would be dead giveaways, like Homer's "D'oh!" or Bart's "Ay caramba." Others would be more challenging, though, and would probably be difficult even for most Simpsons aficionados like myself.

I was able to build a pretty simple classifier that predicted whether a line was Bart or Lisa's based on the line's text content. The essence of this classifier was training a simple regression model based on the frequency of every single word, bigram (phrase of two words), and trigram (phrase of three words) contained in all 24K Bart/Lisa lines. Here's what came out:

<img class='inline-image' src='/assets/simpsons/line_prediction_model_accuracy.png'/>
<p class="caption">Model results: Comparison of guessing, guessing "Bart" for every line (since Bart has slightly more lines than Lisa), simple linear regression model, and regression model using only lines with 10+ words</p>

I was surprised I was able to get to such high accuracy. Unsurprisingly, limiting ourselves to longer lines makes the task substantially easier (e.g., there are lines that are just single words like "Oh" and "Springfield"---as you can imagine, it can be pretty difficult to guess the speaker based on one word alone). We're pushing the 70% mark, though, and I'm not sure that I, armed with my hundreds of hours of Simpsons consumption, could do significantly better.

## Word clouds

Finally, I discovered a nifty little Python library aptly called [Wordcloud](https://github.com/amueller/word_cloud). I found that if you run the Bart/Lisa classifier using only unigram (single word) features, you can use the words from our model that exhibit the most positive and negative regression coefficients to figure out which words skew most towards Bart vs. Lisa. In other words, our unigram model tells us which words are "Bart words" and which words are "Lisa words." Armed with that data and my Wordcloud library, I created this little visualization, which was not only pretty but also confirmed that the model was finding words that made sense:

<img class='big-inline-image' src='/assets/simpsons/bart_lisa_final_word_cloud.png'/>

I found it to be rather cute that some of Bart and Lisa's most predictive words were each others' names. It makes sense though: they are constantly saying each others' names in conversation, especially touching scenes [like this one](https://www.youtube.com/watch?v=WR82RTVIl9Y).
