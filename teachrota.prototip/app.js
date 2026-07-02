function el(id) { return document.getElementById(id); }
function formatText(value) { return (value || '').replace(/\n/g, '<br>'); }

function populateDateRanges() {
  if (!el('dateRange') || typeof dateRanges === 'undefined') return;
  el('dateRange').innerHTML = dateRanges.map((range, index) =>
    `<option value="${range}" ${range === '21-27 Haziran' ? 'selected' : ''}>${index + 1}. Hafta | ${range}</option>`
  ).join('');
}

let selectedOutcomes = {};
let activeSubject = 'Türkçe';
const draftStorageKey = 'dersplanimDraft_sade_v2';

function getSubjectsFromSchedule() {
  const subjects = new Set();
  scheduleData.forEach(row => row.lessons.forEach(lesson => {
    if (lesson.name && !lesson.break) subjects.add(lesson.name);
  }));
  return Array.from(subjects);
}

function buildSchedule() {
  const table = el('scheduleTable');
  table.innerHTML = '';
  const header = document.createElement('tr');
  header.innerHTML = '<th class="day-head">Gün</th>' + lessonHours.map(h => `<th>${h}</th>`).join('');
  table.appendChild(header);
  let filled = 0;
  scheduleData.forEach((row, rIndex) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<th class="day-name">${row.day}</th>`;
    row.lessons.forEach((lesson, cIndex) => {
      const td = document.createElement('td');
      td.dataset.row = rIndex;
      td.dataset.col = cIndex;
      if (lesson.break) {
        td.className = 'lunch';
        td.textContent = 'ÖĞLE ARASI';
      } else if (!lesson.name && !lesson.outcome) {
        td.className = 'empty-cell editable-cell';
        td.contentEditable = 'true';
        td.innerHTML = '&nbsp;';
      } else {
        filled += 1;
        td.className = 'editable-cell';
        td.contentEditable = 'true';
        td.innerHTML = `<strong>${lesson.name}</strong><p>${formatText(lesson.outcome)}</p>`;
      }
      td.addEventListener('blur', () => syncCellToData(td));
      tr.appendChild(td);
    });
    table.appendChild(tr);
  });
  el('lessonCount').textContent = filled;
}

function syncCellToData(td) {
  const r = Number(td.dataset.row);
  const c = Number(td.dataset.col);
  if (!scheduleData[r] || !scheduleData[r].lessons[c] || scheduleData[r].lessons[c].break) return;
  const strong = td.querySelector('strong');
  const p = td.querySelector('p');
  if (strong) scheduleData[r].lessons[c].name = strong.textContent.trim();
  if (p) scheduleData[r].lessons[c].outcome = p.innerText.trim();
}

function buildHomework() {
  const table = el('homeworkTable');
  table.innerHTML = homeworkData.map(([day, task]) => `
    <tr><th>${day}</th><td contenteditable="true">${task}</td></tr>
  `).join('');
}

function updateHeader() {
  const school = el('schoolName').value.trim() || 'Okul adı';
  const teacher = el('teacherName').value.trim() || 'Öğretmen adı';
  const classLevel = el('classLevel').value;
  const branch = (el('branch').value.trim() || 'C').toUpperCase();
  const weekNo = el('weekNo').value || '40';
  const dateRange = el('dateRange').value.trim();
  const book = el('bookName').value.trim();
  el('schoolDisplay').textContent = school;
  el('teacherDisplay').textContent = teacher;
  el('titleDisplay').textContent = `${classLevel}/${branch} SINIFI ${weekNo}. HAFTA DERS PROGRAMI`;
  el('dateDisplay').textContent = dateRange ? `Tarih: ${dateRange}` : 'Tarih aralığı girilmedi';
  el('bookDisplay').textContent = book;
}

function createPlan() {
  updateHeader();
  applyAllSelectedOutcomes(false);
  buildSchedule();
  buildHomework();
  renderOutcomePicker();
}

function buildOutcomePickerShell() {
  const subjects = getSubjectsFromSchedule();
  activeSubject = subjects.includes(activeSubject) ? activeSubject : subjects[0];

  el('subjectSelect').innerHTML = subjects.map(subject =>
    `<option value="${subject}" ${subject === activeSubject ? 'selected' : ''}>${subject}</option>`
  ).join('');

  el('lessonTabs').innerHTML = subjects.map(subject => {
    const count = selectedOutcomes[subject]?.length || 0;
    return `<button class="lesson-tab ${subject === activeSubject ? 'active' : ''}" data-subject="${subject}">
      <span>${subject}</span><em>${count} seçili</em>
    </button>`;
  }).join('');

  document.querySelectorAll('.lesson-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      activeSubject = btn.dataset.subject;
      el('subjectSelect').value = activeSubject;
      renderOutcomePicker();
    });
  });
}

function renderOutcomePicker() {
  if (!el('subjectSelect')) return;
  buildOutcomePickerShell();
  const query = (el('outcomeSearch').value || '').toLocaleLowerCase('tr-TR');
  const outcomes = outcomesDatabase[activeSubject] || [];
  const filtered = outcomes.filter(item =>
    [item.code, item.topic, item.text].join(' ').toLocaleLowerCase('tr-TR').includes(query)
  );
  const selectedCodes = selectedOutcomes[activeSubject] || [];

  el('outcomeList').innerHTML = filtered.length ? filtered.map(item => `
    <label class="outcome-card">
      <input type="checkbox" value="${item.code}" ${selectedCodes.includes(item.code) ? 'checked' : ''} />
      <span>
        <strong>${item.code}</strong>
        <em>${item.topic}</em>
        <p>${item.text}</p>
      </span>
    </label>
  `).join('') : '<div class="empty-state">Aramaya uygun kazanım bulunamadı.</div>';

  document.querySelectorAll('#outcomeList input[type="checkbox"]').forEach(box => {
    box.addEventListener('change', () => {
      updateSelectedForActiveSubject();
      applySelectedToSubject(activeSubject);
      buildSchedule();
      renderOutcomePicker();
      renderSelectedList();
    });
  });
  renderSelectedList();
}

function updateSelectedForActiveSubject() {
  selectedOutcomes[activeSubject] = Array.from(document.querySelectorAll('#outcomeList input[type="checkbox"]:checked')).map(box => box.value);
}

function getSelectedOutcomeText(subject) {
  const codes = selectedOutcomes[subject] || [];
  const db = outcomesDatabase[subject] || [];
  return codes.map(code => db.find(item => item.code === code)).filter(Boolean)
    .map(item => `${item.code} - ${item.text}`).join('\n');
}

function applySelectedToSubject(subject) {
  const text = getSelectedOutcomeText(subject);
  scheduleData.forEach(row => row.lessons.forEach(lesson => {
    if (lesson.name === subject) lesson.outcome = text;
  }));
}

function applyAllSelectedOutcomes(shouldRebuild = true) {
  Object.keys(selectedOutcomes).forEach(subject => applySelectedToSubject(subject));
  if (shouldRebuild) buildSchedule();
}

function renderSelectedList() {
  const selectedEntries = [];
  Object.entries(selectedOutcomes).forEach(([subject, codes]) => {
    const db = outcomesDatabase[subject] || [];
    codes.forEach(code => {
      const item = db.find(o => o.code === code);
      if (item) selectedEntries.push({ subject, ...item });
    });
  });

  el('outcomeCount').textContent = selectedEntries.length;
  if (!selectedEntries.length) {
    el('selectedList').className = 'selected-list empty';
    el('selectedList').textContent = 'Henüz kazanım seçilmedi.';
    return;
  }
  el('selectedList').className = 'selected-list';
  el('selectedList').innerHTML = selectedEntries.map(item => `
    <div class="selected-item">
      <strong>${item.subject}</strong>
      <span>${item.code}</span>
      <p>${item.text}</p>
    </div>
  `).join('');
}

function clearOutcomes() {
  selectedOutcomes = {};
  getSubjectsFromSchedule().forEach(subject => applySelectedToSubject(subject));
  buildSchedule();
  renderOutcomePicker();
  renderSelectedList();
}

function collectState() {
  return {
    schoolName: el('schoolName').value,
    teacherName: el('teacherName').value,
    classLevel: el('classLevel').value,
    branch: el('branch').value,
    weekNo: el('weekNo').value,
    dateRange: el('dateRange').value,
    bookName: el('bookName').value,
    selectedOutcomes,
    createdAt: new Date().toISOString(),
    htmlPreview: el('printArea').innerHTML
  };
}

function saveDraft() {
  localStorage.setItem(draftStorageKey, JSON.stringify(collectState()));
  alert('Taslak bu tarayıcıya kaydedildi. Kazanım seçimleri de korunur.');
}

function loadDraft() {
  const raw = localStorage.getItem(draftStorageKey);
  if (!raw) return;
  try {
    const draft = JSON.parse(raw);
    ['schoolName','teacherName','classLevel','branch','weekNo','dateRange','bookName'].forEach(id => {
      if (draft[id] !== undefined && el(id)) el(id).value = draft[id];
    });
    selectedOutcomes = draft.selectedOutcomes || {};
  } catch (e) {}
}

function exportJson() {
  updateHeader();
  const blob = new Blob([JSON.stringify(collectState(), null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'dersplanim-plan-verisi.json';
  a.click();
  URL.revokeObjectURL(url);
}

el('createPlan').addEventListener('click', createPlan);
el('saveDraft').addEventListener('click', saveDraft);
el('exportJson').addEventListener('click', exportJson);
el('printPdf').addEventListener('click', () => { updateHeader(); applyAllSelectedOutcomes(); window.print(); });
el('printPdfTop').addEventListener('click', () => { updateHeader(); applyAllSelectedOutcomes(); window.print(); });
el('subjectSelect').addEventListener('change', (event) => { activeSubject = event.target.value; renderOutcomePicker(); });
el('outcomeSearch').addEventListener('input', renderOutcomePicker);
el('clearOutcomes').addEventListener('click', clearOutcomes);
document.querySelectorAll('input, select').forEach(item => item.addEventListener('input', updateHeader));

populateDateRanges();
loadDraft();
createPlan();
