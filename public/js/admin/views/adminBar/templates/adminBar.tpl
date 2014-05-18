<div class="admin-bar-inner">
  <div class="width-auto clear">
    <span class="gears-small-icon"></span>
    <div class="left">
      <p>
        {{#if newPage.admin}}
          <a href="{{themePage.path}}">Return to {{themePage.name}} page</a>
        {{else}}
          <a href="admin/">Admin |</a>
          <a href="admin/edit/{{themePage.pageid}}">Edit {{newPage.name}} page</a>
        {{/if}}
      </p>
    </div>
    <div class="right">
      <p>
        <a class="realtime">Realtime editing |</a>
        <a class="user-logout">Logout</a>
      </p>
    </div>
  </div>
</div>