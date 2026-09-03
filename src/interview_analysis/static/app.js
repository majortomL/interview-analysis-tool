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
    ready_to_transcribe: "Bereit – klicke auf „Transkribieren“, um zu starten.",
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
    delete_segment_confirm: "Segment löschen? Zugehörige Codierungen bleiben erhalten, sind aber nicht mehr sichtbar.",
    delete_interview_confirm: "Aufzeichnung „{name}“ und alle zugehörigen Dateien (Audio, Transkript) endgültig löschen?",
    interview_deleted: "Aufzeichnung gelöscht.",
    please_confirm: "Bitte bestätigen",
    transcription_name: "Name der Transkription",
    transcription_name_default: "Transkription {n}",
    transcription_name_required: "Bitte einen Namen für die Transkription angeben.",
    remove_file: "Entfernen",
    start_short: "Start", end_short: "Ende",
    transcribe_all: "Alle transkribieren",
    nothing_to_transcribe: "Keine neuen Interviews zum Transkribieren.",
    suggestions_imported: "{count} Vorschläge importiert", suggestions_skipped: "; {count} nicht eindeutig zuordenbar",
    import_failed: "Import fehlgeschlagen: {message}", unknown_code: "Unbekannter Code", accept: "Annehmen", reject: "Verwerfen",
    job_queued: "Wartet auf Verarbeitung", job_preparing: "Audio wird vorbereitet", job_loading_model: "Modell wird geladen",
    job_diarizing: "Sprecher werden unterschieden", job_transcribing: "Transkription läuft", job_done: "Transkription abgeschlossen",
    gpu_checking: "Prüfe GPU-Verfügbarkeit …",
    gpu_available_one: "NVIDIA-GPU erkannt – Transkription kann CUDA nutzen.",
    gpu_available_many: "{count} NVIDIA-GPUs erkannt – Transkription kann CUDA nutzen.",
    gpu_none: "Keine GPU erkannt – Transkription läuft auf der CPU.",
    gpu_asr_not_installed: "Transkriptionsunterstützung nicht installiert – GPU-Status unbekannt.",
    gpu_error: "GPU-Status konnte nicht ermittelt werden.",
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
    ready_to_transcribe: "Ready – click “Transcribe” to start.",
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
    delete_segment_confirm: "Delete this segment? Related codings are kept but will no longer be visible.",
    delete_interview_confirm: "Permanently delete recording “{name}” and all its files (audio, transcript)?",
    interview_deleted: "Recording deleted.",
    please_confirm: "Please confirm",
    transcription_name: "Transcription name",
    transcription_name_default: "Transcription {n}",
    transcription_name_required: "Please enter a name for the transcription.",
    remove_file: "Remove",
    start_short: "Start", end_short: "End",
    transcribe_all: "Transcribe all",
    nothing_to_transcribe: "No new interviews to transcribe.",
    suggestions_imported: "{count} suggestions imported", suggestions_skipped: "; {count} could not be matched unambiguously",
    import_failed: "Import failed: {message}", unknown_code: "Unknown code", accept: "Accept", reject: "Reject",
    job_queued: "Waiting for processing", job_preparing: "Preparing audio", job_loading_model: "Loading model",
    job_diarizing: "Separating speakers", job_transcribing: "Transcribing", job_done: "Transcription complete",
    gpu_checking: "Checking GPU availability …",
    gpu_available_one: "NVIDIA GPU detected – transcription can use CUDA.",
    gpu_available_many: "{count} NVIDIA GPUs detected – transcription can use CUDA.",
    gpu_none: "No GPU detected – transcription runs on the CPU.",
    gpu_asr_not_installed: "Transcription support is not installed – GPU status unknown.",
    gpu_error: "Could not determine GPU status.",
  },
};

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
  "this interview is referenced by codings or AI suggestions; remove those references before deleting it": "Dieses Interview wird von Codierungen oder KI-Vorschlägen referenziert. Entferne diese vor dem Löschen.",
  "a transcription job is running for this interview; wait for it to finish first": "Für dieses Interview läuft gerade eine Transkription. Warte, bis sie abgeschlossen ist.",
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

const escapeHtml = (value) => {
  const element = document.createElement("div");
  element.textContent = value ?? "";
  return element.innerHTML;
};
const uid = (prefix) => `${prefix}-${globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`}`;

function formatTime(value) {
  const seconds = Number(value) || 0;
  return `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;
}

function newSegment(start, end) {
  return { id: uid("segment"), start: Number(start.toFixed(3)), end: Number(end.toFixed(3)), text: "", asr_text: "", avg_logprob: null, no_speech_prob: null, speaker: null, reviewed: false, deleted: false };
}

function nextTranscriptionNames(baseName, count) {
  const trailingNumber = baseName.match(/^(.*?)(\d+)\s*$/);
  if (trailingNumber) {
    const [, prefix, digits] = trailingNumber;
    const start = parseInt(digits, 10);
    return Array.from({ length: count }, (_, index) => `${prefix}${start + index}`);
  }
  return Array.from({ length: count }, (_, index) => (index === 0 ? baseName : `${baseName} (${index + 1})`));
}

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

function confirmDialog(message, { confirmLabel } = {}) {
  const dialog = document.getElementById("confirm-dialog");
  document.getElementById("confirm-dialog-title").textContent = store.t("please_confirm");
  document.getElementById("confirm-dialog-message").textContent = message;
  document.getElementById("confirm-dialog-ok").textContent = confirmLabel || store.t("delete");
  dialog.showModal();
  return new Promise((resolve) => {
    const okButton = document.getElementById("confirm-dialog-ok");
    const cancelButtons = [...document.querySelectorAll(".confirm-dialog-close")];
    const finish = (result) => {
      dialog.removeEventListener("close", onClose);
      okButton.removeEventListener("click", onConfirm);
      cancelButtons.forEach((button) => button.removeEventListener("click", onCancel));
      resolve(result);
    };
    const onConfirm = () => { dialog.removeEventListener("close", onClose); dialog.close(); finish(true); };
    const onCancel = () => dialog.close();
    const onClose = () => finish(false);
    dialog.addEventListener("close", onClose);
    okButton.addEventListener("click", onConfirm);
    cancelButtons.forEach((button) => button.addEventListener("click", onCancel));
  });
}

let version = 0;
const listeners = new Set();
function notify() {
  version += 1;
  listeners.forEach((fn) => fn());
}
function subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); }
function getVersion() { return version; }

let storedLanguage = null;
let storedView = null;
try {
  storedLanguage = localStorage.getItem("interview-analysis-language");
  storedView = localStorage.getItem("interview-analysis-view");
} catch (_) { /* storage may be disabled */ }
const initialLanguage = storedLanguage || (navigator.language?.toLowerCase().startsWith("en") ? "en" : "de");
const initialView = ["import", "transcribe", "review", "analyse"].includes(storedView) ? storedView : "import";

