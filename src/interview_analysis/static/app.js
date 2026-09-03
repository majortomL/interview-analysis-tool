const translations = {
  de: {
    home: "Startseite", choose_language: "Sprache wählen", brand_tagline: "lokal · nachvollziehbar · offen",
    project: "Projekt", new_project: "Neues Projekt", ready: "Bereit", welcome: "Willkommen",
    hero_title: "Vom Audio zur nachvollziehbaren thematischen Analyse",
    hero_body: "Alle Daten bleiben standardmäßig auf diesem Rechner. Lege dein erstes Projekt an, importiere Interviews und arbeite die vier Schritte nacheinander ab.",
    create_project: "Projekt anlegen", current_project: "Aktuelles Projekt", import: "Importieren",
    project_and_audio: "Projekt und Audios", transcribe: "Transkribieren", local_asr: "Lokale Spracherkennung",
    review: "Überprüfen", text_and_speakers: "Text und Sprecherrollen", analyse: "Analysieren",
    codes_memos_themes: "Codes, Memos und Themen", export_without_audio: "Projekt ohne Audio exportieren",
    full_backup: "Vollständiges Backup", step_1: "Schritt 1", step_2: "Schritt 2", step_3: "Schritt 3",
    step_4: "Schritt 4", setup_project: "Projekt einrichten", save_settings: "Einstellungen speichern",
    transcription: "Transkription", language: "Sprache", detect_automatically: "Automatisch erkennen",
    german: "Deutsch", english: "Englisch", french: "Französisch", spanish: "Spanisch", italian: "Italienisch",
    whisper_model: "Whisper-Modell", model_tiny: "tiny · sehr schnell", model_small: "small · empfohlen",
    model_large: "large-v3 · höchste Anforderungen", device: "Gerät", automatic: "Automatisch",
    compute_type: "Rechentyp", whisper_context: "Kontexthinweis für Whisper",
    whisper_context_placeholder: "Optional: Fachgebiet, Eigennamen und häufige Begriffe",
    use_diarization: "Automatische Sprechertrennung verwenden (optional, benötigt pyannote und HF_TOKEN)",
    recordings: "Interviewaufnahmen", supported_formats: "Unterstützt werden MP3, M4A, WAV, MP4, AAC, FLAC und OGG.",
    select_audio: "Audiodateien auswählen", drop_audio: "oder hierher ziehen",
    import_selected: "Ausgewählte Dateien importieren", imported_interviews: "Importierte Interviews",
    transcription_local_hint: "Die Verarbeitung läuft lokal. Beim ersten Start wird das gewählte Modell heruntergeladen.",
    review_transcript: "Transkript überprüfen", save_transcript: "Transkript speichern",
    review_empty: "Transkribiere zuerst mindestens ein Interview.", segment_at_playhead: "Segment am Abspielpunkt",
    mark_all_reviewed: "Alle sichtbaren als geprüft markieren", rta: "Reflexive thematische Analyse",
    save_analysis: "Analyse speichern", prepare_ai: "KI-Vorschläge vorbereiten", import_ai: "KI-Ergebnis importieren",
    research_question: "Forschungsfrage", research_question_placeholder: "Welche Frage leitet die Analyse?",
    reflexive_memo: "Reflexionsmemo", memo_placeholder: "Vorannahmen, Entscheidungen, Irritationen und Veränderungen festhalten …",
    material: "Material", selected_passage: "Ausgewählte Passage", create_new_code: "Neuen Code anlegen",
    codebook: "Codebuch", code: "Code", ai_suggestions: "KI-Vorschläge",
    suggestions_hint: "Vorschläge werden erst nach deiner Bestätigung zu Codierungen.", themes: "Themen", theme: "Thema",
    project_name: "Projektname", cancel: "Abbrechen", close: "Schließen", name: "Name", description: "Beschreibung",
    color: "Farbe", delete: "Löschen", save: "Speichern", assigned_codes: "Zugeordnete Codes",
    uploaded: "Importiert", queued: "Wartet", transcribing: "Transkription läuft", needs_review: "Zu überprüfen",
    reviewing: "In Prüfung", reviewed: "Geprüft", failed: "Fehlgeschlagen", loading: "Lädt …",
    saving: "Speichert …", saved: "Gespeichert", error: "Fehler", creating_project: "Projekt wird angelegt …",
    importing: "Importiert …", loading_transcript: "Transkript lädt …", startup_error: "Startfehler",
    unsaved_transcript: "Ungespeicherte Transkriptänderungen", unsaved_analysis: "Analyse ungespeichert",
    discard_transcript: "Ungespeicherte Änderungen am Transkript verwerfen?", discard_changes: "Ungespeicherte Änderungen verwerfen?",
    ai_privacy_confirm: "Diese Datei enthält die vollständigen geprüften Interviewtexte. Nur bei zulässiger Datenübertragung an externe Dienste weitergeben. Fortfahren?",
    settings_saved: "Einstellungen gespeichert.", choose_audio_first: "Wähle zuerst mindestens eine Audiodatei aus.",
    audio_imported: "Audiodateien importiert.", no_duration: "Noch keine Dauer", no_interviews: "Noch keine Interviews importiert.",
    import_audio_first: "Importiere zuerst Audiodateien.", retranscribe: "Neu transkribieren",
    save_or_discard_review: "Speichere oder verwirf zuerst die offenen Transkriptänderungen.",
    retranscribe_confirm: "Die vorhandene Transkription wird versioniert gesichert und anschließend ersetzt. Fortfahren?",
    transcription_complete: "Transkription abgeschlossen.", transcription_failed: "Transkription fehlgeschlagen.",
    review_progress: "{reviewed}/{total} vollständig geprüft", play_from_here: "Audio ab dieser Stelle abspielen",
    start_time: "Startzeit", end_time: "Endzeit", transcript_text: "Transkripttext", diarization: "Diarisierung",
    show_asr_original: "ASR-Original anzeigen", interviewer: "Interviewer:in", interviewee: "Interviewte Person",
    other_role: "Andere Rolle", add_after: "+ danach", reviewed_label: "geprüft",
    missing_speakers_one: "1 Segment benötigt zuerst eine Sprecherrolle.",
    missing_speakers_many: "{count} Segmente benötigen zuerst eine Sprecherrolle.", transcript_saved: "Transkript sicher gespeichert.",
    finish_review_first: "Schließe zuerst die vollständige Prüfung eines Interviews ab.",
    no_reviewed_material: "Kein vollständig geprüftes Material verfügbar.", remove_coding: "Codierung entfernen",
    analysis_saved: "Analyse sicher gespeichert.", occurrences_one: "{count} Fundstelle", occurrences_many: "{count} Fundstellen",
    ai_short: "KI", codebook_empty: "Markiere eine Passage oder lege einen Code an.", edit_code: "Code bearbeiten",
    new_code: "Neuer Code", delete_code_confirm: "Code und alle zugehörigen Codierungen löschen?",
    codes_count: "{count} Codes", no_themes: "Noch keine Kandidatenthemen.", edit_theme: "Thema bearbeiten",
    new_theme: "Neues Thema", create_codes_first: "Lege zuerst Codes an.",
    delete_theme_confirm: "Thema löschen? Die Codes bleiben erhalten.", invalid_ai_file: "Erwartet werden die Arrays 'codes' und 'codings'.",
    suggestions_imported: "{count} Vorschläge importiert", suggestions_skipped: "; {count} nicht eindeutig zuordenbar",
    import_failed: "Import fehlgeschlagen: {message}", unknown_code: "Unbekannter Code", accept: "Annehmen", reject: "Verwerfen",
    job_queued: "Wartet auf Verarbeitung", job_preparing: "Audio wird vorbereitet", job_loading_model: "Modell wird geladen",
    job_diarizing: "Sprecher werden unterschieden", job_transcribing: "Transkription läuft", job_done: "Transkription abgeschlossen",
  },
  en: {
    home: "Home", choose_language: "Choose language", brand_tagline: "local · traceable · open",
    project: "Project", new_project: "New project", ready: "Ready", welcome: "Welcome",
    hero_title: "From audio to transparent thematic analysis",
    hero_body: "By default, all data stays on this computer. Create your first project, import interviews, and complete the four steps in sequence.",
    create_project: "Create project", current_project: "Current project", import: "Import",
    project_and_audio: "Project and audio", transcribe: "Transcribe", local_asr: "Local speech recognition",
    review: "Review", text_and_speakers: "Text and speaker roles", analyse: "Analyse",
    codes_memos_themes: "Codes, memos and themes", export_without_audio: "Export project without audio",
    full_backup: "Full backup", step_1: "Step 1", step_2: "Step 2", step_3: "Step 3", step_4: "Step 4",
    setup_project: "Set up project", save_settings: "Save settings", transcription: "Transcription", language: "Language",
    detect_automatically: "Detect automatically", german: "German", english: "English", french: "French", spanish: "Spanish",
    italian: "Italian", whisper_model: "Whisper model", model_tiny: "tiny · very fast", model_small: "small · recommended",
    model_large: "large-v3 · highest requirements", device: "Device", automatic: "Automatic", compute_type: "Compute type",
    whisper_context: "Context hint for Whisper", whisper_context_placeholder: "Optional: field, proper names and frequent terms",
    use_diarization: "Use automatic speaker diarization (optional; requires pyannote and HF_TOKEN)", recordings: "Interview recordings",
    supported_formats: "Supported formats: MP3, M4A, WAV, MP4, AAC, FLAC and OGG.", select_audio: "Select audio files",
    drop_audio: "or drop them here", import_selected: "Import selected files", imported_interviews: "Imported interviews",
    transcription_local_hint: "Processing runs locally. The selected model is downloaded on first use.",
    review_transcript: "Review transcript", save_transcript: "Save transcript", review_empty: "Transcribe at least one interview first.",
    segment_at_playhead: "Segment at playhead", mark_all_reviewed: "Mark all visible segments as reviewed",
    rta: "Reflexive thematic analysis", save_analysis: "Save analysis", prepare_ai: "Prepare AI suggestions",
    import_ai: "Import AI result", research_question: "Research question", research_question_placeholder: "Which question guides the analysis?",
    reflexive_memo: "Reflexive memo", memo_placeholder: "Record assumptions, decisions, tensions and changes …", material: "Material",
    selected_passage: "Selected passage", create_new_code: "Create new code", codebook: "Codebook", code: "Code",
    ai_suggestions: "AI suggestions", suggestions_hint: "Suggestions become codings only after you accept them.", themes: "Themes",
    theme: "Theme", project_name: "Project name", cancel: "Cancel", close: "Close", name: "Name", description: "Description",
    color: "Color", delete: "Delete", save: "Save", assigned_codes: "Assigned codes", uploaded: "Imported", queued: "Queued",
    transcribing: "Transcribing", needs_review: "Needs review", reviewing: "Under review", reviewed: "Reviewed", failed: "Failed",
    loading: "Loading …", saving: "Saving …", saved: "Saved", error: "Error", creating_project: "Creating project …",
    importing: "Importing …", loading_transcript: "Loading transcript …", startup_error: "Startup error",
    unsaved_transcript: "Unsaved transcript changes", unsaved_analysis: "Analysis not saved",
    discard_transcript: "Discard unsaved transcript changes?", discard_changes: "Discard unsaved changes?",
    ai_privacy_confirm: "This file contains the complete reviewed interview text. Share it with an external service only when the data transfer is permitted. Continue?",
    settings_saved: "Settings saved.", choose_audio_first: "Select at least one audio file first.", audio_imported: "Audio files imported.",
    no_duration: "Duration not available", no_interviews: "No interviews imported yet.", import_audio_first: "Import audio files first.",
    retranscribe: "Transcribe again", save_or_discard_review: "Save or discard the open transcript changes first.",
    retranscribe_confirm: "The existing transcript will be backed up with a revision and then replaced. Continue?",
    transcription_complete: "Transcription complete.", transcription_failed: "Transcription failed.",
    review_progress: "{reviewed}/{total} fully reviewed", play_from_here: "Play audio from here", start_time: "Start time",
    end_time: "End time", transcript_text: "Transcript text", diarization: "Diarization", show_asr_original: "Show original ASR text",
    interviewer: "Interviewer", interviewee: "Interviewee", other_role: "Other role", add_after: "+ after", reviewed_label: "reviewed",
    missing_speakers_one: "1 segment needs a speaker role first.", missing_speakers_many: "{count} segments need a speaker role first.",
    transcript_saved: "Transcript saved safely.", finish_review_first: "Complete the full review of an interview first.",
    no_reviewed_material: "No fully reviewed material available.", remove_coding: "Remove coding", analysis_saved: "Analysis saved safely.",
    occurrences_one: "{count} occurrence", occurrences_many: "{count} occurrences", ai_short: "AI",
    codebook_empty: "Select a passage or create a code.", edit_code: "Edit code", new_code: "New code",
    delete_code_confirm: "Delete this code and all associated codings?", codes_count: "{count} codes",
    no_themes: "No candidate themes yet.", edit_theme: "Edit theme", new_theme: "New theme", create_codes_first: "Create codes first.",
    delete_theme_confirm: "Delete this theme? Its codes will be retained.", invalid_ai_file: "The 'codes' and 'codings' arrays are required.",
    suggestions_imported: "{count} suggestions imported", suggestions_skipped: "; {count} could not be matched unambiguously",
    import_failed: "Import failed: {message}", unknown_code: "Unknown code", accept: "Accept", reject: "Reject",
    job_queued: "Waiting for processing", job_preparing: "Preparing audio", job_loading_model: "Loading model",
    job_diarizing: "Separating speakers", job_transcribing: "Transcribing", job_done: "Transcription complete",
  },
};

