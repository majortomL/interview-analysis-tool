const state = {
  projects: [],
  project: null,
  transcript: null,
  reviewInterviewId: null,
  analysis: null,
  analysisInterviewId: null,
  transcriptCache: new Map(),
  selection: null,
  jobs: new Map(),
  reviewDirty: false,
  analysisDirty: false,
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const escapeHtml = (value) => {
  const element = document.createElement("div");
  element.textContent = value ?? "";
  return element.innerHTML;
};
const uid = (prefix) => `${prefix}-${globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`}`;

async function api(url, options = {}) {
  const response = await fetch(url, options);
  if (!response.ok) {
    let message = `${response.status} ${response.statusText}`;
    try { message = (await response.json()).error || message; } catch (_) { /* keep status */ }
    throw new Error(message);
  }
  if (response.status === 204) return null;
  return response.json();
}

function toast(message) {
  const element = $("#toast");
  element.textContent = message;
  element.classList.add("show");
  clearTimeout(element._timer);
  element._timer = setTimeout(() => element.classList.remove("show"), 3500);
}

function setStatus(message) { $("#global-status").textContent = message; }

const statusLabels = {
  uploaded: "Importiert",
  queued: "Wartet",
  transcribing: "Transkription läuft",
  needs_review: "Zu überprüfen",
  reviewing: "In Prüfung",
  reviewed: "Geprüft",
  failed: "Fehlgeschlagen",
};

async function init() {
  bindEvents();
  await loadProjects();
}

function bindEvents() {
  $("#new-project-btn").addEventListener("click", openProjectDialog);
  $("#empty-new-project-btn").addEventListener("click", openProjectDialog);
  $("#project-select").addEventListener("change", (event) => selectProject(event.target.value));
  $$(".dialog-close").forEach((button) => button.addEventListener("click", () => $("#project-dialog").close()));
  $("#project-form").addEventListener("submit", createProject);
  $$(".step").forEach((button) => button.addEventListener("click", () => showView(button.dataset.view)));
  $("#save-settings-btn").addEventListener("click", saveSettings);
  $("#audio-files").addEventListener("change", updateUploadLabel);
  $("#upload-btn").addEventListener("click", uploadFiles);
  $("#review-interview").addEventListener("change", async (event) => {
    const nextId = event.target.value;
    if (state.reviewDirty && !confirm("Ungespeicherte Änderungen am Transkript verwerfen?")) {
      event.target.value = state.reviewInterviewId;
      return;
    }
    await loadReview(nextId);
  });
  $("#save-transcript-btn").addEventListener("click", saveTranscript);
  $("#add-segment-btn").addEventListener("click", addSegmentAtPlayhead);
  $("#review-all-btn").addEventListener("click", markAllReviewed);
  $("#save-analysis-btn").addEventListener("click", saveAnalysis);
  $("#analysis-interview").addEventListener("change", (event) => {
    state.analysisInterviewId = event.target.value;
    state.selection = null;
    renderAnalysis();
  });
  $("#research-question").addEventListener("input", (event) => { state.analysis.research_question = event.target.value; markAnalysisDirty(); });
  $("#reflexive-memo").addEventListener("input", (event) => { state.analysis.reflexive_memo = event.target.value; markAnalysisDirty(); });
  $("#new-code-btn").addEventListener("click", () => openCodeDialog());
  $("#new-code-selection-btn").addEventListener("click", () => openCodeDialog(null, true));
  $$(".code-close").forEach((button) => button.addEventListener("click", () => $("#code-dialog").close()));
  $("#code-form").addEventListener("submit", saveCode);
  $("#delete-code-btn").addEventListener("click", deleteCode);
  $("#new-theme-btn").addEventListener("click", () => openThemeDialog());
  $$(".theme-close").forEach((button) => button.addEventListener("click", () => $("#theme-dialog").close()));
  $("#theme-form").addEventListener("submit", saveTheme);
  $("#delete-theme-btn").addEventListener("click", deleteTheme);
  $("#ai-import-btn").addEventListener("click", () => $("#ai-file").click());
  $("#ai-file").addEventListener("change", importAiSuggestions);
  $("#ai-export-link").addEventListener("click", (event) => {
    if (!confirm("Diese Datei enthält die vollständigen geprüften Interviewtexte. Nur bei zulässiger Datenübertragung an externe Dienste weitergeben. Fortfahren?")) event.preventDefault();
  });
  window.addEventListener("beforeunload", (event) => {
    if (!state.analysisDirty && !state.reviewDirty) return;
    event.preventDefault();
    event.returnValue = "";
  });
}

async function loadProjects(preferredId = null) {
  state.projects = await api("/api/projects");
  const select = $("#project-select");
  select.innerHTML = state.projects.map((project) => `<option value="${project.id}">${escapeHtml(project.name)}</option>`).join("");
  const selected = preferredId || state.project?.id || state.projects[0]?.id;
  $("#empty-state").classList.toggle("hidden", state.projects.length > 0);
  $("#app-shell").classList.toggle("hidden", state.projects.length === 0);
  if (selected) {
    select.value = selected;
    await selectProject(selected);
  }
}

function openProjectDialog() {
  $("#new-project-name").value = "";
  $("#project-dialog").showModal();
}

async function createProject(event) {
  event.preventDefault();
  try {
    setStatus("Projekt wird angelegt …");
    const project = await api("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: $("#new-project-name").value, language: $("#new-project-language").value }),
    });
    $("#project-dialog").close();
    await loadProjects(project.id);
    setStatus("Bereit");
  } catch (error) { setStatus("Fehler"); toast(error.message); }
}

async function selectProject(projectId) {
  if ((state.analysisDirty || state.reviewDirty) && !confirm("Ungespeicherte Änderungen verwerfen?")) {
    $("#project-select").value = state.project.id;
    return;
  }
  try {
    setStatus("Lädt …");
    state.project = await api(`/api/projects/${projectId}`);
    state.analysis = await api(`/api/projects/${projectId}/analysis`);
    state.transcript = null;
    state.transcriptCache.clear();
    state.reviewInterviewId = null;
    state.reviewDirty = false;
    state.analysisInterviewId = reviewedInterviews()[0]?.id || null;
    state.analysisDirty = false;
    renderProject();
    await loadFirstReview();
    await preloadReviewedTranscripts();
    renderAnalysis();
    setStatus("Bereit");
  } catch (error) { setStatus("Fehler"); toast(error.message); }
}

function renderProject() {
  $("#project-name").textContent = state.project.name;
  const settings = state.project.settings;
  $("#setting-language").value = settings.language || "auto";
  $("#setting-model").value = settings.model || "small";
  $("#setting-device").value = settings.device || "auto";
  $("#setting-compute").value = settings.compute_type || "auto";
  $("#setting-prompt").value = settings.initial_prompt || "";
  $("#setting-diarize").checked = Boolean(settings.diarize);
  $("#export-link").href = `/api/projects/${state.project.id}/export.zip`;
  $("#export-media-link").href = `/api/projects/${state.project.id}/export.zip?include_media=1`;
  $("#ai-export-link").href = `/api/projects/${state.project.id}/ai-bundle.json`;
  renderInterviewLists();
}

function showView(view) {
  $$(".step").forEach((button) => button.classList.toggle("active", button.dataset.view === view));
  $$(".view").forEach((element) => element.classList.toggle("active", element.id === `${view}-view`));
  if (view === "analyse") renderAnalysis();
}

async function saveSettings() {
  try {
    setStatus("Speichert …");
    state.project = await api(`/api/projects/${state.project.id}/settings`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        language: $("#setting-language").value,
        model: $("#setting-model").value,
        device: $("#setting-device").value,
        compute_type: $("#setting-compute").value,
        initial_prompt: $("#setting-prompt").value,
        diarize: $("#setting-diarize").checked,
      }),
    });
    setStatus("Gespeichert");
    toast("Einstellungen gespeichert.");
  } catch (error) { setStatus("Fehler"); toast(error.message); }
}

function updateUploadLabel() {
  const files = [...$("#audio-files").files];
  const zone = $(".dropzone");
  zone.classList.toggle("has-files", files.length > 0);
  zone.querySelector("strong").textContent = files.length ? `${files.length} Datei${files.length === 1 ? "" : "en"} ausgewählt` : "Audiodateien auswählen";
}

async function uploadFiles() {
  const files = [...$("#audio-files").files];
  if (!files.length) return toast("Wähle zuerst mindestens eine Audiodatei aus.");
  const form = new FormData();
  files.forEach((file) => form.append("audio", file));
  try {
    $("#upload-btn").disabled = true;
    setStatus("Importiert …");
    await api(`/api/projects/${state.project.id}/interviews`, { method: "POST", body: form });
    $("#audio-files").value = "";
    updateUploadLabel();
    await refreshProject();
    setStatus("Bereit");
    toast("Audiodateien importiert.");
    showView("transcribe");
  } catch (error) { setStatus("Fehler"); toast(error.message); }
  finally { $("#upload-btn").disabled = false; }
}

async function refreshProject() {
  state.project = await api(`/api/projects/${state.project.id}`);
  renderProject();
}

function renderInterviewLists() {
  const interviews = state.project.interviews || [];
  const card = (interview) => `<article class="interview-card"><strong title="${escapeHtml(interview.source_filename)}">${escapeHtml(interview.name)}</strong><span class="status ${interview.status}">${statusLabels[interview.status] || escapeHtml(interview.status)}</span><small>${interview.duration_seconds ? `${(interview.duration_seconds / 60).toFixed(1)} min` : "Noch keine Dauer"}</small>${interview.error ? `<small>${escapeHtml(interview.error)}</small>` : ""}</article>`;
  $("#imported-list").innerHTML = interviews.map(card).join("") || '<p class="muted">Noch keine Interviews importiert.</p>';
  renderTranscriptionList();

  const reviewable = interviews.filter((item) => ["needs_review", "reviewing", "reviewed"].includes(item.status));
  $("#review-interview").innerHTML = reviewable.map((item) => `<option value="${item.id}">${escapeHtml(item.name)}</option>`).join("");
  const reviewed = reviewedInterviews();
  $("#analysis-interview").innerHTML = reviewed.map((item) => `<option value="${item.id}">${escapeHtml(item.name)}</option>`).join("");
  if (state.reviewInterviewId) $("#review-interview").value = state.reviewInterviewId;
  if (state.analysisInterviewId) $("#analysis-interview").value = state.analysisInterviewId;
}

function renderTranscriptionList() {
  const interviews = state.project.interviews || [];
  $("#transcription-list").innerHTML = interviews.map((interview) => {
    const job = [...state.jobs.values()].find((item) => item.interview_id === interview.id && ["queued", "running"].includes(item.status));
    const percent = job?.percent || (interview.status === "reviewed" || interview.status === "needs_review" ? 100 : 0);
    const canStart = !job && !["queued", "transcribing"].includes(interview.status);
    return `<article class="panel job-card"><div><h3>${escapeHtml(interview.name)}</h3><p>${escapeHtml(job?.message || interview.error || statusLabels[interview.status] || interview.status)}</p><div class="progress-track"><div class="progress-fill" style="width:${percent}%"></div></div></div><button class="transcribe-btn" data-id="${interview.id}" ${canStart ? "" : "disabled"}>${["needs_review", "reviewed", "reviewing"].includes(interview.status) ? "Neu transkribieren" : "Transkribieren"}</button></article>`;
  }).join("") || '<div class="notice">Importiere zuerst Audiodateien.</div>';
  $$(".transcribe-btn").forEach((button) => button.addEventListener("click", () => startTranscription(button.dataset.id)));
}

async function startTranscription(interviewId) {
  try {
    if (state.reviewDirty && interviewId === state.reviewInterviewId) {
      return toast("Speichere oder verwirf zuerst die offenen Transkriptänderungen.");
    }
    const interview = state.project.interviews.find((item) => item.id === interviewId);
    if (["needs_review", "reviewing", "reviewed"].includes(interview?.status) && !confirm("Die vorhandene Transkription wird versioniert gesichert und anschließend ersetzt. Fortfahren?")) return;
    const job = await api(`/api/projects/${state.project.id}/interviews/${interviewId}/transcribe`, { method: "POST" });
    state.jobs.set(job.id, job);
    renderTranscriptionList();
    pollJob(job.id);
  } catch (error) { toast(error.message); }
}

async function pollJob(jobId) {
  try {
    const job = await api(`/api/jobs/${jobId}`);
    state.jobs.set(jobId, job);
    renderTranscriptionList();
    if (["queued", "running"].includes(job.status)) {
      setTimeout(() => pollJob(jobId), 1000);
      return;
    }
    await refreshProject();
    await loadFirstReview();
    toast(job.status === "done" ? "Transkription abgeschlossen." : job.error || "Transkription fehlgeschlagen.");
  } catch (error) { toast(error.message); }
}

async function loadFirstReview() {
  const reviewable = (state.project.interviews || []).filter((item) => ["needs_review", "reviewing", "reviewed"].includes(item.status));
  const preferred = reviewable.some((item) => item.id === state.reviewInterviewId) ? state.reviewInterviewId : reviewable[0]?.id;
  $("#review-empty").classList.toggle("hidden", Boolean(preferred));
  $("#review-workspace").classList.toggle("hidden", !preferred);
  if (state.reviewDirty && preferred === state.reviewInterviewId) return;
  if (preferred) await loadReview(preferred);
}

async function loadReview(interviewId) {
  if (!interviewId) return;
  try {
    setStatus("Transkript lädt …");
    state.reviewInterviewId = interviewId;
    state.transcript = await api(`/api/projects/${state.project.id}/interviews/${interviewId}/transcript`);
    state.reviewDirty = false;
    state.transcriptCache.set(interviewId, state.transcript);
    $("#review-interview").value = interviewId;
    $("#audio-player").src = `/api/projects/${state.project.id}/interviews/${interviewId}/audio`;
    renderReview();
    setStatus("Bereit");
  } catch (error) { setStatus("Fehler"); toast(error.message); }
}

function formatTime(value) {
  const seconds = Number(value) || 0;
  return `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;
}

