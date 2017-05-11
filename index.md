---
layout: default
title: Home
permalink: /
---

<!-- ![Me](/assets/David.jpg) -->

<div class="hero-photo">
	<!-- <p class="intro-text anim-typewriter">Hi, I'm David.</p> -->
	<script>
		var TxtType = function(el, toRotate, period) {
	        this.toRotate = toRotate;
	        this.el = el;
	        this.loopNum = 0;
	        this.period = parseInt(period, 10) || 2000;
	        this.txt = '';
	        this.tick();
	        this.isDeleting = false;
	    };

	    TxtType.prototype.tick = function() {
	        var i = this.loopNum % this.toRotate.length;
	        var fullTxt = this.toRotate[i];

	        if (this.isDeleting) {
	        this.txt = fullTxt.substring(0, this.txt.length - 1);
	        } else {
	        this.txt = fullTxt.substring(0, this.txt.length + 1);
	        }

	        this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

	        var that = this;
	        var delta = 200 - Math.random() * 100;

	        if (this.isDeleting) { delta /= 2; }

	        if (!this.isDeleting && this.txt === fullTxt) {
	        delta = this.period;
	        this.isDeleting = true;
	        } else if (this.isDeleting && this.txt === '') {
	        this.isDeleting = false;
	        this.loopNum++;
	        delta = 500;
	        }

	        setTimeout(function() {
	        that.tick();
	        }, delta);
	    };

	    window.onload = function() {
	        var elements = document.getElementsByClassName('typewrite');
	        for (var i=0; i<elements.length; i++) {
	            var toRotate = elements[i].getAttribute('data-type');
	            var period = elements[i].getAttribute('data-period');
	            if (toRotate) {
	              new TxtType(elements[i], JSON.parse(toRotate), period);
	            }
	        }
	        // INJECT CSS
	        var css = document.createElement("style");
	        css.type = "text/css";
	        css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
	        document.body.appendChild(css);
	    };
	 </script>
	 <a href="" class="typewrite intro-text" data-period="2000" data-type='[ "Hi, my name is David.", "I am a data scientist."]'>
    	<span class="wrap"></span>
  	</a>
</div>

My name is **David**, and I'm a Masters student studying Electrical Engineering and Computer Science at UC Berkeley. My Masters research centers on natural language processing applied to intellectual property and US patent data.

Prior to coming to Berkeley, I worked in management consulting at [**Bain**](http://bain.com/) and in product at [**Zearn**](https://www.zearn.org/). I studied Applied Math at Brown for undergrad.

My interests have shifted a lot over the last few years---there is often more I would like to learn about or work on than I have time to---but here are some of the things that I have found myself thinking about a lot recently:

- Machine learning and AI
- The gig economy
- K-12 math education
- Databases
- Intellectual property and patent invalidation
- Enterpreneurship
- Vegetarian cooking
- Statistics
- US politics

Find more detail on my work and academic experience in my **[resume](/resume)**. Feel free to shoot me a note or reach out over [**LinkedIn**](https://www.linkedin.com/in/david-winer-58223428) if you'd like to get in touch. 