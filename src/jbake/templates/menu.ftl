	<!-- Fixed navbar -->
    <div class="navbar navbar-dark bg-primary">
      <div class="container">
       <a class="navbar-brand" href="<#if (content.rootpath)??>${content.rootpath}<#else></#if>">ANIRUDH GALI</a>
        <div class="navbar-header">
          <button type="button"class="navbar-toggler" data-toggle="collapse" data-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
             <span class="navbar-toggler-icon"></span>
          </button>
        </div>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="nav navbar-nav">
            <li class="nav-item active">
            <a class="nav-link" href="<#if (content.rootpath)??>${content.rootpath}<#else></#if>index.html">Blog<span class="sr-only">(current)</span></a></li>
            <li class="nav-item"><a class="nav-link" href="<#if (content.rootpath)??>${content.rootpath}<#else></#if>about.html">About</a></li>
            <li class="nav-item"><a class="nav-link" href="<#if (content.rootpath)??>${content.rootpath}<#else></#if>snippet-loader.html">Utilities</a></li>
            <li class="nav-item"><a class="nav-link" href="<#if (content.rootpath)??>${content.rootpath}<#else></#if>resume.html">Resume</a></li>
            <li class="nav-item"><a class="nav-link" href="https://github.com/anirudhgali">GitHub</a></li>
            <li class="nav-item"><a class="nav-link" href="<#if (content.rootpath)??>${content.rootpath}<#else></#if>${config.feed_file}">Subscribe</a></li>
        </div>
      </div>
    </div>
    <div class="container">