const queries = {
  t(key, values = {}) {
    const template = translations[this.language][key] ?? translations.de[key] ?? key;
    return Object.entries(values).reduce((text, [name, value]) => text.replaceAll(`{${name}}`, String(value)), template);
  },

  localizeError(message) {
    if (this.language === "en") return message;
    if (germanServerErrors[message]) return germanServerErrors[message];
    if (message.startsWith("unsupported audio format; allowed:")) return `Nicht unterstütztes Audioformat; erlaubt:${message.split(":")[1]}`;
    if (message.startsWith("missing file:")) return `Fehlende Datei:${message.split(":")[1]}`;
    if (message.startsWith("invalid JSON in ")) return `Ungültiges JSON in ${message.slice(16)}`;
    if (message.endsWith(" must contain a JSON object")) return `${message.slice(0, -27)} muss ein JSON-Objekt enthalten.`;
    if (message.endsWith(" must be an array")) return `${message.slice(0, -17)} muss ein Array sein.`;
    return message;
  },

  statusLabel(status) { return translations[this.language][status] || status; },

  jobFor(interviewId) {
    return [...this.jobs.values()].find((item) => item.interview_id === interviewId && ["queued", "running"].includes(item.status));
  },

  jobLabel(interview) {
    const job = this.jobFor(interview.id);
    if (job?.error) return this.localizeError(job.error);
    const stageKey = job?.stage ? `job_${job.stage}` : null;
    if (stageKey && translations[this.language][stageKey]) return this.t(stageKey);
    if (interview.error) return this.localizeError(interview.error);
    if (!job && interview.status === "uploaded") return this.t("ready_to_transcribe");
    return this.statusLabel(interview.status);
  },

  gpuStatusText() {
    if (!this.gpu) return this.t("gpu_checking");
    const { cuda_available: available, device_count: count, reason } = this.gpu;
    const key = available
      ? (count === 1 ? "gpu_available_one" : "gpu_available_many")
      : reason === "asr_not_installed" ? "gpu_asr_not_installed"
      : reason === "error" ? "gpu_error"
      : "gpu_none";
    return this.t(key, { count });
  },

  gpuStatusClass() {
    if (!this.gpu) return "muted";
    return this.gpu.cuda_available ? "muted gpu-ok" : "muted gpu-warn";
  },

  aiBundleHref() {
    return this.project ? `/api/projects/${this.project.id}/ai-bundle.json?language=${this.language}` : "#";
  },

  reviewableInterviews() {
    return (this.project?.interviews || []).filter((item) => ["needs_review", "reviewing", "reviewed"].includes(item.status));
  },

  reviewedInterviews() {
    return (this.project?.interviews || []).filter((item) => item.status === "reviewed");
  },

  currentAnalysisInterview() {
    const reviewed = this.reviewedInterviews();
    return reviewed.find((item) => item.id === this.analysisInterviewId) || reviewed[0] || null;
  },

  canStartTranscription(interview) {
    return !this.jobFor(interview.id) && !["queued", "transcribing"].includes(interview.status);
  },

  transcribableInterviews() {
    return (this.project?.interviews || []).filter(
      (interview) => this.canStartTranscription(interview) && !["needs_review", "reviewing", "reviewed"].includes(interview.status),
    );
  },

  audioSrc() {
    return this.reviewInterviewId ? `/api/projects/${this.project.id}/interviews/${this.reviewInterviewId}/audio` : "";
  },

  visibleSegments() {
    return (this.transcript?.segments || []).filter((segment) => !segment.deleted);
  },

  activeSegmentId() {
    const time = this.audioCurrentTime;
    const match = this.visibleSegments().find((segment) => time >= segment.start && time < segment.end);
    return match?.id ?? null;
  },

  reviewProgressText() {
    const active = this.visibleSegments();
    const reviewed = active.filter((segment) => segment.reviewed && segment.speaker).length;
    return this.t("review_progress", { reviewed, total: active.length });
  },

  segmentById(interviewId, segmentId) {
    return this.transcriptCache.get(interviewId)?.segments.find((segment) => segment.id === segmentId);
  },

  codeById(codeId) { return this.analysis.codes.find((code) => code.id === codeId); },
  themeById(themeId) { return this.analysis.themes.find((theme) => theme.id === themeId); },

  analysisWarningVisible() { return this.reviewedInterviews().length === 0; },

  visibleAnalysisSegments() {
    const interview = this.currentAnalysisInterview();
    const transcript = interview ? this.transcriptCache.get(interview.id) : null;
    return (transcript?.segments || []).filter((segment) => segment.reviewed && !segment.deleted && segment.text.trim());
  },

  codingsFor(segmentId) {
    const interview = this.currentAnalysisInterview();
    return this.analysis.codings.filter((coding) => coding.interview_id === interview?.id && coding.segment_id === segmentId && this.codeById(coding.code_id));
  },

  speakerLabel(segment) {
    return this.t(segment.speaker === "interviewer" ? "interviewer" : segment.speaker === "interviewee" ? "interviewee" : "other_role");
  },

  annotatedText(text, codings) {
    const hoveredCodeId = this.hoveredCodeId;
    const boundaries = new Set([0, text.length]);
    codings.forEach((coding) => { boundaries.add(Math.max(0, coding.start)); boundaries.add(Math.min(text.length, coding.end)); });
    const points = [...boundaries].sort((a, b) => a - b);
    let html = "";
    for (let index = 0; index < points.length - 1; index += 1) {
      const start = points[index], end = points[index + 1], slice = escapeHtml(text.slice(start, end));
      let active = codings.filter((coding) => coding.start < end && coding.end > start);
      if (hoveredCodeId) active = active.filter((coding) => coding.code_id === hoveredCodeId);
      if (!active.length) { html += slice; continue; }
      const names = active.map((coding) => this.codeById(coding.code_id)?.name).filter(Boolean);
      const color = this.codeById(active[0].code_id)?.color || "#e8ca82";
      html += `<mark style="--mark:${color}55" title="${escapeHtml(names.join(", "))}">${slice}</mark>`;
    }
    return html;
  },

  codingCount(codeId) {
    return this.analysis.codings.filter((coding) => coding.code_id === codeId).length;
  },

  uploadCountLabel() {
    const n = this.pendingFiles.length;
    return this.language === "de" ? `${n} Datei${n === 1 ? "" : "en"} ausgewählt` : `${n} file${n === 1 ? "" : "s"} selected`;
  },
};

