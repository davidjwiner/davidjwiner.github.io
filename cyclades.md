---
layout: default
title: CS267 Cyclades Overview
permalink: /cyclades/
---

## Personal bio

My name is David Winer and I am a Masters student in EECS. I graduated with an A.B. in Applied Math from Brown University. In this class, I’m hoping to learn more about applications of parallel computing in industry and research, with specific applications in modern data science and machine learning. I am currently working with Lee Fleming (IEOR) on applications of natural language processing (NLP) techniques to US patent data.

# Cyclades

## Overview

$$1000$$

<script type="math/tex; mode=display">Hello</script>

Cyclades is a general framework for parallelizing a family of machine learning algorithms—stochastic update (SU) algorithms. It builds off of the work of HogWild!, an update scheme that allows for parallel stochastic gradient descent (SGD) updates without the use of locks. It is more general than HogWild!, however, since it can be applied to any arbitrary SU algorithm, not just stochastic gradient descent (e.g., stochastic variance reduced gradient, SAGA). The ‘trick’ to the Cyclades approach is allocating related updates $$u_1,…,u_n$$ to cores in a way that minimizes conflicts across cores. Given certain sparsity constraints, Cyclades can achieve nearly linear speedup (while guaranteeing similar convergence behavior as you would see with a serial algorithm).

# Target platform and performance
The initial Cyclades implementation was developed in C++ and tested on a 72-CPU machine spread across 4 NUMA nodes. Each node had 18 CPUs and 1 TB of memory. It was tested on four machine learning tasks (each of which employs an SU algorithm): least squares, computing the top eigenvector of $A^TA$ for an adjacency matrix $A$, matrix completion, and semantic word embedding. In each of these cases, Cyclades achieves significant speedup over a serial approach—between ~3x (graph eigenvectors) and ~12x (word embedding) on 18 threads. Even more importantly, it outperforms HogWild! solutions to each of these problems, especially with a larger number of threads (>2-4).
 
# Limitations
The main limitation associated with this approach is the sparsity constraints required. 
