---
layout: default
title:  "Data dredging"
date:   2016-12-02 00:00:00 -0700
---

Data dredging
=============

_A few weeks ago, a good friend of mine studying psychology at Berkeley asked me a question about statistical power. Having taken more than my fair share of statistics classes in undergrad and grad school, I thought that I should be able to answer his question. To my dismay, I realized that even after having it drilled into me several years ago, I no longer remembered the concept well enough to provide a decent explanation._

_I learn best by writing, which sparked in me the idea to write a series of posts to dust off my statistics chops. In the next few posts, I'm hoping to identify some errors in statistical reasoning I've seen frequently in both academic and business contexts. I'll pick them apart with math and then, hopefully, provide some practical, useful remedies. This first post is on data dredging, or generating hypotheses from your data. For those of you who are more inclined toward web comics than blog posts, you may find [this xkcd link](http://xkcd.com/882/) more illuminating and amusing._

Motivating example
------------------

Imagine you are the general manager of a small ice cream company. You manufacture and sell only one flavor of ice cream---cardamom (I know right!)---to 200 large grocery stores (think Stop & Shop, Publix, and Safeway). Your ice cream comes in three sizes: small, medium, and large.

The end of the year is coming up and you need to develop the sales strategy for next year. Which existing stores should you try to expand in? Which flavors should you put on promo? Where should you open new locations? So many questions. To cut through all this mess, you decide to pull the sales from the year prior and take a quick look-see. You luckily have a top-notch POS system that tracks sales by flavor for you in every store. Additionally, you have a six demographic indicators for each store: total dollar sales, square footage, town population, number of years you have been selling to the store, number of employees, total annual pints of ice cream sold by the store (across all companies/brands). 

You run a quick pairwise linear regression on sales of each ice cream size and your demographic variables and out pops the following $$ 3 \times 6 $$ matrix of $$R^2$$ values (suppose the _bolded_ cells have $$p < 0.05$$):

|---
| 

First, quick refresher: what are $$R^2$$ and $$p$$? Let's start with $$R^2$$. Where $$SS$$ denotes the sum of squared error, $$\textbf{y}$$ is our data labels, $$\bar{y}$$ is the mean of all labels, and $$\textbf{h}$$ is the model's prediction, we have:

$$
\begin{align*}

SS_{total} &= \sum_i (y_i - \bar{y}) ^2 \\ 
		   &= \sum_i (y_i - h_i) ^ 2 + \sum_i (h_i - \bar{y}) ^2 \\
		   &= SS_{noise} + SS_{model}

\end{align*}
$$

And $$R^2 \equiv \frac{SS_{model}}{SS_{total}}$$. You may have heard the intuitive explanation that the $$R^2$$ value tells you the portion of variance in the data that is explained by the model. This becomes clear once you note that $$SS_{total}$$ is proportional to the sample variance (it would be exactly equal if we added a factor $$\frac{1}{N}$$).

On to the fun one: $$p$$. It's helpful to go in the opposite direction here---state the intuitive explanation and then make it precise. We'd like a value that tells us the probability that our result is a false positive. In other words, we want $$p$$ to be the probability that, in a random sample of data, we'd calculate _at least as strong a correlation_ as we're seeing here even though there's no actually relationship between our independent and dependent variables ($$x$$ and $$y$$). Let's use the following notation:

$$
\begin{equation}
	X = \begin{bmatrix}
	1 & x_1 \\
	1 & x_2 \\
	... & ... \\
	1 & x_n
	\end{bmatrix}, \
Y = \left[y_1, ... , y_n \right]^T, \
\beta = \left[\beta_1, \beta_2\right]^T
\end{equation}
$$

Here, we assume a regression problem with $$Y = X \beta  + \epsilon$$ where $$\epsilon \sim N(0, \sigma^2 I)$$. Through maximum likelihood estimation, we find the least squares solution: $$\hat{\beta} = (X^TX)^{-1}X^TY$$.

Plugging in our original equation for $$Y$$:

