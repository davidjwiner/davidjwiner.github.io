---
layout: default
title:  "Data dredging"
date:   2016-12-02 00:00:00 -0700
---

Data dredging
=============

_A few weeks ago, a good friend of mine studying psychology at Berkeley asked me a question about statistical power. Having taken more than my fair share of statistics classes in undergrad and grad school, I thought that I should be able to answer his question. To my dismay, I realized that even after having it drilled into me several years ago, I no longer remembered the concept well enough to provide a decent explanation._

_I learn best by writing, which sparked in me the idea to write a series of posts to dust off my stats chops. In the next few posts, I'm hoping to identify some errors in statistical reasoning I've seen frequently in both academic and business contexts. I'll pick them apart with math and then, hopefully, provide some practical, useful remedies. This first post is on data dredging, or generating hypotheses from your data._

Bad medicine
------------

Imagine you are the general manager of a small ice cream company. You manufacture and sell five flavors of ice cream---chocolate, caramel, and vanilla---to 200 large grocery stores (think Stop & Shop, Publix, and Safeway). Your ice cream comes in three sizes: small, medium, and large.

The end of the year is coming up and you need to develop the sales strategy for next year. Which existing stores should you try to expand in? Which flavors should you put on promo? Which sizes Where should you open new locations? So many questions. To cut through all this mess, you decide to pull the sales from the year prior and take a quick look-see. You luckily have a top-notch POS system that tracks sales by flavor for you in every store. Additionally, you have a six demographic indicators for each store: total dollar sales, square footage, town population, number of years you have been selling to the store, number of employees, total annual pints of ice cream sold by the store (across all companies/brands). 

You run a quick pairwise linear regression on sales of each size and your demographic variables and out pops the following $$ 3 \times 6 $$ matrix of $$R^2$$ values:

If you're really good, you might know the $$p$$ value associated with each regression model.

For the statistics-savvy readers who are at this point slack-jawed, yes this sort of analysis is conducted by businesses every day, and no it's not just small companies that do it. Just why is it so egregious, though?



<!-- Last week, my parents were in town. My mom is an endocrinologist who does a fair bit of reading and editing journal articles. She was describing to me an article she had recently read in which the researchers presented results of a new type of hormonal intervention for patients with a rare disease. At the beginning and end of the study, they had the study participants take a psychological quetsionnaire comprised of seven psychological indicators and tested them on seven biomarkers. They then measured the change in each of these indicators and    -->