
	<div class="page-header">
		<h1>Blog</h1>
	</div>

	<main class="wrap group">
        <aside class="sidebar">
           <div class="my-info">
           </div>
        </aside>
        <div class="content">
					<#list posts as post>
			  			<#if (post.status == "published")>
			  				<a href="${post.uri}"><h1><#escape x as x?xml>${post.title}</#escape></h1></a>
			  				<p>${post.date?string("dd MMMM yyyy")}</p>
			  				<p>${post.body}</p>
			  			</#if>
			  	</#list>
        </div>
  </main>

	<p>Older posts are available in the <a href="${content.rootpath}${config.archive_file}">archive</a>.</p>

<#include "footer.ftl">