function renderReview() {
  const segments = state.transcript?.segments || [];
  const active = segments.filter((segment) => !segment.deleted);
  const reviewed = active.filter((segment) => segment.reviewed && segment.speaker).length;
  $("#review-progress").textContent = `${reviewed}/${active.length} vollständig geprüft`;
  $("#segment-list").innerHTML = segments.map((segment, index) => segment.deleted ? "" : `
    <article class="segment" data-index="${index}">
      <div class="segment-time"><time data-seek="${segment.start}" title="Audio ab dieser Stelle abspielen">${formatTime(segment.start)}–${formatTime(segment.end)}</time><div class="time-inputs"><input type="number" min="0" step="0.1" value="${segment.start}" data-time="start" data-index="${index}" aria-label="Startzeit"><input type="number" min="0" step="0.1" value="${segment.end}" data-time="end" data-index="${index}" aria-label="Endzeit"></div></div>
      <div><textarea data-field="text" data-index="${index}" aria-label="Transkripttext">${escapeHtml(segment.text)}</textarea>${segment.diarization_speaker ? `<p class="muted">Diarisierung: ${escapeHtml(segment.diarization_speaker)}</p>` : ""}${segment.asr_text && segment.asr_text !== segment.text ? `<details><summary>ASR-Original anzeigen</summary><p>${escapeHtml(segment.asr_text)}</p></details>` : ""}</div>
      <div class="speaker-buttons">
        <button type="button" data-speaker="interviewer" data-index="${index}" class="${segment.speaker === "interviewer" ? "selected" : ""}">Interviewer:in</button>
        <button type="button" data-speaker="interviewee" data-index="${index}" class="${segment.speaker === "interviewee" ? "selected" : ""}">Interviewte Person</button>
        <button type="button" data-speaker="other" data-index="${index}" class="${segment.speaker === "other" ? "selected" : ""}">Andere Rolle</button>
        <button type="button" data-add-after="${index}" class="ghost">+ danach</button>
        <button type="button" data-delete="${index}" class="danger">Löschen</button>
      </div>
      <label class="review-check"><input type="checkbox" data-reviewed="${index}" ${segment.reviewed ? "checked" : ""}> geprüft</label>
    </article>`).join("");
  $$("[data-seek]").forEach((element) => element.addEventListener("click", () => {
    $("#audio-player").currentTime = Number(element.dataset.seek);
    $("#audio-player").play();
  }));
  $$("textarea[data-field='text']").forEach((element) => element.addEventListener("input", () => {
    state.transcript.segments[Number(element.dataset.index)].text = element.value;
    markReviewDirty();
  }));
  $$("input[data-time]").forEach((element) => element.addEventListener("change", () => {
    const segment = state.transcript.segments[Number(element.dataset.index)];
    const value = Number(element.value);
    if (!Number.isFinite(value) || value < 0) return renderReview();
    segment[element.dataset.time] = value;
    if (segment.end < segment.start) segment.end = segment.start;
    markReviewDirty();
    renderReview();
  }));
  $$("button[data-speaker]").forEach((button) => button.addEventListener("click", () => {
    state.transcript.segments[Number(button.dataset.index)].speaker = button.dataset.speaker;
    markReviewDirty();
    renderReview();
  }));
  $$("input[data-reviewed]").forEach((input) => input.addEventListener("change", () => {
    state.transcript.segments[Number(input.dataset.reviewed)].reviewed = input.checked;
    markReviewDirty();
    renderReview();
  }));
  $$("button[data-delete]").forEach((button) => button.addEventListener("click", () => {
    state.transcript.segments[Number(button.dataset.delete)].deleted = true;
    markReviewDirty();
    renderReview();
  }));
  $$("button[data-add-after]").forEach((button) => button.addEventListener("click", () => addSegmentAfter(Number(button.dataset.addAfter))));
}

