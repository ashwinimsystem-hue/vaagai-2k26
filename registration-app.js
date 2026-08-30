/* Vaagai 2k26 custom registration front end.
 * Backend endpoint is configured in CONFIG.endpoint below.
 * The site remains static on GitHub Pages; submissions are sent to the organiser's
 * serverless endpoint, which should write to a Google Sheet/Excel-compatible table.
 */
const CONFIG = {
  endpoint: '',
  events: {
    'paper-presentation': {name:'Paper Presentation', type:'Team / Individual', fee:'₹200 solo / ₹400 team', teamMax:4, fields:['topic']},
    'cad-modeling': {name:'CAD Modeling', type:'Individual', fee:'₹200', teamMax:1, fields:['software']},
    'ansys-simulation': {name:'ANSYS Simulation Challenge', type:'Individual', fee:'₹200', teamMax:1, fields:['software']},
    'glider-competition': {name:'Glider Competition', type:'Individual / Team', fee:'₹200 single / ₹250 doubles', teamMax:2, fields:['memberCount']},
    'technical-quiz': {name:'Technical Quiz', type:'Team', fee:'₹100', teamMax:3, fields:['memberCount']},
    'line-follower': {name:'Line Follower', type:'Team', fee:'₹300', teamMax:3, fields:['memberCount']},
    'water-rocketry': {name:'Water Rocketry', type:'Individual / Team', fee:'₹200 single / ₹250 doubles', teamMax:2, fields:['memberCount']},
    'free-fire': {name:'Free Fire', type:'Squad', fee:'₹100 / squad', teamMax:4, fields:['memberCount']},
    'carrom': {name:'Carrom', type:'Team', fee:'₹100 / team', teamMax:2, fields:['memberCount']},
    'ipl-auction': {name:'IPL Auction', type:'Team', fee:'₹100 / team', teamMax:4, fields:['memberCount']},
    'treasure-hunt': {name:'Treasure Hunt', type:'To be announced', fee:'To be announced', teamMax:6, fields:['memberCount']},
    'chess': {name:'Chess', type:'Individual', fee:'₹50 / head', teamMax:1, fields:[]}
  }
};
function qs(sel){return document.querySelector(sel)}
function getEventKey(){return new URLSearchParams(location.search).get('event')||''}
function esc(v){return String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]))}
function eventCard(key,e){return `<a class="registration-event" href="registration.html?event=${encodeURIComponent(key)}"><span>${esc(e.type)}</span><strong>${esc(e.name)}</strong><small>${esc(e.fee)}</small></a>`}
function renderChooser(){const el=qs('#event-chooser');if(!el)return;el.innerHTML=Object.entries(CONFIG.events).map(([k,e])=>eventCard(k,e)).join('')}
function renderForm(key){const e=CONFIG.events[key];const root=qs('#registration-form-root');if(!root)return;if(!e){root.innerHTML='<div class="registration-empty"><h2>Select an event to register</h2><p>Choose an event from the Events page. The registration form will then show only the information needed for that competition.</p></div>';return}
 const team = e.teamMax>1;
 root.innerHTML=`<div class="selected-event"><span class="eyebrow">Selected competition</span><h2>${esc(e.name)}</h2><div class="selection-meta"><span>${esc(e.type)}</span><span>${esc(e.fee)}</span></div></div>
 <form id="custom-registration-form" novalidate>
   <input type="hidden" name="event" value="${esc(e.name)}">
   <input type="hidden" name="eventKey" value="${esc(key)}">
   <div class="form-grid">
     <label>Participant name<input name="name" required maxlength="80" autocomplete="name"></label>
     <label>Mobile number<input name="mobile" required inputmode="tel" pattern="[0-9+ ()-]{10,18}" autocomplete="tel"></label>
     <label>College registration number<input name="collegeRegistrationNumber" required maxlength="40"></label>
     <label>College name<input name="collegeName" required maxlength="120" autocomplete="organization"></label>
     <label>Department<input name="department" required maxlength="100"></label>
     <label>Year of study<input name="year" required maxlength="30" placeholder="e.g. 2nd Year"></label>
     ${team?`<label>Team name${e.type==='Individual / Team'?' (required for team entries)':''}<input name="teamName" maxlength="80" autocomplete="off"></label><label>Number of members<input name="memberCount" type="number" min="1" max="${e.teamMax}" value="1" required></label>`:''}
     ${e.fields.includes('topic')?'<label class="full">Paper topic / title<input name="topic" required maxlength="180"></label>':''}
     ${e.fields.includes('software')?'<label class="full">Preferred software<input name="software" required maxlength="80" placeholder="CATIA / SOLIDWORKS / ANSYS Workbench / Fluent"></label>':''}
   </div>
   <label class="consent"><input type="checkbox" name="consent" required> I confirm that the information provided is accurate.</label>
   <button class="btn btn-primary" type="submit">Submit Registration</button>
   <p class="form-note">A participant ID or team ID will be generated after successful submission.</p>
   <div id="form-status" role="status" aria-live="polite"></div>
 </form>`;
 qs('#custom-registration-form').addEventListener('submit',submitForm)
}
async function submitForm(ev){ev.preventDefault();const form=ev.currentTarget,status=qs('#form-status');const data=Object.fromEntries(new FormData(form).entries());status.textContent='Submitting…';
 if(!CONFIG.endpoint){status.innerHTML='<strong>Registration backend not connected yet.</strong><br>The front-end is ready, but the secure submission endpoint must be connected before this form is published for real registrations.';return}
 try{const res=await fetch(CONFIG.endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});const out=await res.json();if(!res.ok||!out.ok)throw new Error(out.message||'Submission failed');status.innerHTML=`<strong>Registration successful.</strong><br>Your ID: <b>${esc(out.registrationId||out.teamId)}</b>${out.teamId?`<br>Team ID: <b>${esc(out.teamId)}</b>`:''}`;form.reset()}catch(err){status.textContent=`Registration failed: ${err.message}`}}
document.addEventListener('DOMContentLoaded',()=>{renderChooser();renderForm(getEventKey())});