const actions = {
  async init() {
    document.documentElement.lang = this.language;
    window.addEventListener("beforeunload", (event) => {
      if (!this.analysisDirty && !this.reviewDirty) return;
      event.preventDefault();
      event.returnValue = "";
    });
    this.loadGpuStatus();
    setInterval(() => this.creepJobProgress(), 400);
    await this.loadProjects();
  },

  creepJobProgress() {
    let changed = false;
    for (const job of this.jobs.values()) {
      if (!["queued", "running"].includes(job.status)) continue;
      const ceiling = Math.min((job.percent || 0) + 10, 97);
      if ((job.displayPercent || 0) < ceiling) {
        job.displayPercent = Math.min(ceiling, (job.displayPercent || 0) + 0.6);
        changed = true;
      }
    }
    if (changed) notify();
  },

  touch() { /* manual re-render trigger for simple inline field mutations */ },

  setHoveredCode(codeId) { this.hoveredCodeId = codeId; },

  setLanguage(language) {
    this.language = language === "en" ? "en" : "de";
    document.documentElement.lang = this.language;
    try { localStorage.setItem("interview-analysis-language", this.language); } catch (_) { /* storage may be disabled */ }
  },

  setStatus(key) { this.statusKey = key; },

  toast(message) {
    this.toastMessage = message;
    this.toastVisible = true;
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => { this.toastVisible = false; notify(); }, 3500);
  },

  async loadGpuStatus() {
    try {
      const { gpu } = await api("/api/system");
      this.gpu = gpu;
    } catch (_) {
      this.gpu = { cuda_available: false, device_count: 0, reason: "error" };
    }
  },

  async loadProjects(preferredId = null) {
    this.projects = await api("/api/projects");
    const selected = preferredId || this.project?.id || this.projects[0]?.id;
    document.title = this.project ? `${this.project.name} · Interview Analysis Tool` : "Interview Analysis Tool";
    if (selected) await this.selectProject(selected);
  },

  openProjectDialog() {
    this.projectDraft = { name: "", language: this.language };
    document.getElementById("project-dialog").showModal();
  },

  async createProject(event) {
    event.preventDefault();
    try {
      this.setStatus("creating_project");
      const project = await api("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: this.projectDraft.name, language: this.projectDraft.language }),
      });
      document.getElementById("project-dialog").close();
      await this.loadProjects(project.id);
      this.setStatus("ready");
    } catch (error) { this.setStatus("error"); this.toast(this.localizeError(error.message)); }
  },

  async selectProject(projectId) {
    if ((this.analysisDirty || this.reviewDirty) && !(await confirmDialog(this.t("discard_changes")))) return;
    try {
      this.setStatus("loading");
      const [project, analysis] = await Promise.all([
        api(`/api/projects/${projectId}`),
        api(`/api/projects/${projectId}/analysis`),
      ]);
      this.project = project;
      this.analysis = analysis;
      document.title = `${project.name} · Interview Analysis Tool`;
      this.transcript = null;
      this.transcriptCache.clear();
      this.reviewInterviewId = null;
      this.reviewDirty = false;
      this.analysisInterviewId = this.reviewedInterviews()[0]?.id || null;
      this.analysisDirty = false;
      this.jobs.clear();
      this.prefillTranscriptionName();
      await this.loadFirstReview();
      await this.preloadReviewedTranscripts();
      await this.resumeActiveJobs();
      this.setStatus("ready");
    } catch (error) { this.setStatus("error"); this.toast(this.localizeError(error.message)); }
  },

  prefillTranscriptionName() {
    const nextNumber = (this.project.interviews || []).length + 1;
    this.transcriptionName = this.t("transcription_name_default", { n: nextNumber });
  },

  showView(view) {
    this.view = view;
    try { localStorage.setItem("interview-analysis-view", view); } catch (_) { /* storage may be disabled */ }
  },

  async saveSettings() {
    try {
      this.setStatus("saving");
      this.project = await api(`/api/projects/${this.project.id}/settings`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.project.settings),
      });
      this.setStatus("saved");
      this.toast(this.t("settings_saved"));
    } catch (error) { this.setStatus("error"); this.toast(this.localizeError(error.message)); }
  },

  addPendingFiles(fileList) {
    const existingKeys = new Set(this.pendingFiles.map((file) => `${file.name}-${file.size}-${file.lastModified}`));
    [...fileList].forEach((file) => {
      const key = `${file.name}-${file.size}-${file.lastModified}`;
      if (!existingKeys.has(key)) {
        existingKeys.add(key);
        this.pendingFiles.push(file);
      }
    });
  },

  onFileInputChange(event) {
    this.addPendingFiles(event.target.files);
    event.target.value = "";
  },

  removePendingFile(index) {
    this.pendingFiles.splice(index, 1);
  },

  onDropzoneDrop(event) {
    event.preventDefault();
    this.dragOver = false;
    if (event.dataTransfer?.files?.length) this.addPendingFiles(event.dataTransfer.files);
  },

  async uploadFiles() {
    const files = this.pendingFiles;
    if (!files.length) return this.toast(this.t("choose_audio_first"));
    const baseName = this.transcriptionName.trim();
    if (!baseName) {
      document.getElementById("setting-transcription-name").reportValidity();
      return this.toast(this.t("transcription_name_required"));
    }
    const names = nextTranscriptionNames(baseName, files.length);
    const form = new FormData();
    files.forEach((file, index) => {
      form.append("audio", file);
      form.append("names", names[index]);
    });
    try {
      this.setStatus("importing");
      await api(`/api/projects/${this.project.id}/interviews`, { method: "POST", body: form });
      this.pendingFiles = [];
      await this.refreshProject();
      this.setStatus("ready");
      this.toast(this.t("audio_imported"));
      this.showView("transcribe");
    } catch (error) { this.setStatus("error"); this.toast(this.localizeError(error.message)); }
  },

  async deleteInterview(interview) {
    if (!(await confirmDialog(this.t("delete_interview_confirm", { name: interview.name })))) return;
    try {
      await api(`/api/projects/${this.project.id}/interviews/${interview.id}`, { method: "DELETE" });
      this.transcriptCache.delete(interview.id);
      if (this.reviewInterviewId === interview.id) {
        this.reviewInterviewId = null;
        this.transcript = null;
        this.reviewDirty = false;
      }
      if (this.analysisInterviewId === interview.id) this.analysisInterviewId = null;
      await this.refreshProject();
      await this.loadFirstReview();
      this.toast(this.t("interview_deleted"));
    } catch (error) { this.toast(this.localizeError(error.message)); }
  },

  async refreshProject() {
    this.project = await api(`/api/projects/${this.project.id}`);
    document.title = `${this.project.name} · Interview Analysis Tool`;
    this.prefillTranscriptionName();
  },

  async startTranscription(interview) {
    try {
      if (this.reviewDirty && interview.id === this.reviewInterviewId) {
        return this.toast(this.t("save_or_discard_review"));
      }
      if (["needs_review", "reviewing", "reviewed"].includes(interview.status)) {
        if (!(await confirmDialog(this.t("retranscribe_confirm")))) return;
      }
      const job = await api(`/api/projects/${this.project.id}/interviews/${interview.id}/transcribe`, { method: "POST" });
      this.jobs.set(job.id, job);
      this.pollJob(job.id);
    } catch (error) { this.toast(this.localizeError(error.message)); }
  },

  async transcribeAll() {
    const candidates = this.transcribableInterviews();
    if (!candidates.length) return this.toast(this.t("nothing_to_transcribe"));
    for (const interview of candidates) {
      await this.startTranscription(interview);
    }
  },

  async resumeActiveJobs() {
    try {
      const activeJobs = await api(`/api/projects/${this.project.id}/jobs`);
      activeJobs.forEach((job) => {
        job.displayPercent = job.percent || 0;
        this.jobs.set(job.id, job);
        this.pollJob(job.id);
      });
    } catch (_) { /* best-effort: missing jobs endpoint support shouldn't block project loading */ }
  },

  async pollJob(jobId) {
    try {
      const job = await api(`/api/jobs/${jobId}`);
      const previous = this.jobs.get(jobId);
      job.displayPercent = Math.max(job.percent || 0, previous?.displayPercent || 0);
      this.jobs.set(jobId, job);
      notify();
      if (["queued", "running"].includes(job.status)) {
        setTimeout(() => this.pollJob(jobId), 1000);
        return;
      }
      await this.refreshProject();
      await this.loadFirstReview();
      this.toast(job.status === "done" ? this.t("transcription_complete") : this.localizeError(job.error || this.t("transcription_failed")));
    } catch (error) { this.toast(this.localizeError(error.message)); }
  },

  async loadFirstReview() {
    const reviewable = this.reviewableInterviews();
    const preferred = reviewable.some((item) => item.id === this.reviewInterviewId) ? this.reviewInterviewId : reviewable[0]?.id;
    if (this.reviewDirty && preferred === this.reviewInterviewId) return;
    if (preferred) await this.loadReview(preferred);
    else { this.reviewInterviewId = null; this.transcript = null; }
  },

  async onReviewInterviewChange(interviewId) {
    if (this.reviewDirty && !(await confirmDialog(this.t("discard_transcript")))) return;
    await this.loadReview(interviewId);
  },

  async loadReview(interviewId) {
    if (!interviewId) return;
    try {
      this.setStatus("loading_transcript");
      this.reviewInterviewId = interviewId;
      this.audioCurrentTime = 0;
      this.transcript = await api(`/api/projects/${this.project.id}/interviews/${interviewId}/transcript`);
      this.reviewDirty = false;
      this.transcriptCache.set(interviewId, this.transcript);
      this.setStatus("ready");
    } catch (error) { this.setStatus("error"); this.toast(this.localizeError(error.message)); }
  },

  seekTo(time) {
    const player = document.getElementById("audio-player");
    player.currentTime = time;
    player.play();
  },

  onAudioTimeUpdate(time) {
    this.audioCurrentTime = time;
  },

  markReviewDirty() {
    this.reviewDirty = true;
    this.statusKey = "unsaved_transcript";
  },

  setSpeaker(segment, speaker) {
    segment.speaker = speaker;
    this.markReviewDirty();
  },

  setReviewed(segment, checked) {
    segment.reviewed = checked;
    this.markReviewDirty();
  },

  onTimeChange(segment, field, rawValue) {
    const value = Number(rawValue);
    if (!Number.isFinite(value) || value < 0) return;
    segment[field] = value;
    if (segment.end < segment.start) segment.end = segment.start;
    this.markReviewDirty();
  },

  async deleteSegment(segment) {
    if (!(await confirmDialog(this.t("delete_segment_confirm")))) return;
    segment.deleted = true;
    this.markReviewDirty();
  },

  addSegmentAtPlayhead() {
    if (!this.transcript) return;
    const player = document.getElementById("audio-player");
    const start = Number.isFinite(player.currentTime) ? player.currentTime : 0;
    const index = this.transcript.segments.findIndex((segment) => !segment.deleted && segment.start > start);
    const insertion = index < 0 ? this.transcript.segments.length : index;
    const nextStart = index < 0 ? (Number.isFinite(player.duration) ? player.duration : start + 5) : this.transcript.segments[index].start;
    this.transcript.segments.splice(insertion, 0, newSegment(start, Math.min(start + 5, nextStart)));
    this.markReviewDirty();
  },

  addSegmentAfter(segment) {
    const index = this.transcript.segments.indexOf(segment);
    const next = this.transcript.segments.slice(index + 1).find((item) => !item.deleted);
    const player = document.getElementById("audio-player");
    const duration = Number.isFinite(player.duration) ? player.duration : segment.end + 5;
    this.transcript.segments.splice(index + 1, 0, newSegment(segment.end, Math.min(segment.end + 5, next?.start ?? duration)));
    this.markReviewDirty();
  },

  markAllReviewed() {
    if (!this.transcript) return;
    const missing = this.transcript.segments.filter((segment) => !segment.deleted && !segment.speaker).length;
    if (missing) return this.toast(this.t(missing === 1 ? "missing_speakers_one" : "missing_speakers_many", { count: missing }));
    this.transcript.segments.filter((segment) => !segment.deleted).forEach((segment) => { segment.reviewed = true; });
    this.markReviewDirty();
  },

  async saveTranscript() {
    if (!this.transcript) return;
    try {
      this.setStatus("saving");
      this.transcript = await api(`/api/projects/${this.project.id}/interviews/${this.reviewInterviewId}/transcript`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ revision: this.transcript.revision, segments: this.transcript.segments }),
      });
      this.transcriptCache.set(this.reviewInterviewId, this.transcript);
      this.reviewDirty = false;
      await this.refreshProject();
      await this.preloadReviewedTranscripts();
      this.setStatus("saved");
      this.toast(this.t("transcript_saved"));
    } catch (error) { this.setStatus("error"); this.toast(this.localizeError(error.message)); }
  },

  async preloadReviewedTranscripts() {
    await Promise.all(this.reviewedInterviews().map(async (interview) => {
      if (!this.transcriptCache.has(interview.id)) {
        this.transcriptCache.set(interview.id, await api(`/api/projects/${this.project.id}/interviews/${interview.id}/transcript`));
      }
    }));
  },

  onAnalysisInterviewChange(interviewId) {
    this.analysisInterviewId = interviewId;
    this.selection = null;
  },

  captureSelection(event, segment) {
    const element = event.currentTarget;
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed || !element.contains(selection.anchorNode) || !element.contains(selection.focusNode)) return;
    const range = selection.getRangeAt(0);
    const prefix = range.cloneRange();
    prefix.selectNodeContents(element);
    prefix.setEnd(range.startContainer, range.startOffset);
    const quote = range.toString();
    if (!quote.trim()) return;
    const start = prefix.toString().length;
    const interview = this.currentAnalysisInterview();
    this.selection = { interview_id: interview?.id, segment_id: segment.id, start, end: start + quote.length, quote };
  },

  applyCode(codeId) {
    if (!this.selection) return;
    const duplicate = this.analysis.codings.some((coding) => coding.interview_id === this.selection.interview_id && coding.segment_id === this.selection.segment_id && coding.start === this.selection.start && coding.end === this.selection.end && coding.code_id === codeId);
    if (!duplicate) this.analysis.codings.push({ id: uid("coding"), ...this.selection, code_id: codeId, origin: "manual", created_at: new Date().toISOString() });
    this.selection = null;
    window.getSelection()?.removeAllRanges();
    this.markAnalysisDirty();
  },

  removeCoding(codingId) {
    this.analysis.codings = this.analysis.codings.filter((coding) => coding.id !== codingId);
    this.markAnalysisDirty();
  },

  markAnalysisDirty() {
    this.analysisDirty = true;
    this.statusKey = "unsaved_analysis";
  },

  async saveAnalysis() {
    try {
      this.setStatus("saving");
      this.analysis = await api(`/api/projects/${this.project.id}/analysis`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.analysis),
      });
      this.analysisDirty = false;
      this.setStatus("saved");
      this.toast(this.t("analysis_saved"));
    } catch (error) { this.setStatus("error"); this.toast(this.localizeError(error.message)); }
  },

  openCodeDialog(code = null, applyAfter = false) {
    this.codeDraft = code
      ? { id: code.id, name: code.name, description: code.description, color: code.color, origin: code.origin, applyAfter }
      : { id: "", name: "", description: "", color: ["#7357c6", "#3f86a8", "#c26a54", "#5b9279"][this.analysis.codes.length % 4], applyAfter };
    document.getElementById("code-dialog").showModal();
  },

  saveCode(event) {
    event.preventDefault();
    const id = this.codeDraft.id || uid("code");
    const existing = this.codeById(id);
    const code = { id, name: this.codeDraft.name.trim(), description: this.codeDraft.description.trim(), color: this.codeDraft.color, origin: existing?.origin || "manual" };
    if (existing) Object.assign(existing, code); else this.analysis.codes.push(code);
    const applyAfter = this.codeDraft.applyAfter;
    document.getElementById("code-dialog").close();
    this.markAnalysisDirty();
    if (applyAfter && this.selection) this.applyCode(id);
  },

  async deleteCode() {
    const id = this.codeDraft.id;
    if (!id || !(await confirmDialog(this.t("delete_code_confirm")))) return;
    this.analysis.codes = this.analysis.codes.filter((code) => code.id !== id);
    this.analysis.codings = this.analysis.codings.filter((coding) => coding.code_id !== id);
    this.analysis.suggestions = this.analysis.suggestions.filter((suggestion) => suggestion.code_id !== id);
    this.analysis.themes.forEach((theme) => { theme.code_ids = (theme.code_ids || []).filter((codeId) => codeId !== id); });
    document.getElementById("code-dialog").close();
    this.markAnalysisDirty();
  },

  openThemeDialog(theme = null) {
    this.themeDraft = theme
      ? { id: theme.id, name: theme.name, description: theme.description, codeIds: [...(theme.code_ids || [])] }
      : { id: "", name: "", description: "", codeIds: [] };
    document.getElementById("theme-dialog").showModal();
  },

  saveTheme(event) {
    event.preventDefault();
    const id = this.themeDraft.id || uid("theme");
    const existing = this.themeById(id);
    const theme = { id, name: this.themeDraft.name.trim(), description: this.themeDraft.description.trim(), parent_id: null, code_ids: [...this.themeDraft.codeIds] };
    if (existing) Object.assign(existing, theme); else this.analysis.themes.push(theme);
    document.getElementById("theme-dialog").close();
    this.markAnalysisDirty();
  },

  async deleteTheme() {
    const id = this.themeDraft.id;
    if (!id || !(await confirmDialog(this.t("delete_theme_confirm")))) return;
    this.analysis.themes = this.analysis.themes.filter((theme) => theme.id !== id);
    document.getElementById("theme-dialog").close();
    this.markAnalysisDirty();
  },

  async confirmAiExport(event) {
    event.preventDefault();
    if (await confirmDialog(this.t("ai_privacy_confirm"), { confirmLabel: this.t("prepare_ai") })) {
      window.location.href = this.aiBundleHref();
    }
  },

  async importAiSuggestions(event) {
    const file = event.target.files[0];
    if (!file) return;
    try {
      const payload = JSON.parse(await file.text());
      if (!Array.isArray(payload.codes) || !Array.isArray(payload.codings)) throw new Error(this.t("invalid_ai_file"));
      await this.preloadReviewedTranscripts();
      const codeMap = new Map();
      payload.codes.forEach((incoming) => {
        const name = String(incoming.name || "").trim();
        if (!name) return;
        let code = this.analysis.codes.find((item) => item.name.toLowerCase() === name.toLowerCase());
        if (!code) {
          const color = /^#[0-9a-f]{6}$/i.test(incoming.color) ? incoming.color : "#6874b8";
          code = { id: uid("code"), name, description: String(incoming.description || ""), color, origin: "ai" };
          this.analysis.codes.push(code);
        }
        codeMap.set(name.toLowerCase(), code.id);
      });
      (payload.themes || []).forEach((incoming) => {
        const name = String(incoming.name || "").trim();
        if (!name) return;
        let theme = this.analysis.themes.find((item) => item.name.toLowerCase() === name.toLowerCase());
        if (!theme) {
          theme = { id: uid("theme"), name, description: String(incoming.description || ""), parent_id: null, code_ids: [] };
          this.analysis.themes.push(theme);
        }
        theme.code_ids = [...new Set([...(theme.code_ids || []), ...(incoming.code_names || []).map((item) => codeMap.get(String(item).toLowerCase())).filter(Boolean)])];
      });
      let imported = 0, skipped = 0;
      payload.codings.forEach((incoming) => {
        const interviewId = String(incoming.interview_id || ""), segmentId = String(incoming.segment_id || "");
        const segment = this.segmentById(interviewId, segmentId), quote = String(incoming.quote || "");
        const start = segment?.text.indexOf(quote) ?? -1;
        if (!segment || !quote || start < 0 || segment.text.lastIndexOf(quote) !== start) { skipped += 1; return; }
        (incoming.code_names || []).forEach((name) => {
          const codeId = codeMap.get(String(name).toLowerCase());
          if (!codeId) return;
          this.analysis.suggestions.push({ id: uid("suggestion"), interview_id: interviewId, segment_id: segmentId, start, end: start + quote.length, quote, code_id: codeId, rationale: String(incoming.rationale || ""), created_at: new Date().toISOString() });
          imported += 1;
        });
      });
      this.markAnalysisDirty();
      this.toast(`${this.t("suggestions_imported", { count: imported })}${skipped ? this.t("suggestions_skipped", { count: skipped }) : ""}.`);
    } catch (error) { this.toast(this.t("import_failed", { message: error.message })); }
    finally { event.target.value = ""; }
  },

  resolveSuggestion(suggestion, accept) {
    if (accept) {
      const { rationale, ...coding } = suggestion;
      this.analysis.codings.push({ ...coding, id: uid("coding"), origin: "ai-reviewed", rationale });
    }
    this.analysis.suggestions = this.analysis.suggestions.filter((item) => item.id !== suggestion.id);
    this.markAnalysisDirty();
  },
};

