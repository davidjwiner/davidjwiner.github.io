---
layout: posts
title:  "Meditations on p"
date:   2016-12-02 00:00:00 -0700
---
A few weeks ago, I was doing my ML homework and started to wonder how significance testing is applied to ordinary least squares (OLS) regression. I started to do a little bit of poking around and realized that there wasn't really a good resource that explained, from first principles, how we get from the classic OLS problem to test statistics, p-values, etc. <!--more-->

I learn best by writing, which sparked in me the idea to write a post that walks through (most of) the derivation for the p-value in OLS regression. It ended up being a little bit more in depth and mathier than I was expecting. For those of you who are more inclined toward web comics than blog posts, you may find [this xkcd link](http://xkcd.com/882/) more illuminating and amusing.


Motivating example
------------------
Imagine you are the general manager of a small ice cream company. You manufacture and sell only one flavor of ice cream---cardamom---to $$1000$$ large grocery stores.

<img src="/assets/cardamom.jpg" width="300">
<p class="caption">NB: This cardamom ice cream thing is real and it will change your life</p>

The end of the year is coming up and you need to develop the sales strategy for next year. Which existing stores should you try to expand in? To help answer this question, you pull the sales from the year prior and take a quick look-see. You luckily have a top-notch POS system that tracks sales by store. Additionally, you have the average local temperature in Farenheit for each store. You form the hypothesis that there is a positive correlation between store temperature and total dollar sales of ice cream. If you can confirm this hypothesis, you'll likely try to sell further into your south and southwestern retail customers (think stores in Austin, Santa Fe, etc.).

In the this example, we'd like a value that tells us the probability that any correlation we see between temperature and sales is a false positive. In other words, we want $$p$$ to be the  probability that, in a random sample of data, we'd calculate _at least as strong a correlation_ as we're seeing here even though there's no actually relationship between our independent and dependent variables (temperature and sales, or $$x$$ and $$y$$).

Ordinary least squares
----------------------
Let's use the following notation:

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
&\sim N(\beta, \sigma^2(X^TX)^{-1})

\end{alignat}
$$

What we're really interested in understanding is the p-value for the slope of the distribution, in other words, the probability of obtaining a false positive for $$\beta_2$$.

We can find the variance of the slope by examining the values in the variance matrix for $$\hat{\beta}$$, $$\sigma^2 (X^TX)^{-1}$$. Specifically, we can write:

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

The lower-right element of this matrix should give us the covariance over the second dimension of $$X$$---in other words, the variance of the slope: $$\frac{\sigma^2}{\sum_i (x_i - \bar{x})^2}$$.

Hypothesis testing
------------------

Back to our original question---how do we set up a hypothesis test that allows us to determine whether there is a meaningful relationship between $$X$$ and $$Y$$? Let's look at the slope $$\beta_2$$. Formally:

$$
\begin{align*}
H_0: \beta_2 = 0 \\
H_A: \beta_2 \neq 0
\end{align*}
$$

Ideally, we'd like to be able to do a simple hypothesis test on:

$$
\begin{align*} 
z &= \frac{\hat{\beta_2}}{\sqrt{Var(\hat{\beta_2})}} \\
  &= \frac{\hat{\beta_2} \sum_i (x_i - \bar{x})^2}{\sigma}
\end{align*}
$$

This is not possible, however, since $$\sigma^2$$ is a population parameter rather than an observed parameter. What we do instead is use the standard error $$s^2 = \frac{1}{n-1}\sum_i (y_i - \bar{y})^2$$ as our estimator for the population variance $$\sigma^2$$ (recall that this is an unbiased estimator for $$\sigma^2$$).

Finally, we have a test statistic we can use for our hypothesis test:

$$
t = \frac{\hat{\beta_2}}{s}
$$

Note that because we are using the standard error $$s$$ instead of $$\sigma$$, our distribution shifts from a normal distribution to a t-distribution with $$n-1$$ degrees of freedom.

Now, suppose the we have $$\hat{\beta_2} > 0$$, and the t-value for our distribution is ~2.

Recall that $$ n \approx 1000 $$. For a two-tailed test and $$t \approx 2$$, we can look up in a [t table](http://www.sjsu.edu/faculty/gerstman/StatPrimer/t-table.pdf) and find that this corresponds to a significance level of $$ p = 0.05 $$. In other words, the probability that we're looking at a spurious correlation (i.e., there is no real relationship between the independent and dependent variables) given this dataset is $$ 5\% $$.

Recall that $$\alpha$$ is simply the threshold level for $$ p $$ at which we reject $$ H_0 $$. We require $$ p \leq \alpha $$ to reject the null hypothesis. In this case, for $$ \alpha = 0.05 $$, we would reject; however, for $$ \alpha = 0.01 $$, we would fail to reject.

Acknowledgements and sources
----------------------------
The second section of this post is heavily based on to Ben Recht's linear regression notes from CS289A at Berkeley. I also extensively referenced [this Stack Exchange post](http://stats.stackexchange.com/questions/91750/how-is-the-formula-for-the-standard-error-of-the-slope-in-linear-regression-deri) and [these notes](http://www.mit.edu/~6.s085/notes/lecture2.pdf) from MIT's 6.s085 while writing this post. 