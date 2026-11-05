const state = {
  promptId: null,
  objects: [],
  lenses: {},
  strengths: {},
  challengeIdeas: {},
  notes: loadNotes()
};

const els = {
  promptSelect: document.querySelector('#promptSelect'),
  promptDisplay: document.querySelector('#promptDisplay'),
  randomPromptButton: document.querySelector('#randomPromptButton'),
  generateButton: document.querySelector('#generateButton'),
  resetButton: document.querySelector('#resetButton'),
  objectGrid: document.querySelector('#objectGrid'),
  challengeLevels: document.querySelector('#challengeLevels'),
  planningBoard: document.querySelector('#planningBoard'),
  generationStatus: document.querySelector('#generationStatus'),
  printButton: document.querySelector('#printButton')
};

function enabledItems(items) {
  return items.filter(item => item.enabled !== false);
}

function sample(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function init() {
  const prompts = enabledItems(TOK_PROMPTS);
  els.promptSelect.innerHTML = prompts.map(p =>
    `<option value="${p.id}">Prompt ${p.number}: ${escapeHtml(p.text)}</option>`
  ).join('');
  state.promptId = prompts[0]?.id ?? null;
  els.promptSelect.value = state.promptId;
  renderPrompt();
  renderChallenges();
  renderPlanningBoard();
  bindEvents();
}

function bindEvents() {
  els.promptSelect.addEventListener('change', () => {
    state.promptId = els.promptSelect.value;
    renderPrompt();
    saveSession();
  });
  els.randomPromptButton.addEventListener('click', chooseRandomPrompt);
  els.generateButton.addEventListener('click', generateSet);
  els.resetButton.addEventListener('click', resetSession);
  els.printButton.addEventListener('click', () => window.print());
}

function currentPrompt() {
  return TOK_PROMPTS.find(p => p.id === state.promptId);
}

function renderPrompt() {
  const prompt = currentPrompt();
  els.promptDisplay.textContent = prompt ? `“${prompt.text}”` : 'Add an enabled prompt in data/prompts.js.';
}

function chooseRandomPrompt() {
  const prompt = sample(enabledItems(TOK_PROMPTS));
  if (!prompt) return;
  state.promptId = prompt.id;
  els.promptSelect.value = prompt.id;
  renderPrompt();
  generateSet();
}

function generateSet() {
  const pool = enabledItems(TOK_OBJECTS);
  if (pool.length < 3) {
    els.generationStatus.textContent = 'Enable at least three objects in data/objects.js.';
    return;
  }

  const prompt = currentPrompt();
  const matched = pool.filter(object => object.promptMatches.includes(prompt?.number));
  const source = matched.length >= 3 ? matched : pool;
  state.objects = chooseContrastingObjects(source, 3);
  state.lenses = {};
  state.strengths = {};
  els.generationStatus.textContent = matched.length >= 3
    ? 'Generated from objects tagged for this prompt.'
    : 'Generated from the wider approved library.';
  renderObjects();
  renderPlanningBoard();
  saveSession();
}

function chooseContrastingObjects(pool, count) {
  const chosen = [];
  const candidates = shuffle(pool);

  while (chosen.length < count && candidates.length) {
    let bestIndex = 0;
    let bestScore = -1;
    candidates.forEach((candidate, index) => {
      const score = diversityScore(candidate, chosen);
      if (score > bestScore) {
        bestScore = score;
        bestIndex = index;
      }
    });
    chosen.push(candidates.splice(bestIndex, 1)[0]);
  }
  return chosen;
}

function diversityScore(candidate, chosen) {
  if (!chosen.length) return Math.random();
  return chosen.reduce((score, item) => {
    if (candidate.category !== item.category) score += 3;
    if (candidate.contextType !== item.contextType) score += 3;
    if (!candidate.themes.some(theme => item.themes.includes(theme))) score += 1;
    return score;
  }, 0) + Math.random();
}

function renderObjects() {
  if (!state.objects.length) return;
  els.objectGrid.innerHTML = state.objects.map((object, index) => objectCard(object, index)).join('');

  state.objects.forEach((object, index) => {
    document.querySelector(`#reroll-${index}`).addEventListener('click', () => rerollObject(index));
    document.querySelector(`#lens-${index}`).addEventListener('click', () => newLens(index));
    document.querySelectorAll(`[data-strength-index="${index}"]`).forEach(button => {
      button.addEventListener('click', () => setStrength(index, button.dataset.value));
    });
  });
}

function objectCard(object, index) {
  const lens = state.lenses[index];
  const selected = state.strengths[index];
  const strengths = [
    ['Weak', '🔴'], ['Possible', '🟠'], ['Strong', '🟢'], ['Unexpected but defensible', '🔥']
  ];
  return `
    <article class="object-card">
      <div class="badge-row">
        <span class="badge">${escapeHtml(object.contextType)}</span>
        <span class="badge">${escapeHtml(object.category)}</span>
      </div>
      <h3>${index + 1}. ${escapeHtml(object.name)}</h3>
      <p class="object-description">${escapeHtml(object.shortDescription)}</p>
      <p class="object-warning"><strong>Inspiration only:</strong> replace this with a specific object and real context.</p>
      <div class="card-actions">
        <button id="lens-${index}" class="button button-primary button-small" type="button">${lens ? 'Another lens' : 'Explore this object'}</button>
        <button id="reroll-${index}" class="button button-secondary button-small" type="button">Reroll object</button>
      </div>
      <div class="lens-box" aria-live="polite">
        ${lens ? `<h4>${escapeHtml(lens.icon)} ${escapeHtml(lens.name)}</h4><p>${escapeHtml(lens.question)}</p><p><strong>Push further:</strong> ${escapeHtml(lens.followUp)}</p>` : '<p>Select <strong>Explore this object</strong> to apply a TOK thinking lens.</p>'}
      </div>
      <div class="strength-group">
        <strong>Connection to the prompt</strong>
        <div class="strength-buttons">
          ${strengths.map(([label, icon]) => `<button type="button" class="strength-button ${selected === label ? 'selected' : ''}" data-strength-index="${index}" data-value="${label}">${icon} ${label}</button>`).join('')}
        </div>
      </div>
    </article>`;
}

function rerollObject(index) {
  const currentIds = new Set(state.objects.map(o => o.id));
  const candidates = enabledItems(TOK_OBJECTS).filter(o => !currentIds.has(o.id));
  if (!candidates.length) {
    els.generationStatus.textContent = 'No unused enabled objects remain.';
    return;
  }
  const replacement = chooseContrastingObjects([...state.objects.filter((_, i) => i !== index), ...candidates], 3)
    .find(o => !currentIds.has(o.id)) || sample(candidates);
  state.objects[index] = replacement;
  delete state.lenses[index];
  delete state.strengths[index];
  renderObjects();
  renderPlanningBoard();
  saveSession();
}

function newLens(index) {
  const object = state.objects[index];
  const eligible = enabledItems(TOK_LENSES).filter(lens =>
    !object.concepts.length || object.concepts.includes(lens.id)
  );
  const pool = eligible.length ? eligible : enabledItems(TOK_LENSES);
  const previous = state.lenses[index];
  const different = previous ? pool.filter(lens => lens.id !== previous.id) : pool;
  state.lenses[index] = sample(different.length ? different : pool);
  renderObjects();
  saveSession();
}

function setStrength(index, value) {
  state.strengths[index] = value;
  renderObjects();
  saveSession();
}

function renderChallenges() {
  els.challengeLevels.innerHTML = enabledItems(TOK_CHALLENGES).map((challenge, index) => {
    const idea = state.challengeIdeas[index];
    return `
    <article class="challenge-card" style="border-top-color:${challenge.colour}">
      <h3>${escapeHtml(challenge.icon)} ${escapeHtml(challenge.level)}</h3>
      <p>${escapeHtml(challenge.instruction)}</p>
      <button class="button button-secondary button-small inspire-button" type="button" data-challenge-index="${index}">Inspire me</button>
      <div class="inspire-box" aria-live="polite">
        ${idea ? `<p><strong>Try thinking about:</strong> ${escapeHtml(idea)}</p>` : '<p>Need a nudge? Get a suggestion without being given the answer.</p>'}
      </div>
    </article>`;
  }).join('');
  document.querySelectorAll('.inspire-button').forEach(button => {
    button.addEventListener('click', () => inspireChallenge(Number(button.dataset.challengeIndex)));
  });
}

function inspireChallenge(index) {
  const challenge = enabledItems(TOK_CHALLENGES)[index];
  if (!challenge || !challenge.inspirations?.length) return;
  const previous = state.challengeIdeas[index];
  const choices = challenge.inspirations.filter(idea => idea !== previous);
  state.challengeIdeas[index] = sample(choices.length ? choices : challenge.inspirations);
  renderChallenges();
}

function renderPlanningBoard() {
  const cards = [0, 1, 2].map(index => {
    const inspiration = state.objects[index]?.name || 'No inspiration object generated yet';
    const note = state.notes[index] || {};
    return `
      <article class="planning-card">
        <h3>Object ${index + 1}</h3>
        <p><strong>Starting inspiration:</strong> ${escapeHtml(inspiration)}</p>
        <label for="specific-${index}">My specific object</label>
        <input id="specific-${index}" data-note="specific" data-index="${index}" value="${escapeAttribute(note.specific || '')}" placeholder="Identify one real, specific object">
        <label for="context-${index}">Real-world context</label>
        <textarea id="context-${index}" data-note="context" data-index="${index}" placeholder="Where, when, by whom and for what purpose?">${escapeHtml(note.context || '')}</textarea>
        <label for="connection-${index}">Connection to the prompt</label>
        <textarea id="connection-${index}" data-note="connection" data-index="${index}" placeholder="What does this object allow you to say about this prompt?">${escapeHtml(note.connection || '')}</textarea>
        <label for="perspective-${index}">Alternative perspective or limitation</label>
        <textarea id="perspective-${index}" data-note="perspective" data-index="${index}" placeholder="How could the connection be challenged?">${escapeHtml(note.perspective || '')}</textarea>
        <label for="justification-${index}">Why this object?</label>
        <textarea id="justification-${index}" data-note="justification" data-index="${index}" placeholder="Why does this particular object deserve a place?">${escapeHtml(note.justification || '')}</textarea>
      </article>`;
  });
  els.planningBoard.innerHTML = cards.join('');
  document.querySelectorAll('[data-note]').forEach(field => field.addEventListener('input', saveNote));
}

function saveNote(event) {
  const index = event.target.dataset.index;
  const key = event.target.dataset.note;
  state.notes[index] = state.notes[index] || {};
  state.notes[index][key] = event.target.value;
  localStorage.setItem('tokExhibitionNotes', JSON.stringify(state.notes));
}

function loadNotes() {
  try { return JSON.parse(localStorage.getItem('tokExhibitionNotes')) || {}; }
  catch { return {}; }
}

function saveSession() {
  const session = {
    promptId: state.promptId,
    objectIds: state.objects.map(o => o.id),
    strengths: state.strengths
  };
  localStorage.setItem('tokExhibitionSession', JSON.stringify(session));
}

function resetSession() {
  localStorage.removeItem('tokExhibitionNotes');
  localStorage.removeItem('tokExhibitionSession');
  state.objects = [];
  state.lenses = {};
  state.strengths = {};
  state.notes = {};
  els.objectGrid.innerHTML = '<div class="empty-state">Choose a prompt and generate a set to begin.</div>';
  els.generationStatus.textContent = '';
  renderPlanningBoard();
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
}
function escapeAttribute(value) { return escapeHtml(value); }

document.addEventListener('DOMContentLoaded', init);