let storedLanguage = null;
try { storedLanguage = localStorage.getItem("interview-analysis-language"); } catch (_) { /* storage may be disabled */ }
const initialLanguage = storedLanguage || (navigator.language?.toLowerCase().startsWith("en") ? "en" : "de");

const state = {
  language: initialLanguage === "en" ? "en" : "de",
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

function t(key, values = {}) {
  const template = translations[state.language][key] ?? translations.de[key] ?? key;
  return Object.entries(values).reduce((text, [name, value]) => text.replaceAll(`{${name}}`, String(value)), template);
}

function translatePage() {
  document.documentElement.lang = state.language;
  document.title = state.language === "de" ? "Interview Analysis Tool" : "Interview Analysis Tool";
  $$(`[data-i18n]`).forEach((element) => { element.textContent = t(element.dataset.i18n); });
  $$(`[data-i18n-placeholder]`).forEach((element) => { element.placeholder = t(element.dataset.i18nPlaceholder); });
  $$(`[data-i18n-aria]`).forEach((element) => { element.setAttribute("aria-label", t(element.dataset.i18nAria)); });
  $$(`[data-lang]`).forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.lang === state.language)));
  const status = $("#global-status");
  if (status.dataset.statusKey) status.textContent = t(status.dataset.statusKey);
  if ($("#code-dialog").open) $("#code-dialog-title").textContent = t($("#code-id").value ? "edit_code" : "new_code");
  if ($("#theme-dialog").open) $("#theme-dialog-title").textContent = t($("#theme-id").value ? "edit_theme" : "new_theme");
}