const store = Object.assign(
  {
    language: initialLanguage === "en" ? "en" : "de",
    view: initialView,
    statusKey: "ready",
    toastMessage: "",
    toastVisible: false,
    toastTimer: null,
    projects: [],
    project: null,
    gpu: null,
    transcript: null,
    reviewInterviewId: null,
    reviewDirty: false,
    audioCurrentTime: 0,
    analysis: null,
    analysisInterviewId: null,
    analysisDirty: false,
    transcriptCache: new Map(),
    selection: null,
    hoveredCodeId: null,
    jobs: new Map(),
    pendingFiles: [],
    dragOver: false,
    transcriptionName: "",
    projectDraft: { name: "", language: "de" },
    codeDraft: { id: "", name: "", description: "", color: "#7357c6", applyAfter: false },
    themeDraft: { id: "", name: "", description: "", codeIds: [] },
  },
  queries,
);

Object.keys(actions).forEach((key) => {
  const original = actions[key];
  store[key] = function (...args) {
    const result = original.apply(store, args);
    if (result instanceof Promise) return result.finally(notify);
    notify();
    return result;
  };
});

const html = htm.bind(React.createElement);

function useStoreVersion() {
  React.useSyncExternalStore(subscribe, getVersion, getVersion);
}

function Header(s) {
  return html`
    <header class="topbar">
      <a class="brand" href="/" aria-label=${s.t("home")}>
        <span class="brand-mark">IA</span>
        <span><strong>Interview Analysis Tool</strong></span>
      </a>
      ${s.projects.length > 0 && html`
        <div class="project-switcher">
          <label for="project-select">${s.t("project")}</label>
          <select id="project-select" value=${s.project?.id || ""} onChange=${(e) => s.selectProject(e.target.value)}>
            ${s.projects.map((p) => html`<option key=${p.id} value=${p.id}>${p.name}</option>`)}
          </select>
          <button type="button" onClick=${() => s.openProjectDialog()}>${s.t("new_project")}</button>
        </div>
      `}
      <div class="language-switcher" role="group" aria-label=${s.t("choose_language")}>
        <button type="button" onClick=${() => s.setLanguage("de")} aria-pressed=${s.language === "de"}>DE</button>
        <button type="button" onClick=${() => s.setLanguage("en")} aria-pressed=${s.language === "en"}>EN</button>
      </div>
      <span id="global-status" role="status">${s.t(s.statusKey)}</span>
    </header>
  `;
}

