---
layout: default
title:  "Bike theft"
date:   2016-10-31 10:44:57 -0700
---

Bike theft
==========

![cannondale](/assets/bike_theft/cannondale.jpg)
<p class="caption">My old friend</p>

Motivation
----------

I live in Berkeley, California, which is known for at least three things:

- Bike theft
- Vegetarian food
- Liberalism

I'll tackle the first of these topics today; the other two deserve [(several)](http://patch.com/california/berkeley/newly-sworn-mayor-vows-make-berkeley-even-more-liberal) [longer](http://www.dailycal.org/2016/03/18/uc-berkeley-liberalism-now/) [posts](http://www.vegan.com/berkeley/). When I moved out to Berkeley, I bought a trusty Cannondale Quick 7 bike from the good people at [Huckleberry Bikes](http://www.huckleberrybicycles.com/). Highly recommend them.

Six weeks later I was bike-less after having made a rookie locking mistake [[1]](#bike-note). It was sad. I may have gone back to the location where I originally locked my bike multiple times just hoping that it would somehow magically return. Needless to say, it didn't.

I immediately reported the theft to the Berkeley police and a wonderful nonprofit, the [Bike Index](https://bikeindex.org/), which is exactly what it sounds like---they track new and used bikes. When you buy a bike, you register it on their master list of bikes, and if your bike is stolen, you also report that. Most legitimate bike shops (at least in the Bay Area) will check with the Bike Index before selling a used bike. 

When I reported that my beloved-but-nondescript Cannondale was stolen, I found a small source of consolation: the Bike Index makes their data publicly available and they've got **tons of it**. They have data on hundreds of thousands of bikes that have been bought, registered, and (unfortunately) stolen since the mid 2000s, and it's all conveniently packaged and available through [their API](https://bikeindex.org/documentation/api_v3). I set out to understand: how common was my situation, and, aside from locking my bike better, is there anything I could have done differently?

What I found [(code)](https://github.com/davidjwiner/bike-theft/blob/master/Bike%20theft%20analysis.ipynb)
-------------------

Using the Python `url`, `json`, and `csv` libraries, I downloaded all of the Bay Area bike theft data from the [Bike Index](https://bikeindex.org/) since late 2010. I took a look at the aggregate number of monthly bike thefts:

![theft-per-month](/assets/bike_theft/monthly_total_thefts.png)

At first I thought, "Wow there's been this huge increase!" I did a bit of poking around, though, and discovered that the Bike Index [really only took off in 2014](https://bikeindex.org/about)---they started tracking bike theft in 2004 but then really moved things up a notch and rebranded with a [Kickstarter campaign they held 2013](https://www.kickstarter.com/projects/1073266317/the-bike-index-lets-stop-bike-theft-together). So what's probably revealed here is more increased usage of the service rather than a genuine increase in bike theft in the Bay Area.

I then had the idea to normalize the data, though, and that's where things got interesting. In other words, I asked: out of the total bikes stolen every year, what portion are stolen in each month? Here's what came out:

![theft-per-month](/assets/bike_theft/monthly_normalized_thefts_aggregated.png)

There's a definite increase during the fall, and just my luck, **my bike theft month**---October---was the most frequent one. So I guess if I were to tell you anything, it would be to **guard your bike during October**. Just kidding---maybe?

Discussion
----------

I did have to wonder, why do we see this huge uptick? It seems unlikely that suddenly the bike you (individually) own is more susceptible to theft in September and October. Here are a couple of ideas I had:

- **There are more bikes on the road in the fall**: This is possible. I'm sure, like me, there are many folks living on the September to September rent cycle who move to the Bay Area in the fall and buy bikes around then. You have to wonder, though, what happens to those people in the winter/spring? Do they stop riding their bikes? Remember, this isn't New England---people aren't hibernating from December--May.
- **There are more *new* bikes on the road in the fall**: Now this is very possible, especially if you believe the September-September rent cycle point above. Case in point: yours truly. Those bikes may be more attractive to bike thieves because they are easier to sell on the secondary market. 

Other ideas? Feel free to shoot me a note! I have since acquired another bike---this one used and even more nondescript than my blessed Cannondale---but I'm still scratching my head on this one.

_____

 <a name="bike-note">1.</a> It involved locking my bike to a five-foot-tall pole that was exposed to the open air---nothing keeping anyone from lifting the whole bike, lock and all, off and riding away. I now realize that that was not a good idea.