function setLanguage(language) {
  state.language = language === "en" ? "en" : "de";
  try { localStorage.setItem("interview-analysis-language", state.language); } catch (_) { /* storage may be disabled */ }
  translatePage();
  updateAiBundleLink();
  updateUploadLabel();
  if (state.project) renderInterviewLists();
  if (state.transcript) renderReview();
  if (state.analysis) renderAnalysis();
}

function updateAiBundleLink() {
  if (state.project) $("#ai-export-link").href = `/api/projects/${state.project.id}/ai-bundle.json?language=${state.language}`;
}

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
    throw new Error(localizeError(message));
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

function setStatus(key) {
  const element = $("#global-status");
  element.dataset.statusKey = key;
  element.textContent = t(key);
}

function statusLabel(status) { return translations[state.language][status] || status; }

function jobLabel(job, interview) {
  if (job?.error) return localizeError(job.error);
  const stageKey = job?.stage ? `job_${job.stage}` : null;
  if (stageKey && translations[state.language][stageKey]) return t(stageKey);
  if (interview.error) return localizeError(interview.error);
  return statusLabel(interview.status);
}

const germanServerErrors = {
  "invalid identifier": "Ungültige Kennung.",
  "invalid project path": "Ungültiger Projektpfad.",
  "at least one audio file is required": "Mindestens eine Audiodatei ist erforderlich.",
  "unknown transcription job": "Unbekannter Transkriptionsauftrag.",
  "Transcription support is not installed. Install interview-analysis-tool[asr].": "Die Transkriptionsunterstützung ist nicht installiert. Installiere interview-analysis-tool[asr].",
  "ffmpeg was not found on PATH": "FFmpeg wurde nicht im PATH gefunden.",
  "HF_TOKEN is required when speaker diarization is enabled": "Bei aktivierter Sprechertrennung ist HF_TOKEN erforderlich.",
  "Diarization support is not installed. Install interview-analysis-tool[diarization].": "Die Sprechertrennung ist nicht installiert. Installiere interview-analysis-tool[diarization].",
  "invalid model name": "Ungültiger Modellname.",
  "project name must contain 1 to 120 characters": "Der Projektname muss 1 bis 120 Zeichen enthalten.",
  "language must be 'auto' or a language code such as 'de' or 'en'": "Die Sprache muss 'auto' oder ein Sprachcode wie 'de' oder 'en' sein.",
  "project identifier does not match its directory": "Die Projektkennung passt nicht zum Projektverzeichnis.",
  "settings must be a JSON object": "Die Einstellungen müssen ein JSON-Objekt sein.",
  "initial prompt is too long": "Der Kontexthinweis ist zu lang.",
  "invalid language setting": "Ungültige Spracheinstellung.",
  "device must be auto, cpu, or cuda": "Das Gerät muss auto, cpu oder cuda sein.",
  "unsupported compute type": "Nicht unterstützter Rechentyp.",
  "unknown interview": "Unbekanntes Interview.",
  "audio file is missing": "Die Audiodatei fehlt.",
  "expected an object containing a segments array": "Erwartet wird ein Objekt mit einem segments-Array.",
  "the transcript changed in another browser; reload before saving": "Das Transkript wurde in einem anderen Browser geändert. Lade es vor dem Speichern neu.",
  "every segment must be an object": "Jedes Segment muss ein Objekt sein.",
  "segment identifiers must be unique and safe": "Segmentkennungen müssen eindeutig und sicher sein.",
  "segment times must be numbers": "Segmentzeiten müssen Zahlen sein.",
  "segment times are invalid": "Die Segmentzeiten sind ungültig.",
  "unknown speaker role": "Unbekannte Sprecherrolle.",
  "segment text is too long": "Der Segmenttext ist zu lang.",
  "segments cannot be removed; mark them as deleted instead": "Segmente können nicht entfernt werden; markiere sie stattdessen als gelöscht.",
  "the analysis changed in another browser; reload before saving": "Die Analyse wurde in einem anderen Browser geändert. Lade sie vor dem Speichern neu.",
  "this edit would invalidate existing codings or AI suggestions; remove those references in the analysis first": "Diese Änderung würde vorhandene Codierungen oder KI-Vorschläge ungültig machen. Entferne zuerst deren Bezüge in der Analyse.",
  "this transcript is referenced by codings or AI suggestions; remove those references before transcribing it again": "Dieses Transkript wird von Codierungen oder KI-Vorschlägen referenziert. Entferne diese vor einer Neutranskription.",
  "upload exceeds the configured size limit": "Der Upload überschreitet die konfigurierte Größenbegrenzung.",
  "Transcription was interrupted by an application restart.": "Die Transkription wurde durch einen Neustart der Anwendung unterbrochen.",
  "analysis must be a JSON object": "Die Analyse muss ein JSON-Objekt sein.",
  "interview_notes must be an object": "interview_notes muss ein Objekt sein.",
  "a coding references an unavailable or unreviewed segment": "Eine Codierung verweist auf ein nicht verfügbares oder ungeprüftes Segment.",
  "coding quotes cannot be empty": "Codierungszitate dürfen nicht leer sein.",
  "a coding quote no longer matches its segment offsets": "Ein Codierungszitat passt nicht mehr zu seiner Position im Segment.",
  "every code requires a safe identifier": "Jeder Code benötigt eine sichere Kennung.",
  "code identifiers must be unique and code names cannot be empty": "Codekennungen müssen eindeutig sein und Codenamen dürfen nicht leer sein.",
  "code names and descriptions must be strings": "Codenamen und Beschreibungen müssen Zeichenketten sein.",
  "code colors must use #RRGGBB": "Codefarben müssen das Format #RRGGBB verwenden.",
  "every theme requires an identifier": "Jedes Thema benötigt eine Kennung.",
  "theme identifiers must be unique and safe": "Themenkennungen müssen eindeutig und sicher sein.",
  "theme names cannot be empty": "Themennamen dürfen nicht leer sein.",
  "theme descriptions must be strings and code_ids must be an array": "Themenbeschreibungen müssen Zeichenketten und code_ids muss ein Array sein.",
  "theme parent does not exist": "Das übergeordnete Thema existiert nicht.",
  "theme references an unknown code": "Das Thema verweist auf einen unbekannten Code.",
  "every coding requires a safe identifier": "Jede Codierung benötigt eine sichere Kennung.",
  "coding identifiers must be unique and reference an existing code": "Codierungskennungen müssen eindeutig sein und auf einen vorhandenen Code verweisen.",
  "coding target is invalid": "Das Ziel der Codierung ist ungültig.",
  "coding offsets must be integers": "Codierungspositionen müssen Ganzzahlen sein.",
  "coding offsets are invalid": "Die Codierungspositionen sind ungültig.",
  "coding quotes must be non-empty strings": "Codierungszitate müssen nicht leere Zeichenketten sein.",
  "every suggestion requires a safe identifier": "Jeder Vorschlag benötigt eine sichere Kennung.",
  "suggestions must be unique and reference an existing code": "Vorschläge müssen eindeutig sein und auf einen vorhandenen Code verweisen.",
  "suggestion target is invalid": "Das Ziel des Vorschlags ist ungültig.",
  "suggestion offsets must be integers": "Vorschlagspositionen müssen Ganzzahlen sein.",
  "suggestion offsets are invalid": "Die Vorschlagspositionen sind ungültig.",
  "suggestion quotes must be non-empty strings": "Vorschlagszitate müssen nicht leere Zeichenketten sein.",
};