function EmptyState(s) {
  return html`
    <div class="empty-state">
      <div class="empty-card">
        <span class="eyebrow">${s.t("welcome")}</span>
        <h1>${s.t("hero_title")}</h1>
        <p>${s.t("hero_body")}</p>
        <button class="primary large" type="button" onClick=${() => s.openProjectDialog()}>${s.t("create_project")}</button>
      </div>
    </div>
  `;
}

function Sidebar(s) {
  const steps = [
    ["import", "import", "project_and_audio"],
    ["transcribe", "transcribe", "local_asr"],
    ["review", "review", "text_and_speakers"],
    ["analyse", "analyse", "codes_memos_themes"],
  ];
  return html`
    <aside class="workflow-sidebar">
      <div class="project-title">
        <span class="eyebrow">${s.t("current_project")}</span>
        <h1>${s.project.name}</h1>
      </div>
      <nav class="workflow" aria-label="Workflow">
        ${steps.map(([key, titleKey, subKey], index) => html`
          <button key=${key} class=${`step${s.view === key ? " active" : ""}`} onClick=${() => s.showView(key)}>
            <span>${index + 1}</span><b>${s.t(titleKey)}</b><small>${s.t(subKey)}</small>
          </button>
        `)}
      </nav>
      <div class="sidebar-footer">
        <a class="button ghost" href=${`/api/projects/${s.project.id}/export.zip`}>${s.t("export_without_audio")}</a>
        <a class="button ghost" href=${`/api/projects/${s.project.id}/export.zip?include_media=1`}>${s.t("full_backup")}</a>
      </div>
    </aside>
  `;
}