function newSegment(start, end) {
  return { id: uid("segment"), start: Number(start.toFixed(3)), end: Number(end.toFixed(3)), text: "", asr_text: "", avg_logprob: null, no_speech_prob: null, speaker: null, reviewed: false, deleted: false };
}

function addSegmentAtPlayhead() {
  if (!state.transcript) return;
  const player = $("#audio-player"), start = Number.isFinite(player.currentTime) ? player.currentTime : 0;
  const index = state.transcript.segments.findIndex((segment) => !segment.deleted && segment.start > start);
  const insertion = index < 0 ? state.transcript.segments.length : index;
  const nextStart = index < 0 ? (Number.isFinite(player.duration) ? player.duration : start + 5) : state.transcript.segments[index].start;
  state.transcript.segments.splice(insertion, 0, newSegment(start, Math.min(start + 5, nextStart)));
  markReviewDirty();
  renderReview();
}

function addSegmentAfter(index) {
  const current = state.transcript.segments[index];
  const next = state.transcript.segments.slice(index + 1).find((segment) => !segment.deleted);
  const duration = Number.isFinite($("#audio-player").duration) ? $("#audio-player").duration : current.end + 5;
  state.transcript.segments.splice(index + 1, 0, newSegment(current.end, Math.min(current.end + 5, next?.start ?? duration)));
  markReviewDirty();
  renderReview();
}