function localizeError(message) {
  if (state.language === "en") return message;
  if (germanServerErrors[message]) return germanServerErrors[message];
  if (message.startsWith("unsupported audio format; allowed:")) return `Nicht unterstütztes Audioformat; erlaubt:${message.split(":")[1]}`;
  if (message.startsWith("missing file:")) return `Fehlende Datei:${message.split(":")[1]}`;
  if (message.startsWith("invalid JSON in ")) return `Ungültiges JSON in ${message.slice(16)}`;
  if (message.endsWith(" must contain a JSON object")) return `${message.slice(0, -27)} muss ein JSON-Objekt enthalten.`;
  if (message.endsWith(" must be an array")) return `${message.slice(0, -17)} muss ein Array sein.`;
  return message;
}

async function init() {
  translatePage();
  bindEvents();
  await loadProjects();
}

function bindEvents() {
  $$(`[data-lang]`).forEach((button) => button.addEventListener("click", () => setLanguage(button.dataset.lang)));
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
    if (state.reviewDirty && !confirm(t("discard_transcript"))) {
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
    if (!confirm(t("ai_privacy_confirm"))) event.preventDefault();
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
  $("#new-project-language").value = state.language;
  $("#project-dialog").showModal();
}

async function createProject(event) {
  event.preventDefault();
  try {
    setStatus("creating_project");
    const project = await api("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: $("#new-project-name").value, language: $("#new-project-language").value }),
    });
    $("#project-dialog").close();
    await loadProjects(project.id);
    setStatus("ready");
  } catch (error) { setStatus("error"); toast(error.message); }
}

