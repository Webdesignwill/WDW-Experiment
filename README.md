Webdesignwill.co.uk
======
My very own CMS site which i'm creating as a learning initiative. The site will be constructed from the site.json while developing. Once I start writing the server in Node.js, then I will be able to start implementing the API to create pages and save data.

Architecture
------
The router will be dynamically generated from the pages in the site.json. The nav and other components will inherit the same properties from the site.json which will eventually be served from an api.

The idea is that each page has it's own model which knows the next and previous siblings, the parent and subpages for each page so that the user will be able to click next, previous, top or bottom to go to navigate as oppose to a traditional navigation.

Collection
------
The collection sorts the data as it still has the relationship between the models and the model then has the methods to navigate through the site.

Model
------
Each model has it's own reference to it's respective view and can listen to page:change events which in turn will then clear it's view instance. Also, each views model will have a getter to find the repective top, next, prev and child sibling so for example :

The view would call : this.model.getNextPage(options);

// TODO write a callback for when the view has been instantiated.

Page Controller
------
The page controller has the animation between the views like a before and after, passes the view the model (for now), then cleans up the DOM by triggering a page:change event. Each model will listen to the event and see if it needs to be cleaned up or not.

Tools
------
I'm going to use Backbone, require, SASS, Node and other such nice tools.