function markAllReviewed() {
  if (!state.transcript) return;
  const missing = state.transcript.segments.filter((segment) => !segment.deleted && !segment.speaker).length;
  if (missing) return toast(`${missing} Segment${missing === 1 ? " benötigt" : "e benötigen"} zuerst eine Sprecherrolle.`);
  state.transcript.segments.filter((segment) => !segment.deleted).forEach((segment) => { segment.reviewed = true; });
  markReviewDirty();
  renderReview();
}

function markReviewDirty() {
  state.reviewDirty = true;
  setStatus("Ungespeicherte Transkriptänderungen");
}

async function saveTranscript() {
  if (!state.transcript) return;
  try {
    setStatus("Speichert …");
    state.transcript = await api(`/api/projects/${state.project.id}/interviews/${state.reviewInterviewId}/transcript`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ revision: state.transcript.revision, segments: state.transcript.segments }),
    });
    state.transcriptCache.set(state.reviewInterviewId, state.transcript);
    state.reviewDirty = false;
    await refreshProject();
    await preloadReviewedTranscripts();
    setStatus("Gespeichert");
    toast("Transkript sicher gespeichert.");
  } catch (error) { setStatus("Fehler"); toast(error.message); }
}

function reviewedInterviews() {
  return (state.project?.interviews || []).filter((item) => item.status === "reviewed");
}