async function selectProject(projectId) {
  if ((state.analysisDirty || state.reviewDirty) && !confirm(t("discard_changes"))) {
    $("#project-select").value = state.project.id;
    return;
  }
  try {
    setStatus("loading");
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
    setStatus("ready");
  } catch (error) { setStatus("error"); toast(error.message); }
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
  updateAiBundleLink();
  renderInterviewLists();
}

function showView(view) {
  $$(".step").forEach((button) => button.classList.toggle("active", button.dataset.view === view));
  $$(".view").forEach((element) => element.classList.toggle("active", element.id === `${view}-view`));
  if (view === "analyse") renderAnalysis();
}

async function saveSettings() {
  try {
    setStatus("saving");
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
    setStatus("saved");
    toast(t("settings_saved"));
  } catch (error) { setStatus("error"); toast(error.message); }
}

function updateUploadLabel() {
  const files = [...$("#audio-files").files];
  const zone = $(".dropzone");
  zone.classList.toggle("has-files", files.length > 0);
  zone.querySelector("strong").textContent = files.length
    ? (state.language === "de" ? `${files.length} Datei${files.length === 1 ? "" : "en"} ausgewählt` : `${files.length} file${files.length === 1 ? "" : "s"} selected`)
    : t("select_audio");
}

async function uploadFiles() {
  const files = [...$("#audio-files").files];
  if (!files.length) return toast(t("choose_audio_first"));
  const form = new FormData();
  files.forEach((file) => form.append("audio", file));
  try {
    $("#upload-btn").disabled = true;
    setStatus("importing");
    await api(`/api/projects/${state.project.id}/interviews`, { method: "POST", body: form });
    $("#audio-files").value = "";
    updateUploadLabel();
    await refreshProject();
    setStatus("ready");
    toast(t("audio_imported"));
    showView("transcribe");
  } catch (error) { setStatus("error"); toast(error.message); }
  finally { $("#upload-btn").disabled = false; }
}

