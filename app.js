const data = window.PLAN_DATA;
const $ = s => document.querySelector(s);
const fmt = iso => iso ? new Date(iso+'T00:00:00').toLocaleDateString('tr-TR',{day:'numeric',month:'long',year:'numeric'}) : '';
const isMeal = s => /KAHVALTI|YEMEĞİ|Çıkış|OKUMA/i.test(s||'');
let currentClass = data.classes[0].className;
function init(){
  $('#classSelect').innerHTML = data.classes.map(c=>`<option>${c.className}</option>`).join('');
  $('#classSelect').onchange=e=>{currentClass=e.target.value; renderAll()};
  document.querySelectorAll('.nav').forEach(b=>b.onclick=()=>{document.querySelectorAll('.nav,.view').forEach(x=>x.classList.remove('active'));b.classList.add('active');$('#'+b.dataset.view).classList.add('active')});
  $('#searchInput').oninput=renderSchedule; renderAll();
}
function getClass(){return data.classes.find(c=>c.className===currentClass)}
function lessonCard(l){return `<article class="lesson ${isMeal(l.subject)?'meal':''}"><small>${l.no}. ders ${l.time?`• ${l.time}`:''}</small><b>${l.subject}</b><span>${l.teacher}</span><p>${l.topic}</p></article>`}
function renderAll(){
  const cls=getClass(), lessonCount=cls.days.reduce((a,d)=>a+d.lessons.length,0);
  $('#statClass').textContent=data.classes.length; $('#statLessons').textContent=lessonCount; $('#statTeachers').textContent=data.teacherAssignments.length; $('#statTopics').textContent=data.topicList.length;
  $('#todayPreview').innerHTML=cls.days[0].lessons.slice(0,8).map(lessonCard).join('');
  renderSchedule(); renderTeachers(); renderHomework();
}
function renderSchedule(){
  const q=($('#searchInput')?.value||'').toLocaleLowerCase('tr-TR'); const cls=getClass(); $('#scheduleTitle').textContent=`${currentClass} Haftalık Plan`;
  $('#weekGrid').innerHTML=cls.days.map(d=>{
    const lessons=d.lessons.filter(l=>!q || `${l.subject} ${l.teacher} ${l.topic}`.toLocaleLowerCase('tr-TR').includes(q));
    return `<section class="day"><h3>${d.day}</h3><div class="date">${fmt(d.date)}</div>${lessons.map(lessonCard).join('')||'<p>Sonuç bulunamadı.</p>'}</section>`
  }).join('');
}
function renderTeachers(){
  const rows=data.teacherAssignments.filter(t=>t.className===currentClass);
  $('#teacherTable').innerHTML=`<div class="head">Sınıf</div><div class="head">Öğretmen</div><div class="head">Ders</div>` + rows.map(t=>`<div>${t.className}</div><div>${t.teacher}</div><div>${t.lesson}</div>`).join('');
}
function renderHomework(){
  $('#homeworkGrid').innerHTML=data.homework.map(d=>`<div class="homework-card"><h3>${d.day}</h3><small>${fmt(d.date)}</small>${d.entries.slice(0,5).map(e=>`<p><b>${e.resource}</b><br>${e.pages}<br><small>${e.duration}</small></p>`).join('')}</div>`).join('');
}
init();