async function preloadReviewedTranscripts() {
  await Promise.all(reviewedInterviews().map(async (interview) => {
    if (!state.transcriptCache.has(interview.id)) {
      state.transcriptCache.set(interview.id, await api(`/api/projects/${state.project.id}/interviews/${interview.id}/transcript`));
    }
  }));
}

function segmentById(interviewId, segmentId) {
  return state.transcriptCache.get(interviewId)?.segments.find((segment) => segment.id === segmentId);
}

function codeById(codeId) { return state.analysis.codes.find((code) => code.id === codeId); }
function themeById(themeId) { return state.analysis.themes.find((theme) => theme.id === themeId); }

function renderAnalysis() {
  if (!state.analysis) return;
  const reviewed = reviewedInterviews();
  if (!reviewed.some((item) => item.id === state.analysisInterviewId)) state.analysisInterviewId = reviewed[0]?.id || null;
  $("#analysis-interview").innerHTML = reviewed.map((item) => `<option value="${item.id}">${escapeHtml(item.name)}</option>`).join("");
  $("#analysis-interview").value = state.analysisInterviewId || "";
  $("#research-question").value = state.analysis.research_question || "";
  $("#reflexive-memo").value = state.analysis.reflexive_memo || "";
  const warning = $("#analysis-warning");
  warning.classList.toggle("hidden", reviewed.length > 0);
  warning.textContent = "Schließe zuerst die vollständige Prüfung eines Interviews ab.";
  const transcript = state.transcriptCache.get(state.analysisInterviewId);
  const segments = (transcript?.segments || []).filter((segment) => segment.reviewed && !segment.deleted && segment.text.trim());
  $("#analysis-segments").innerHTML = segments.map(analysisSegmentHtml).join("") || '<p class="muted">Kein vollständig geprüftes Material verfügbar.</p>';
  $$(".segment-text").forEach((element) => element.addEventListener("mouseup", () => captureSelection(element)));
  $$("button[data-remove-coding]").forEach((button) => button.addEventListener("click", () => removeCoding(button.dataset.removeCoding)));
  renderSelectionBox();
  renderCodebook();
  renderThemes();
  renderSuggestions();
}