async function refreshProject() {
  state.project = await api(`/api/projects/${state.project.id}`);
  renderProject();
}

function renderInterviewLists() {
  const interviews = state.project.interviews || [];
  const card = (interview) => `<article class="interview-card"><strong title="${escapeHtml(interview.source_filename)}">${escapeHtml(interview.name)}</strong><span class="status ${interview.status}">${escapeHtml(statusLabel(interview.status))}</span><small>${interview.duration_seconds ? `${(interview.duration_seconds / 60).toFixed(1)} min` : t("no_duration")}</small>${interview.error ? `<small>${escapeHtml(localizeError(interview.error))}</small>` : ""}</article>`;
  $("#imported-list").innerHTML = interviews.map(card).join("") || `<p class="muted">${t("no_interviews")}</p>`;
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
    return `<article class="panel job-card"><div><h3>${escapeHtml(interview.name)}</h3><p>${escapeHtml(jobLabel(job, interview))}</p><div class="progress-track"><div class="progress-fill" style="width:${percent}%"></div></div></div><button class="transcribe-btn" data-id="${interview.id}" ${canStart ? "" : "disabled"}>${t(["needs_review", "reviewed", "reviewing"].includes(interview.status) ? "retranscribe" : "transcribe")}</button></article>`;
  }).join("") || `<div class="notice">${t("import_audio_first")}</div>`;
  $$(".transcribe-btn").forEach((button) => button.addEventListener("click", () => startTranscription(button.dataset.id)));
}

async function startTranscription(interviewId) {
  try {
    if (state.reviewDirty && interviewId === state.reviewInterviewId) {
      return toast(t("save_or_discard_review"));
    }
    const interview = state.project.interviews.find((item) => item.id === interviewId);
    if (["needs_review", "reviewing", "reviewed"].includes(interview?.status) && !confirm(t("retranscribe_confirm"))) return;
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
    toast(job.status === "done" ? t("transcription_complete") : localizeError(job.error || t("transcription_failed")));
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
    setStatus("loading_transcript");
    state.reviewInterviewId = interviewId;
    state.transcript = await api(`/api/projects/${state.project.id}/interviews/${interviewId}/transcript`);
    state.reviewDirty = false;
    state.transcriptCache.set(interviewId, state.transcript);
    $("#review-interview").value = interviewId;
    $("#audio-player").src = `/api/projects/${state.project.id}/interviews/${interviewId}/audio`;
    renderReview();
    setStatus("ready");
  } catch (error) { setStatus("error"); toast(error.message); }
}