$$
\begin{align*}
	\hat{\beta} &= (X^TX)^{-1}X^T(X\beta + \epsilon) \\
				&= \beta + (X^TX)^{-1}X^T \epsilon 
\end{align*}
$$

Hence we can rewrite the distrubtion for $$\hat{\beta}$$ as:

$$
\begin{alignat}{1}
 \hat{\beta} 
&\sim N(\beta, (X^TX)^{-1}X^T\sigma^2 X (X^T X)^{-1}) \\
\Rightarrow
 \hat{\beta} 
&\sim N(\beta, (X^TX)^{-1}\sigma^2)

\end{alignat}
$$

What we're really interested in understanding is the p-value for the slope of the distribution, in other words, the false positive rate for $$\beta_2$$.

We can find the variance of the slope by examining the values in the variance matrix for $$\hat{\beta}$$, $$\sigma^2 (X^TX)^{-1}$$. Explicitly, we can write:

$$
\begin{align*}
\sigma^2 (X^TX)^{-1} &=
\sigma^2
\begin{bmatrix}
n & \sum_i x_i \\
\sum_i x_i & \sum_i x_i ^ 2
\end{bmatrix}
^{-1} \\

&= \frac{\sigma^2}{n\sum_i x_i^2 - (\sum_i x_i)^2} 
\begin{bmatrix}
\sum_i x_i ^2 & -\sum_i x_i ^ 2 \\
-\sum_i x_i ^ 2 & n
\end{bmatrix} \\

&= \frac{\sigma^2}{n \sum_i (x_i - \bar{x})^2} 
\begin{bmatrix}
\sum_i x_i ^2 & -\sum_i x_i ^ 2 \\
-\sum_i x_i ^ 2 & n
\end{bmatrix}

\end{align*}
$$

The lower-right element of this matrix should give us the covariance over the second dimension of $$X$$---in other words, the variance of the slope: $$\frac{\sigma^2}{\sum_i (x_i - \bar{x})^2}$$. This element depends on our unknown $$\sigma$$, but it can be shown (again, with maximum likelihood estimation) that the best estimator to use is $$\hat{\sigma}$$, the square root of the sample variance.

Hypothesis testing
------------------
When we want to estimate a parameter dependent on $$\hat{\sigma}$$ (i.e., the standard error of the population), the test statistic will follow a T distribution.

<!-- What is a T distribution, exactly? That's a good question...
 -->
Back to our original question---how do we set up a hypothesis test that allows us to determine whether there is a meaningful relationship between $$X$$ and $$Y$$? One thought is to look at the slope $$\beta_2$$. Formally:

$$
\begin{align*}
H_0: \beta_2 = 0 \\
H_A: \beta_2 \neq 0
\end{align*}
$$

In this case, our test statistic is:

$$
\frac{\hat{\beta_2}}{\hat{\sigma}}
$$

If you recall your Gaussian distribution rules, you'll In other words, our least square solution $$\hat{\beta}$$ for the model coefficients $$\beta$$ is equal to $$\beta$$ itself plus some transformed version of our original  


__Calculating $$R^2$$__

If you've done your homework, you might know the $$p$$ value associated with your regression models. For the sake of argument, suppose you have $$p < 0.05$$ for each element in the table . This means that, in each case, the probability of obtaining a result at least as strong  [Note: How do you interpret $$p$$ values for ordinary least squares regression?] 

For the statistics-savvy readers who are at this point slack jawed, yes this sort of analysis is conducted by businesses every day, and no it's not just small companies that do it. Just why is it so egregious, though?

Discussion
----------



Why all is not lost
-------------------

______


<!-- Last week, my parents were in town. My mom is an endocrinologist who does a fair bit of reading and editing journal articles. She was describing to me an article she had recently read in which the researchers presented results of a new type of hormonal intervention for patients with a rare disease. At the beginning and end of the study, they had the study participants take a psychological quetsionnaire comprised of seven psychological indicators and tested them on seven biomarkers. They then measured the change in each of these indicators and    -->