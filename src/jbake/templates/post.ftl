<#include "header.ftl">
	
	<#include "menu.ftl">
	
	<div class="page-header">
		<h1><#escape x as x?xml>${content.title}</#escape></h1>
	</div>

	<p><em>${content.date?string("dd MMMM yyyy")}</em></p>

	<p class="text-justify">${content.body}</p>

	<hr />
<div id="disqus_thread"></div>
<script>

var disqus_config = function () {
    this.page.url = '${config.site_host}${content.uri}';  // Replace PAGE_URL with your page's canonical URL variable
    this.page.identifier = '${content.uri}'; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
};

(function() { // DON'T EDIT BELOW THIS LINE
    var d = document, s = d.createElement('script');
    s.src = '//anirudhgali-github-io.disqus.com/embed.js';
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
})();
</script>

<noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
                                    	
<#include "footer.ftl">