function formatTime(value) {
  const seconds = Number(value) || 0;
  return `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;
}

function renderReview() {
  const segments = state.transcript?.segments || [];
  const active = segments.filter((segment) => !segment.deleted);
  const reviewed = active.filter((segment) => segment.reviewed && segment.speaker).length;
  $("#review-progress").textContent = t("review_progress", { reviewed, total: active.length });
  $("#segment-list").innerHTML = segments.map((segment, index) => segment.deleted ? "" : `
    <article class="segment" data-index="${index}">
      <div class="segment-time"><time data-seek="${segment.start}" title="${t("play_from_here")}">${formatTime(segment.start)}–${formatTime(segment.end)}</time><div class="time-inputs"><input type="number" min="0" step="0.1" value="${segment.start}" data-time="start" data-index="${index}" aria-label="${t("start_time")}"><input type="number" min="0" step="0.1" value="${segment.end}" data-time="end" data-index="${index}" aria-label="${t("end_time")}"></div></div>
      <div><textarea data-field="text" data-index="${index}" aria-label="${t("transcript_text")}">${escapeHtml(segment.text)}</textarea>${segment.diarization_speaker ? `<p class="muted">${t("diarization")}: ${escapeHtml(segment.diarization_speaker)}</p>` : ""}${segment.asr_text && segment.asr_text !== segment.text ? `<details><summary>${t("show_asr_original")}</summary><p>${escapeHtml(segment.asr_text)}</p></details>` : ""}</div>
      <div class="speaker-buttons">
        <button type="button" data-speaker="interviewer" data-index="${index}" class="${segment.speaker === "interviewer" ? "selected" : ""}">${t("interviewer")}</button>
        <button type="button" data-speaker="interviewee" data-index="${index}" class="${segment.speaker === "interviewee" ? "selected" : ""}">${t("interviewee")}</button>
        <button type="button" data-speaker="other" data-index="${index}" class="${segment.speaker === "other" ? "selected" : ""}">${t("other_role")}</button>
        <button type="button" data-add-after="${index}" class="ghost">${t("add_after")}</button>
        <button type="button" data-delete="${index}" class="danger">${t("delete")}</button>
      </div>
      <label class="review-check"><input type="checkbox" data-reviewed="${index}" ${segment.reviewed ? "checked" : ""}> ${t("reviewed_label")}</label>
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
  if (missing) return toast(t(missing === 1 ? "missing_speakers_one" : "missing_speakers_many", { count: missing }));
  state.transcript.segments.filter((segment) => !segment.deleted).forEach((segment) => { segment.reviewed = true; });
  markReviewDirty();
  renderReview();
}

function markReviewDirty() {
  state.reviewDirty = true;
  setStatus("unsaved_transcript");
}

async function saveTranscript() {
  if (!state.transcript) return;
  try {
    setStatus("saving");
    state.transcript = await api(`/api/projects/${state.project.id}/interviews/${state.reviewInterviewId}/transcript`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ revision: state.transcript.revision, segments: state.transcript.segments }),
    });
    state.transcriptCache.set(state.reviewInterviewId, state.transcript);
    state.reviewDirty = false;
    await refreshProject();
    await preloadReviewedTranscripts();
    setStatus("saved");
    toast(t("transcript_saved"));
  } catch (error) { setStatus("error"); toast(error.message); }
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
  warning.textContent = t("finish_review_first");
  const transcript = state.transcriptCache.get(state.analysisInterviewId);
  const segments = (transcript?.segments || []).filter((segment) => segment.reviewed && !segment.deleted && segment.text.trim());
  $("#analysis-segments").innerHTML = segments.map(analysisSegmentHtml).join("") || `<p class="muted">${t("no_reviewed_material")}</p>`;
  $$(".segment-text").forEach((element) => element.addEventListener("mouseup", () => captureSelection(element)));
  $$("button[data-remove-coding]").forEach((button) => button.addEventListener("click", () => removeCoding(button.dataset.removeCoding)));
  renderSelectionBox();
  renderCodebook();
  renderThemes();
  renderSuggestions();
}

function analysisSegmentHtml(segment) {
  const codings = state.analysis.codings.filter((coding) => coding.interview_id === state.analysisInterviewId && coding.segment_id === segment.id);
  const label = t(segment.speaker === "interviewer" ? "interviewer" : segment.speaker === "interviewee" ? "interviewee" : "other_role");
  return `<article class="analysis-segment ${segment.speaker}"><div class="segment-meta">${label} · ${formatTime(segment.start)}–${formatTime(segment.end)}</div><div class="segment-text" data-segment="${segment.id}">${annotatedText(segment.text, codings)}</div><div class="coding-row">${codings.map((coding) => { const code = codeById(coding.code_id); return code ? `<button class="coding-chip" data-remove-coding="${coding.id}" style="--chip:${code.color}" title="${t("remove_coding")}">${escapeHtml(code.name)} ×</button>` : ""; }).join("")}</div></article>`;
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
  setStatus("unsaved_analysis");
}

