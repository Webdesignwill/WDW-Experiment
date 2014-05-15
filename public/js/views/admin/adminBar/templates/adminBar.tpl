<div class="admin-bar-inner">
  <div class="width-auto clear">
    <span class="gears-small-icon"></span>
    <div class="left">
      <ul>
        {{#if newPage.admin}}
          <li><a href="{{themePage.path}}">Return to {{themePage.name}} page</a></li>
        {{else}}
          <li><a href="admin/">Manage site</a></li>
          <li><a href="admin/">Edit {{newPage.name}} page</a></li>
        {{/if}}
      </ul>
    </div>
    <div class="right">
      <p><a class="user-logout">Logout</a></p>
    </div>
  </div>
</div>