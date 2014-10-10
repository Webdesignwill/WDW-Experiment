<h2>{{displayname}}'s Profile</h2>
<p class="intro">Your registered email is {{email}}</p>
<label>
  <input tab-index="1" type="text" placeholder="{{displayname}}" name="displayname" validate />
</label>
<label>
  <input tab-index="2" type="text" placeholder="{{company}}" name="company" validate />
</label>
<label>
  <input tab-index="3" type="text" placeholder="{{firstname}}" name="firstname" validate />
</label>
<label>
  <input tab-index="4" type="text" placeholder="{{lastname}}" name="lastname" validate />
</label>
<div class="grid-40 right">
  <button tab-index="5" class="grid-100">Submit</button>
</div>

<div class="grid-100 left additional-form-text">
  <p><a href="" id="delete-user" class="grid-100 message warning">Delete {{displayname}}</a></p>
</div>