async function saveAnalysis() {
  try {
    setStatus("saving");
    state.analysis = await api(`/api/projects/${state.project.id}/analysis`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(state.analysis),
    });
    state.analysisDirty = false;
    setStatus("saved");
    toast(t("analysis_saved"));
  } catch (error) { setStatus("error"); toast(error.message); }
}

function renderCodebook() {
  $("#code-list").innerHTML = state.analysis.codes.map((code) => {
    const count = state.analysis.codings.filter((coding) => coding.code_id === code.id).length;
    return `<button class="stack-item" data-edit-code="${code.id}" style="border-left:4px solid ${code.color}"><strong>${escapeHtml(code.name)}</strong><small>${t(count === 1 ? "occurrences_one" : "occurrences_many", { count })}${code.origin === "ai" ? ` · ${t("ai_short")}` : ""}</small></button>`;
  }).join("") || `<p class="muted">${t("codebook_empty")}</p>`;
  $$("[data-edit-code]").forEach((button) => button.addEventListener("click", () => openCodeDialog(button.dataset.editCode)));
}

function openCodeDialog(codeId = null, applyAfter = false) {
  const code = codeById(codeId);
  $("#code-id").value = code?.id || "";
  $("#code-name").value = code?.name || "";
  $("#code-description").value = code?.description || "";
  $("#code-color").value = code?.color || ["#7357c6", "#3f86a8", "#c26a54", "#5b9279"][state.analysis.codes.length % 4];
  $("#code-dialog-title").textContent = t(code ? "edit_code" : "new_code");
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
  if (!id || !confirm(t("delete_code_confirm"))) return;
  state.analysis.codes = state.analysis.codes.filter((code) => code.id !== id);
  state.analysis.codings = state.analysis.codings.filter((coding) => coding.code_id !== id);
  state.analysis.suggestions = state.analysis.suggestions.filter((suggestion) => suggestion.code_id !== id);
  state.analysis.themes.forEach((theme) => { theme.code_ids = (theme.code_ids || []).filter((codeId) => codeId !== id); });
  $("#code-dialog").close();
  markAnalysisDirty();
  renderAnalysis();
}

function renderThemes() {
  $("#theme-list").innerHTML = state.analysis.themes.map((theme) => `<button class="stack-item" data-edit-theme="${theme.id}"><strong>${escapeHtml(theme.name)}</strong><small>${t("codes_count", { count: (theme.code_ids || []).length })}</small></button>`).join("") || `<p class="muted">${t("no_themes")}</p>`;
  $$("[data-edit-theme]").forEach((button) => button.addEventListener("click", () => openThemeDialog(button.dataset.editTheme)));
}

function openThemeDialog(themeId = null) {
  const theme = themeById(themeId);
  $("#theme-id").value = theme?.id || "";
  $("#theme-name").value = theme?.name || "";
  $("#theme-description").value = theme?.description || "";
  $("#theme-dialog-title").textContent = t(theme ? "edit_theme" : "new_theme");
  $("#delete-theme-btn").classList.toggle("hidden", !theme);
  const selected = new Set(theme?.code_ids || []);
  $("#theme-code-options").innerHTML = state.analysis.codes.map((code) => `<label><input type="checkbox" value="${code.id}" ${selected.has(code.id) ? "checked" : ""}> <span>${escapeHtml(code.name)}</span></label>`).join("") || `<p class="muted">${t("create_codes_first")}</p>`;
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
  if (!id || !confirm(t("delete_theme_confirm"))) return;
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
    if (!Array.isArray(payload.codes) || !Array.isArray(payload.codings)) throw new Error(t("invalid_ai_file"));
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
    toast(`${t("suggestions_imported", { count: imported })}${skipped ? t("suggestions_skipped", { count: skipped }) : ""}.`);
  } catch (error) { toast(t("import_failed", { message: error.message })); }
  finally { event.target.value = ""; }
}

function renderSuggestions() {
  const suggestions = state.analysis.suggestions || [];
  $("#suggestion-panel").classList.toggle("hidden", suggestions.length === 0);
  $("#suggestion-count").textContent = suggestions.length;
  $("#suggestion-list").innerHTML = suggestions.map((suggestion) => {
    const code = codeById(suggestion.code_id);
    return `<div class="stack-item"><strong>${escapeHtml(code?.name || t("unknown_code"))}</strong><small>“${escapeHtml(suggestion.quote.trim())}”</small>${suggestion.rationale ? `<small>${escapeHtml(suggestion.rationale)}</small>` : ""}<div class="suggestion-actions"><button type="button" data-accept-suggestion="${suggestion.id}">${t("accept")}</button><button type="button" class="ghost" data-reject-suggestion="${suggestion.id}">${t("reject")}</button></div></div>`;
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
  setStatus("startup_error");
  toast(error.message);
});
