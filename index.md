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
	 																		"News junkie",
	 																		"Grad student",
	 																		"Ice cream connoisseur",
	 																		"Strategy consultant",
	 																		"Product person",
	 																		"Runner",
	 																		"Education policy nerd",
	 																		"Vegetarian", 
	 																		"Relentless optimist ✌️"]'>
    	<span class="wrap"></span>
  	</a>
</div>