Webdesignwill.co.uk
======
My very own CMS site which i'm creating as a learning initiative. The site will be constructed from the site.json while developing. Once I start writing the server in Node.js, then I will be able to start implementing the API to create pages and save data.

Architecture
------
The router will be dynamically generated from the pages in the site.json. The nav and other components will inherit the same properties from the site.json which will eventually be served from an api.

The pages are initially stored in a collection and each page model when initialised, will be modified according to the properties in the site.json.

Each page inherits from the parent page object which in turn inherits from the Backbone view object. Each page has a model associated with it that is essentially a controller.

The page controller sets the initial stage and has the goto method which before rendering will transition the page and after transition the new page so it looks smooth.

Tools
------
I'm going to use Backbone, require, SASS, Node and other nice tools.