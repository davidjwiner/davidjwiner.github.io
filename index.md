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
	 <a href="" class="typewrite intro-text" data-period="500" data-type='["Data scientist",
	 																		"Grad student",
	 																		"Ice cream connoisseur",
	 																		"Strategy consultant",
	 																		"Education policy nerd",
	 																		"Relentless optimist ✌️"]'>
    	<span class="wrap"></span>
  	</a>
</div>