function analysisSegmentHtml(segment) {
  const codings = state.analysis.codings.filter((coding) => coding.interview_id === state.analysisInterviewId && coding.segment_id === segment.id);
  const label = segment.speaker === "interviewer" ? "Interviewer:in" : segment.speaker === "interviewee" ? "Interviewte Person" : "Andere Rolle";
  return `<article class="analysis-segment ${segment.speaker}"><div class="segment-meta">${label} · ${formatTime(segment.start)}–${formatTime(segment.end)}</div><div class="segment-text" data-segment="${segment.id}">${annotatedText(segment.text, codings)}</div><div class="coding-row">${codings.map((coding) => { const code = codeById(coding.code_id); return code ? `<button class="coding-chip" data-remove-coding="${coding.id}" style="--chip:${code.color}" title="Codierung entfernen">${escapeHtml(code.name)} ×</button>` : ""; }).join("")}</div></article>`;
}

function annotatedText(text, codings) {
  const boundaries = new Set([0, text.length]);
  codings.forEach((coding) => { boundaries.add(Math.max(0, coding.start)); boundaries.add(Math.min(text.length, coding.end)); });
  const points = [...boundaries].sort((a, b) => a - b);
  let html = "";
  for (let index = 0; index < points.length - 1; index += 1) {
    const start = points[index], end = points[index + 1], slice = escapeHtml(text.slice(start, end));
    const active = codings.filter((coding) => coding.start < end && coding.end > start);
    if (!active.length) { html += slice; continue; }
    const names = active.map((coding) => codeById(coding.code_id)?.name).filter(Boolean);
    const color = codeById(active[0].code_id)?.color || "#e8ca82";
    html += `<mark style="--mark:${color}55" title="${escapeHtml(names.join(", "))}">${slice}</mark>`;
  }
  return html;
}

function captureSelection(element) {
  const selection = window.getSelection();
  if (!selection || selection.isCollapsed || !element.contains(selection.anchorNode) || !element.contains(selection.focusNode)) return;
  const range = selection.getRangeAt(0);
  const prefix = range.cloneRange();
  prefix.selectNodeContents(element);
  prefix.setEnd(range.startContainer, range.startOffset);
  const quote = range.toString();
  if (!quote.trim()) return;
  const start = prefix.toString().length;
  state.selection = { interview_id: state.analysisInterviewId, segment_id: element.dataset.segment, start, end: start + quote.length, quote };
  renderSelectionBox();
}

function renderSelectionBox() {
  $("#selection-box").classList.toggle("hidden", !state.selection);
  if (!state.selection) return;
  $("#selection-text").textContent = state.selection.quote.trim();
  $("#selection-codes").innerHTML = state.analysis.codes.map((code) => `<button type="button" data-apply-code="${code.id}" style="border-left:4px solid ${code.color}">${escapeHtml(code.name)}</button>`).join("");
  $$("button[data-apply-code]").forEach((button) => button.addEventListener("click", () => applyCode(button.dataset.applyCode)));
}

function applyCode(codeId) {
  if (!state.selection) return;
  const duplicate = state.analysis.codings.some((coding) => coding.interview_id === state.selection.interview_id && coding.segment_id === state.selection.segment_id && coding.start === state.selection.start && coding.end === state.selection.end && coding.code_id === codeId);
  if (!duplicate) state.analysis.codings.push({ id: uid("coding"), ...state.selection, code_id: codeId, origin: "manual", created_at: new Date().toISOString() });
  state.selection = null;
  window.getSelection()?.removeAllRanges();
  markAnalysisDirty();
  renderAnalysis();
}

function removeCoding(codingId) {
  state.analysis.codings = state.analysis.codings.filter((coding) => coding.id !== codingId);
  markAnalysisDirty();
  renderAnalysis();
}

function markAnalysisDirty() {
  state.analysisDirty = true;
  setStatus("Analyse ungespeichert");
}

async function saveAnalysis() {
  try {
    setStatus("Speichert …");
    state.analysis = await api(`/api/projects/${state.project.id}/analysis`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(state.analysis),
    });
    state.analysisDirty = false;
    setStatus("Gespeichert");
    toast("Analyse sicher gespeichert.");
  } catch (error) { setStatus("Fehler"); toast(error.message); }
}

