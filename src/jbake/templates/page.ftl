<#include "header.ftl">

	<#include "menu.ftl">
	
	<div class="page-header">
		<h2><#escape x as x?xml>${content.title}</#escape></h2>
	</div>

	<p><em>${content.date?string("dd MMMM yyyy")}</em></p>

	<p class="text-justify">${content.body}</p>

	<hr />

<#include "footer.ftl">