function ImportView(s) {
  const settings = s.project.settings;
  const interviews = s.project.interviews || [];
  return html`
    <section class=${`view${s.view === "import" ? " active" : ""}`}>
      <div class="page-heading">
        <div><span class="eyebrow">${s.t("step_1")}</span><h2>${s.t("setup_project")}</h2></div>
        <button type="button" onClick=${() => s.saveSettings()}>${s.t("save_settings")}</button>
      </div>
      <div class="two-column">
        <form class="panel form-grid" onSubmit=${(e) => e.preventDefault()}>
          <h3>${s.t("transcription")}</h3>
          <label class="span-2"><span>${s.t("transcription_name")}</span>
            <input id="setting-transcription-name" required maxlength="120" value=${s.transcriptionName} onChange=${(e) => { s.transcriptionName = e.target.value; s.touch(); }} />
          </label>
          <label><span>${s.t("language")}</span>
            <select value=${settings.language} onChange=${(e) => { settings.language = e.target.value; s.touch(); }}>
              <option value="auto">${s.t("detect_automatically")}</option>
              <option value="de">${s.t("german")}</option>
              <option value="en">${s.t("english")}</option>
              <option value="fr">${s.t("french")}</option>
              <option value="es">${s.t("spanish")}</option>
              <option value="it">${s.t("italian")}</option>
            </select>
          </label>
          <label><span>${s.t("whisper_model")}</span>
            <select value=${settings.model} onChange=${(e) => { settings.model = e.target.value; s.touch(); }}>
              <option value="tiny">${s.t("model_tiny")}</option>
              <option value="base">base</option>
              <option value="small">${s.t("model_small")}</option>
              <option value="medium">medium</option>
              <option value="large-v3">${s.t("model_large")}</option>
            </select>
          </label>
          <label><span>${s.t("device")}</span>
            <select value=${settings.device} onChange=${(e) => { settings.device = e.target.value; s.touch(); }}>
              <option value="auto">${s.t("automatic")}</option>
              <option value="cpu">CPU</option>
              <option value="cuda">NVIDIA CUDA</option>
            </select>
          </label>
          <label><span>${s.t("compute_type")}</span>
            <select value=${settings.compute_type} onChange=${(e) => { settings.compute_type = e.target.value; s.touch(); }}>
              <option value="auto">${s.t("automatic")}</option>
              <option value="int8">int8</option>
              <option value="float16">float16</option>
              <option value="float32">float32</option>
            </select>
          </label>
          <p class=${`span-2 ${s.gpuStatusClass()}`}>${s.gpuStatusText()}</p>
          <label class="span-2"><span>${s.t("whisper_context")}</span>
            <textarea rows="4" placeholder=${s.t("whisper_context_placeholder")} value=${settings.initial_prompt} onChange=${(e) => { settings.initial_prompt = e.target.value; s.touch(); }}></textarea>
          </label>
          <label class="check span-2"><input type="checkbox" checked=${Boolean(settings.diarize)} onChange=${(e) => { settings.diarize = e.target.checked; s.touch(); }} /> <span>${s.t("use_diarization")}</span></label>
        </form>
        <div class="panel upload-panel">
          <h3>${s.t("recordings")}</h3>
          <p>${s.t("supported_formats")}</p>
          ${s.pendingFiles.length > 0 && html`
            <div class="pending-files">
              <small class="muted">${s.uploadCountLabel()}</small>
              <ul>
                ${s.pendingFiles.map((file, index) => html`
                  <li key=${`${file.name}-${file.size}-${file.lastModified}`}>
                    <span title=${file.name}>${file.name}</span>
                    <button type="button" class="icon" aria-label=${s.t("remove_file")} title=${s.t("remove_file")} onClick=${() => s.removePendingFile(index)}>×</button>
                  </li>
                `)}
              </ul>
            </div>
          `}
          <label class=${`dropzone${s.pendingFiles.length > 0 ? " has-files" : ""}${s.dragOver ? " drag-over" : ""}`} for="audio-files"
                 onDragEnter=${(e) => { e.preventDefault(); s.dragOver = true; s.touch(); }}
                 onDragOver=${(e) => { e.preventDefault(); s.dragOver = true; s.touch(); }}
                 onDragLeave=${() => { s.dragOver = false; s.touch(); }}
                 onDragEnd=${() => { s.dragOver = false; s.touch(); }}
                 onDrop=${(e) => s.onDropzoneDrop(e)}>
            <strong>${s.t("select_audio")}</strong>
            <span>${s.t("drop_audio")}</span>
            <input id="audio-files" type="file" accept="audio/*,.m4a,.mp4" multiple hidden onChange=${(e) => s.onFileInputChange(e)} />
          </label>
          <button class="primary wide" type="button" onClick=${() => s.uploadFiles()}>${s.t("import_selected")}</button>
        </div>
      </div>
      <div class="panel">
        <h3>${s.t("imported_interviews")}</h3>
        ${interviews.length > 0 ? html`
          <div class="interview-grid">
            ${interviews.map((interview) => {
              const job = s.jobFor(interview.id);
              return html`
                <article class="interview-card" key=${interview.id}>
                  <strong title=${interview.source_filename}>${interview.name}</strong>
                  <span class=${`status ${interview.status}`}>${job ? s.jobLabel(interview) : s.statusLabel(interview.status)}</span>
                  ${job && html`<div class="progress-track"><div class="progress-fill" style=${{ width: `${job.displayPercent ?? job.percent ?? 0}%` }}></div></div>`}
                  <small>${interview.duration_seconds ? `${(interview.duration_seconds / 60).toFixed(1)} min` : s.t("no_duration")}</small>
                  ${interview.error && html`<small>${s.localizeError(interview.error)}</small>`}
                  <div class="card-actions">
                    ${interview.status === "failed" && html`<button type="button" class="ghost small" onClick=${() => s.startTranscription(interview)}>${s.t("retranscribe")}</button>`}
                    <button type="button" class="danger small" onClick=${() => s.deleteInterview(interview)}>${s.t("delete")}</button>
                  </div>
                </article>
              `;
            })}
          </div>
        ` : html`<p class="muted">${s.t("no_interviews")}</p>`}
      </div>
    </section>
  `;
}

function TranscribeView(s) {
  const interviews = s.project.interviews || [];
  return html`
    <section class=${`view${s.view === "transcribe" ? " active" : ""}`}>
      <div class="page-heading">
        <div><span class="eyebrow">${s.t("step_2")}</span><h2>${s.t("transcribe")}</h2><p>${s.t("transcription_local_hint")}</p><p class=${s.gpuStatusClass()}>${s.gpuStatusText()}</p></div>
        <button type="button" disabled=${s.transcribableInterviews().length === 0} onClick=${() => s.transcribeAll()}>${s.t("transcribe_all")}</button>
      </div>
      ${interviews.length > 0 ? html`
        <div class="job-list">
          ${interviews.map((interview) => {
            const job = s.jobFor(interview.id);
            return html`
              <article class="panel job-card" key=${interview.id}>
                <div>
                  <h3>${interview.name}</h3>
                  <p>${s.jobLabel(interview)}</p>
                  ${job && html`<div class="progress-track"><div class="progress-fill" style=${{ width: `${job.displayPercent ?? job.percent ?? 0}%` }}></div></div>`}
                </div>
                <button type="button" disabled=${!s.canStartTranscription(interview)} onClick=${() => s.startTranscription(interview)}>
                  ${["needs_review", "reviewed", "reviewing"].includes(interview.status) ? s.t("retranscribe") : s.t("transcribe")}
                </button>
              </article>
            `;
          })}
        </div>
      ` : html`<div class="notice">${s.t("import_audio_first")}</div>`}
    </section>
  `;
}

