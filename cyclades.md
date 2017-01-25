---
layout: default
title: Cyclades
permalink: /cs267-cyclades
---

# CS267 HW0: <span class="sc">Cyclades</span>
 
# Personal bio

My name is David Winer, and I am a Masters student in EECS. I studied Applied Math at Brown for undergrad. In this course, I am hoping to learn more about applications of parallel computing in industry and research, with specific focus in modern data science and machine learning. I am currently working with Lee Fleming (IEOR) on applications of natural language processing (NLP) techniques to US patent data.

# Application description

<span class="sc">Cyclades</span> is a general framework for parallelizing a family of machine learning algorithms: stochastic update (SU) algorithms [1]. It builds off of the work of <span class="sc">Hogwild!</span>, an update scheme that allows for parallel stochastic gradient descent (SGD) updates without the use of locks [2]. It is more general than <span class="sc">Hogwild!</span>, however, since it can be applied to any arbitrary SU algorithm, not just stochastic gradient descent (e.g., stochastic variance reduced gradient, SAGA). The ‘trick’ to the <span class="sc">Cyclades</span> approach is allocating related updates $$u_1, ... , u_n$$ to cores in a way that minimizes conflicts. Given certain sparsity constraints, <span class="sc">Cyclades</span> can achieve nearly linear speedup (while guaranteeing similar convergence behavior as you would expect from a serial algorithm).

## Target platform and performance
The initial <span class="sc">Cyclades</span> implementation was developed in C++ and tested on a 72-CPU machine spread across 4 NUMA nodes. Each node had 18 CPUs and 1 TB of memory. It was tested on four machine learning tasks (each of which employs an SU algorithm): least squares, computing the top eigenvector of $$A^TA$$ for an adjacency matrix $$A$$, matrix completion, and semantic word embedding (Word2Vec). Each task was tested with a maximum of 18 threads (i.e., within one NUMA node). Across all tasks, <span class="sc">Cyclades</span> achieved significant speedup over a serial approach: between 3x (graph eigenvectors) and 12x (word embedding) on 18 threads. Even more importantly, it outperformed <span class="sc">Hogwild!</span> solutions to each of these problems, especially with a larger number of threads ($$>2-4$$).
 
## Limitations
The main limitation associated with this approach is the sparsity constraints required for <span class="sc">Cyclades</span> to achieve meaningful speedup. For example, for a dense machine learning problem where each update requires accessing every component of the model variable $$\textbf{x}$$, <span class="sc">Cyclades</span> would not produce better performance than a serial algorithm.

## References
[1] X. Pan, M. Lam, S. Tu, D. Papailiopoulos, C. Zhang, M. Jordan, K. Ramchandran, C. Re, and B. Recht. Cyclades: Conflict-free asynchronous machine learning. NIPS, 2016. 

[2] F. Niu, B. Recht, C. Re, and S. J. Wright. Hogwild! A lock-free approach to parallelizing stochastic
gradient descent. NIPS, 2011.