function renderCodebook() {
  $("#code-list").innerHTML = state.analysis.codes.map((code) => {
    const count = state.analysis.codings.filter((coding) => coding.code_id === code.id).length;
    return `<button class="stack-item" data-edit-code="${code.id}" style="border-left:4px solid ${code.color}"><strong>${escapeHtml(code.name)}</strong><small>${count} Fundstelle${count === 1 ? "" : "n"}${code.origin === "ai" ? " · KI" : ""}</small></button>`;
  }).join("") || '<p class="muted">Markiere eine Passage oder lege einen Code an.</p>';
  $$("[data-edit-code]").forEach((button) => button.addEventListener("click", () => openCodeDialog(button.dataset.editCode)));
}

function openCodeDialog(codeId = null, applyAfter = false) {
  const code = codeById(codeId);
  $("#code-id").value = code?.id || "";
  $("#code-name").value = code?.name || "";
  $("#code-description").value = code?.description || "";
  $("#code-color").value = code?.color || ["#7357c6", "#3f86a8", "#c26a54", "#5b9279"][state.analysis.codes.length % 4];
  $("#code-dialog-title").textContent = code ? "Code bearbeiten" : "Neuer Code";
  $("#delete-code-btn").classList.toggle("hidden", !code);
  $("#code-form").dataset.applyAfter = applyAfter ? "true" : "false";
  $("#code-dialog").showModal();
}

function saveCode(event) {
  event.preventDefault();
  const id = $("#code-id").value || uid("code");
  const existing = codeById(id);
  const code = { id, name: $("#code-name").value.trim(), description: $("#code-description").value.trim(), color: $("#code-color").value, origin: existing?.origin || "manual" };
  if (existing) Object.assign(existing, code); else state.analysis.codes.push(code);
  const applyAfter = $("#code-form").dataset.applyAfter === "true";
  $("#code-dialog").close();
  markAnalysisDirty();
  if (applyAfter && state.selection) applyCode(id); else renderAnalysis();
}

function deleteCode() {
  const id = $("#code-id").value;
  if (!id || !confirm("Code und alle zugehörigen Codierungen löschen?")) return;
  state.analysis.codes = state.analysis.codes.filter((code) => code.id !== id);
  state.analysis.codings = state.analysis.codings.filter((coding) => coding.code_id !== id);
  state.analysis.suggestions = state.analysis.suggestions.filter((suggestion) => suggestion.code_id !== id);
  state.analysis.themes.forEach((theme) => { theme.code_ids = (theme.code_ids || []).filter((codeId) => codeId !== id); });
  $("#code-dialog").close();
  markAnalysisDirty();
  renderAnalysis();
}

function renderThemes() {
  $("#theme-list").innerHTML = state.analysis.themes.map((theme) => `<button class="stack-item" data-edit-theme="${theme.id}"><strong>${escapeHtml(theme.name)}</strong><small>${(theme.code_ids || []).length} Codes</small></button>`).join("") || '<p class="muted">Noch keine Kandidatenthemen.</p>';
  $$("[data-edit-theme]").forEach((button) => button.addEventListener("click", () => openThemeDialog(button.dataset.editTheme)));
}

function openThemeDialog(themeId = null) {
  const theme = themeById(themeId);
  $("#theme-id").value = theme?.id || "";
  $("#theme-name").value = theme?.name || "";
  $("#theme-description").value = theme?.description || "";
  $("#theme-dialog-title").textContent = theme ? "Thema bearbeiten" : "Neues Thema";
  $("#delete-theme-btn").classList.toggle("hidden", !theme);
  const selected = new Set(theme?.code_ids || []);
  $("#theme-code-options").innerHTML = state.analysis.codes.map((code) => `<label><input type="checkbox" value="${code.id}" ${selected.has(code.id) ? "checked" : ""}> <span>${escapeHtml(code.name)}</span></label>`).join("") || '<p class="muted">Lege zuerst Codes an.</p>';
  $("#theme-dialog").showModal();
}

function saveTheme(event) {
  event.preventDefault();
  const id = $("#theme-id").value || uid("theme");
  const existing = themeById(id);
  const theme = { id, name: $("#theme-name").value.trim(), description: $("#theme-description").value.trim(), parent_id: null, code_ids: $$("#theme-code-options input:checked").map((input) => input.value) };
  if (existing) Object.assign(existing, theme); else state.analysis.themes.push(theme);
  $("#theme-dialog").close();
  markAnalysisDirty();
  renderAnalysis();
}

function deleteTheme() {
  const id = $("#theme-id").value;
  if (!id || !confirm("Thema löschen? Die Codes bleiben erhalten.")) return;
  state.analysis.themes = state.analysis.themes.filter((theme) => theme.id !== id);
  $("#theme-dialog").close();
  markAnalysisDirty();
  renderAnalysis();
}