function ReviewView(s) {
  const segments = s.visibleSegments();
  const activeId = s.activeSegmentId();
  return html`
    <section class=${`view${s.view === "review" ? " active" : ""}`}>
      <div class="page-heading">
        <div><span class="eyebrow">${s.t("step_3")}</span><h2>${s.t("review_transcript")}</h2></div>
        <div class="inline-actions">
          <select value=${s.reviewInterviewId || ""} onChange=${(e) => s.onReviewInterviewChange(e.target.value)}>
            ${s.reviewableInterviews().map((item) => html`<option key=${item.id} value=${item.id}>${item.name}</option>`)}
          </select>
          <button type="button" onClick=${() => s.saveTranscript()}>${s.t("save_transcript")}</button>
        </div>
      </div>
      ${!s.reviewInterviewId && html`<div class="notice">${s.t("review_empty")}</div>`}
      ${s.reviewInterviewId && html`
        <div>
          <div class="audio-bar">
            <audio id="audio-player" controls src=${s.audioSrc()} onTimeUpdate=${(e) => s.onAudioTimeUpdate(e.target.currentTime)}></audio>
            <span>${s.reviewProgressText()}</span>
            <button class="ghost" type="button" onClick=${() => s.addSegmentAtPlayhead()}>${s.t("segment_at_playhead")}</button>
            <button class="ghost" type="button" onClick=${() => s.markAllReviewed()}>${s.t("mark_all_reviewed")}</button>
          </div>
          <div class="segments">
            ${segments.map((segment) => html`
              <article class=${`segment${segment.id === activeId ? " active" : ""}`} key=${segment.id}>
                <div class="segment-time">
                  <time>${formatTime(segment.start)}–${formatTime(segment.end)}</time>
                  <button type="button" class="ghost small seek-btn" onClick=${() => s.seekTo(segment.start)} title=${s.t("play_from_here")} aria-label=${s.t("play_from_here")}>▶</button>
                  <div class="time-inputs">
                    <label><span>${s.t("start_short")}</span><input type="number" min="0" step="0.1" value=${segment.start} onChange=${(e) => s.onTimeChange(segment, "start", e.target.value)} aria-label=${s.t("start_time")} /></label>
                    <label><span>${s.t("end_short")}</span><input type="number" min="0" step="0.1" value=${segment.end} onChange=${(e) => s.onTimeChange(segment, "end", e.target.value)} aria-label=${s.t("end_time")} /></label>
                  </div>
                </div>
                <div>
                  <textarea value=${segment.text} onChange=${(e) => { segment.text = e.target.value; s.markReviewDirty(); }} aria-label=${s.t("transcript_text")}></textarea>
                  ${segment.diarization_speaker && html`<p class="muted">${s.t("diarization")}: ${segment.diarization_speaker}</p>`}
                  ${segment.asr_text && segment.asr_text !== segment.text && html`
                    <details><summary>${s.t("show_asr_original")}</summary><p>${segment.asr_text}</p></details>
                  `}
                </div>
                <div class="speaker-buttons">
                  <button type="button" class=${segment.speaker === "interviewer" ? "selected" : ""} onClick=${() => s.setSpeaker(segment, "interviewer")}>${s.t("interviewer")}</button>
                  <button type="button" class=${segment.speaker === "interviewee" ? "selected" : ""} onClick=${() => s.setSpeaker(segment, "interviewee")}>${s.t("interviewee")}</button>
                  <button type="button" class=${segment.speaker === "other" ? "selected" : ""} onClick=${() => s.setSpeaker(segment, "other")}>${s.t("other_role")}</button>
                  <button type="button" class="ghost" onClick=${() => s.addSegmentAfter(segment)}>${s.t("add_after")}</button>
                  <button type="button" class="danger" onClick=${() => s.deleteSegment(segment)}>${s.t("delete")}</button>
                </div>
                <label class="review-check"><input type="checkbox" checked=${segment.reviewed} onChange=${(e) => s.setReviewed(segment, e.target.checked)} /> ${s.t("reviewed_label")}</label>
              </article>
            `)}
          </div>
        </div>
      `}
    </section>
  `;
}

function AnalyseView(s) {
  if (!s.analysis) return null;
  const analysisSegments = s.visibleAnalysisSegments();
  const current = s.currentAnalysisInterview();
  return html`
    <section class=${`view${s.view === "analyse" ? " active" : ""}`}>
      <div class="page-heading">
        <div><span class="eyebrow">${s.t("step_4")}</span><h2>${s.t("rta")}</h2></div>
        <div class="inline-actions">
          <button type="button" onClick=${() => s.saveAnalysis()}>${s.t("save_analysis")}</button>
          <a class="button ghost" href=${s.aiBundleHref()} onClick=${(e) => s.confirmAiExport(e)}>${s.t("prepare_ai")}</a>
          <button class="ghost" type="button" onClick=${() => document.getElementById("ai-file").click()}>${s.t("import_ai")}</button>
          <input id="ai-file" type="file" accept="application/json,.json" hidden onChange=${(e) => s.importAiSuggestions(e)} />
        </div>
      </div>
      <div class="analysis-context panel">
        <label><span>${s.t("research_question")}</span><input value=${s.analysis.research_question || ""} placeholder=${s.t("research_question_placeholder")} onChange=${(e) => { s.analysis.research_question = e.target.value; s.markAnalysisDirty(); }} /></label>
        <label><span>${s.t("reflexive_memo")}</span><textarea rows="3" value=${s.analysis.reflexive_memo || ""} placeholder=${s.t("memo_placeholder")} onChange=${(e) => { s.analysis.reflexive_memo = e.target.value; s.markAnalysisDirty(); }}></textarea></label>
      </div>
      <div class="analysis-layout">
        <div class="panel source-panel">
          <div class="panel-heading"><h3>${s.t("material")}</h3>
            <select value=${current?.id || ""} onChange=${(e) => s.onAnalysisInterviewChange(e.target.value)}>
              ${s.reviewedInterviews().map((item) => html`<option key=${item.id} value=${item.id}>${item.name}</option>`)}
            </select>
          </div>
          ${s.analysisWarningVisible() && html`<div class="notice">${s.t("finish_review_first")}</div>`}
          <div class="analysis-segments">
            ${analysisSegments.length > 0 ? analysisSegments.map((segment) => {
              const codings = s.codingsFor(segment.id);
              return html`
                <article class=${`analysis-segment ${segment.speaker}`} key=${segment.id}>
                  <div class="segment-meta">${s.speakerLabel(segment)} · ${formatTime(segment.start)}–${formatTime(segment.end)}</div>
                  <div class="segment-text" onMouseUp=${(e) => s.captureSelection(e, segment)} dangerouslySetInnerHTML=${{ __html: s.annotatedText(segment.text, codings) }}></div>
                  <div class="coding-row">
                    ${codings.map((coding) => html`
                      <button key=${coding.id} class="coding-chip" style=${{ "--chip": s.codeById(coding.code_id).color }} title=${s.t("remove_coding")} onClick=${() => s.removeCoding(coding.id)}>
                        ${s.codeById(coding.code_id).name} ×
                      </button>
                    `)}
                  </div>
                </article>
              `;
            }) : html`<p class="muted">${s.t("no_reviewed_material")}</p>`}
          </div>
        </div>
        <aside class="analysis-sidebar">
          ${s.selection && html`
            <div class="panel selection-box">
              <span class="eyebrow">${s.t("selected_passage")}</span><blockquote>${s.selection.quote.trim()}</blockquote>
              <div class="chip-list">
                ${s.analysis.codes.map((code) => html`<button key=${code.id} type="button" style=${{ borderLeft: `4px solid ${code.color}` }} onClick=${() => s.applyCode(code.id)}>${code.name}</button>`)}
              </div>
              <button class="wide" type="button" onClick=${() => s.openCodeDialog(null, true)}>${s.t("create_new_code")}</button>
            </div>
          `}
          <div class="panel">
            <div class="panel-heading"><h3>${s.t("codebook")}</h3><button class="small" type="button" onClick=${() => s.openCodeDialog()}>+ ${s.t("code")}</button></div>
            ${s.analysis.codes.length > 0 ? html`
              <div class="stack-list">
                ${s.analysis.codes.map((code) => html`
                  <button key=${code.id} class="stack-item" style=${{ borderLeft: `4px solid ${code.color}` }} onClick=${() => s.openCodeDialog(code)} onMouseEnter=${() => s.setHoveredCode(code.id)} onMouseLeave=${() => s.setHoveredCode(null)}>
                    <strong>${code.name}</strong>
                    <small>${s.t(s.codingCount(code.id) === 1 ? "occurrences_one" : "occurrences_many", { count: s.codingCount(code.id) })}${code.origin === "ai" ? ` · ${s.t("ai_short")}` : ""}</small>
                  </button>
                `)}
              </div>
            ` : html`<p class="muted">${s.t("codebook_empty")}</p>`}
          </div>
          ${s.analysis.suggestions.length > 0 && html`
            <div class="panel">
              <div class="panel-heading"><h3>${s.t("ai_suggestions")}</h3><span class="status">${s.analysis.suggestions.length}</span></div>
              <p class="muted">${s.t("suggestions_hint")}</p>
              <div class="stack-list">
                ${s.analysis.suggestions.map((suggestion) => html`
                  <div class="stack-item" key=${suggestion.id}>
                    <strong>${s.codeById(suggestion.code_id)?.name || s.t("unknown_code")}</strong>
                    <small>&ldquo;${suggestion.quote.trim()}&rdquo;</small>
                    ${suggestion.rationale && html`<small>${suggestion.rationale}</small>`}
                    <div class="suggestion-actions">
                      <button type="button" onClick=${() => s.resolveSuggestion(suggestion, true)}>${s.t("accept")}</button>
                      <button type="button" class="ghost" onClick=${() => s.resolveSuggestion(suggestion, false)}>${s.t("reject")}</button>
                    </div>
                  </div>
                `)}
              </div>
            </div>
          `}
          <div class="panel">
            <div class="panel-heading"><h3>${s.t("themes")}</h3><button class="small" type="button" onClick=${() => s.openThemeDialog()}>+ ${s.t("theme")}</button></div>
            ${s.analysis.themes.length > 0 ? html`
              <div class="stack-list">
                ${s.analysis.themes.map((theme) => html`
                  <button key=${theme.id} class="stack-item" onClick=${() => s.openThemeDialog(theme)}>
                    <strong>${theme.name}</strong><small>${s.t("codes_count", { count: (theme.code_ids || []).length })}</small>
                  </button>
                `)}
              </div>
            ` : html`<p class="muted">${s.t("no_themes")}</p>`}
          </div>
        </aside>
      </div>
    </section>
  `;
}

