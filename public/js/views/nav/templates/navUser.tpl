{{#if loggedin}}
  Welcome to Webdesignwill {{name}} <span class="menu-icon"></span>
{{else}}
  <a href="modal:open:login">Login | </a>
  <a href="modal:open:register">Register</a>
{{/if}}