async function importAiSuggestions(event) {
  const file = event.target.files[0];
  if (!file) return;
  try {
    const payload = JSON.parse(await file.text());
    if (!Array.isArray(payload.codes) || !Array.isArray(payload.codings)) throw new Error("Erwartet werden die Arrays 'codes' und 'codings'.");
    await preloadReviewedTranscripts();
    const codeMap = new Map();
    payload.codes.forEach((incoming) => {
      const name = String(incoming.name || "").trim();
      if (!name) return;
      let code = state.analysis.codes.find((item) => item.name.toLowerCase() === name.toLowerCase());
      if (!code) {
        const color = /^#[0-9a-f]{6}$/i.test(incoming.color) ? incoming.color : "#6874b8";
        code = { id: uid("code"), name, description: String(incoming.description || ""), color, origin: "ai" };
        state.analysis.codes.push(code);
      }
      codeMap.set(name.toLowerCase(), code.id);
    });
    (payload.themes || []).forEach((incoming) => {
      const name = String(incoming.name || "").trim();
      if (!name) return;
      let theme = state.analysis.themes.find((item) => item.name.toLowerCase() === name.toLowerCase());
      if (!theme) {
        theme = { id: uid("theme"), name, description: String(incoming.description || ""), parent_id: null, code_ids: [] };
        state.analysis.themes.push(theme);
      }
      theme.code_ids = [...new Set([...(theme.code_ids || []), ...(incoming.code_names || []).map((item) => codeMap.get(String(item).toLowerCase())).filter(Boolean)])];
    });
    let imported = 0, skipped = 0;
    payload.codings.forEach((incoming) => {
      const interviewId = String(incoming.interview_id || ""), segmentId = String(incoming.segment_id || "");
      const segment = segmentById(interviewId, segmentId), quote = String(incoming.quote || "");
      const start = segment?.text.indexOf(quote) ?? -1;
      if (!segment || !quote || start < 0 || segment.text.lastIndexOf(quote) !== start) { skipped += 1; return; }
      (incoming.code_names || []).forEach((name) => {
        const codeId = codeMap.get(String(name).toLowerCase());
        if (!codeId) return;
        state.analysis.suggestions.push({ id: uid("suggestion"), interview_id: interviewId, segment_id: segmentId, start, end: start + quote.length, quote, code_id: codeId, rationale: String(incoming.rationale || ""), created_at: new Date().toISOString() });
        imported += 1;
      });
    });
    markAnalysisDirty();
    renderAnalysis();
    toast(`${imported} Vorschläge importiert${skipped ? `; ${skipped} nicht eindeutig zuordenbar` : ""}.`);
  } catch (error) { toast(`Import fehlgeschlagen: ${error.message}`); }
  finally { event.target.value = ""; }
}

function renderSuggestions() {
  const suggestions = state.analysis.suggestions || [];
  $("#suggestion-panel").classList.toggle("hidden", suggestions.length === 0);
  $("#suggestion-count").textContent = suggestions.length;
  $("#suggestion-list").innerHTML = suggestions.map((suggestion) => {
    const code = codeById(suggestion.code_id);
    return `<div class="stack-item"><strong>${escapeHtml(code?.name || "Unbekannter Code")}</strong><small>„${escapeHtml(suggestion.quote.trim())}“</small>${suggestion.rationale ? `<small>${escapeHtml(suggestion.rationale)}</small>` : ""}<div class="suggestion-actions"><button type="button" data-accept-suggestion="${suggestion.id}">Annehmen</button><button type="button" class="ghost" data-reject-suggestion="${suggestion.id}">Verwerfen</button></div></div>`;
  }).join("");
  $$("[data-accept-suggestion]").forEach((button) => button.addEventListener("click", () => resolveSuggestion(button.dataset.acceptSuggestion, true)));
  $$("[data-reject-suggestion]").forEach((button) => button.addEventListener("click", () => resolveSuggestion(button.dataset.rejectSuggestion, false)));
}

function resolveSuggestion(id, accept) {
  const suggestion = state.analysis.suggestions.find((item) => item.id === id);
  if (accept && suggestion) {
    const { rationale, ...coding } = suggestion;
    state.analysis.codings.push({ ...coding, id: uid("coding"), origin: "ai-reviewed", rationale });
  }
  state.analysis.suggestions = state.analysis.suggestions.filter((item) => item.id !== id);
  markAnalysisDirty();
  renderAnalysis();
}

init().catch((error) => {
  setStatus("Startfehler");
  toast(error.message);
});