function ProjectDialog(s) {
  return html`
    <dialog id="project-dialog">
      <form onSubmit=${(e) => s.createProject(e)}>
        <div class="dialog-heading"><h2>${s.t("new_project")}</h2><button class="icon" type="button" aria-label=${s.t("close")} onClick=${() => document.getElementById("project-dialog").close()}>×</button></div>
        <label><span>${s.t("project_name")}</span><input required maxlength="120" autoFocus value=${s.projectDraft.name} onChange=${(e) => { s.projectDraft.name = e.target.value; s.touch(); }} /></label>
        <label><span>${s.t("language")}</span>
          <select value=${s.projectDraft.language} onChange=${(e) => { s.projectDraft.language = e.target.value; s.touch(); }}>
            <option value="de">${s.t("german")}</option>
            <option value="en">${s.t("english")}</option>
            <option value="auto">${s.t("automatic")}</option>
          </select>
        </label>
        <footer><button type="button" class="ghost" onClick=${() => document.getElementById("project-dialog").close()}>${s.t("cancel")}</button><button class="primary" type="submit">${s.t("create_project")}</button></footer>
      </form>
    </dialog>
  `;
}

function CodeDialog(s) {
  return html`
    <dialog id="code-dialog">
      <form onSubmit=${(e) => s.saveCode(e)}>
        <div class="dialog-heading"><h2>${s.t(s.codeDraft.id ? "edit_code" : "new_code")}</h2><button class="icon" type="button" aria-label=${s.t("close")} onClick=${() => document.getElementById("code-dialog").close()}>×</button></div>
        <label><span>${s.t("name")}</span><input required maxlength="160" value=${s.codeDraft.name} onChange=${(e) => { s.codeDraft.name = e.target.value; s.touch(); }} /></label>
        <label><span>${s.t("description")}</span><textarea rows="4" value=${s.codeDraft.description} onChange=${(e) => { s.codeDraft.description = e.target.value; s.touch(); }}></textarea></label>
        <label><span>${s.t("color")}</span><input type="color" value=${s.codeDraft.color} onChange=${(e) => { s.codeDraft.color = e.target.value; s.touch(); }} /></label>
        <footer>
          ${s.codeDraft.id && html`<button class="danger" type="button" onClick=${() => s.deleteCode()}>${s.t("delete")}</button>`}
          <span class="spacer"></span>
          <button type="button" class="ghost" onClick=${() => document.getElementById("code-dialog").close()}>${s.t("cancel")}</button>
          <button type="submit">${s.t("save")}</button>
        </footer>
      </form>
    </dialog>
  `;
}

function ThemeDialog(s) {
  const codes = s.analysis?.codes || [];
  return html`
    <dialog id="theme-dialog">
      <form onSubmit=${(e) => s.saveTheme(e)}>
        <div class="dialog-heading"><h2>${s.t(s.themeDraft.id ? "edit_theme" : "new_theme")}</h2><button class="icon" type="button" aria-label=${s.t("close")} onClick=${() => document.getElementById("theme-dialog").close()}>×</button></div>
        <label><span>${s.t("name")}</span><input required maxlength="160" value=${s.themeDraft.name} onChange=${(e) => { s.themeDraft.name = e.target.value; s.touch(); }} /></label>
        <label><span>${s.t("description")}</span><textarea rows="4" value=${s.themeDraft.description} onChange=${(e) => { s.themeDraft.description = e.target.value; s.touch(); }}></textarea></label>
        <fieldset>
          <legend>${s.t("assigned_codes")}</legend>
          ${codes.length > 0 ? html`
            <div class="check-list">
              ${codes.map((code) => html`
                <label key=${code.id}>
                  <input type="checkbox" checked=${s.themeDraft.codeIds.includes(code.id)} onChange=${(e) => {
                    if (e.target.checked) s.themeDraft.codeIds.push(code.id);
                    else s.themeDraft.codeIds = s.themeDraft.codeIds.filter((id) => id !== code.id);
                    s.touch();
                  }} />
                  <span>${code.name}</span>
                </label>
              `)}
            </div>
          ` : html`<p class="muted">${s.t("create_codes_first")}</p>`}
        </fieldset>
        <footer>
          ${s.themeDraft.id && html`<button class="danger" type="button" onClick=${() => s.deleteTheme()}>${s.t("delete")}</button>`}
          <span class="spacer"></span>
          <button type="button" class="ghost" onClick=${() => document.getElementById("theme-dialog").close()}>${s.t("cancel")}</button>
          <button type="submit">${s.t("save")}</button>
        </footer>
      </form>
    </dialog>
  `;
}

function ConfirmDialogMarkup() {
  return html`
    <dialog id="confirm-dialog">
      <div class="dialog-body">
        <div class="dialog-heading"><h2 id="confirm-dialog-title">Bitte bestätigen</h2><button class="icon confirm-dialog-close" type="button" aria-label="Schließen">×</button></div>
        <p id="confirm-dialog-message"></p>
        <footer><span class="spacer"></span><button class="confirm-dialog-close ghost" type="button">Abbrechen</button><button id="confirm-dialog-ok" class="danger" type="button">Löschen</button></footer>
      </div>
    </dialog>
  `;
}

function Toast(s) {
  return html`<div class=${`toast${s.toastVisible ? " show" : ""}`} role="status">${s.toastMessage}</div>`;
}

function App() {
  useStoreVersion();
  const s = store;
  return html`
    <${React.Fragment}>
      ${Header(s)}
      ${s.projects.length === 0 && EmptyState(s)}
      ${s.project && html`
        <div class="app-shell">
          ${Sidebar(s)}
          <main>
            ${ImportView(s)}
            ${TranscribeView(s)}
            ${ReviewView(s)}
            ${AnalyseView(s)}
          </main>
        </div>
      `}
      ${ProjectDialog(s)}
      ${s.analysis && CodeDialog(s)}
      ${s.analysis && ThemeDialog(s)}
      ${ConfirmDialogMarkup()}
      ${Toast(s)}
    <//>
  `;
}

ReactDOM.createRoot(document.getElementById("root")).render(html`<${App} />`);
store.init().catch((error) => {
  store.setStatus("startup_error");
  store.toast(error.message);
});
