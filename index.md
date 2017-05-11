---
layout: default
title: Home
permalink: /
---

<div class="hero-photo">
	 {% for js in site.jsarr %}
	     <script type="text/javascript">
	     	{% include {{ js }} %}
	     </script>
 	{% endfor %}
	 <a href="" class="typewrite intro-text" data-period="2000" data-type='["Data scientist",
	 																		"Podcast lover", 
	 																		"Strategy consultant",
	 																		"Cilantro hater",
	 																		"Statistics nerd",
	 																		"Product person",
	 																		"Runner",
	 																		"Education policy enthusiast",
	 																		"Vegetarian", 
	 																		"Relentless optimist"]'>
    	<span class="wrap"></span>
  	</a>
</div>