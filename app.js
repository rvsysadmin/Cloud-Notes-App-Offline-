function getNotes() {
  return JSON.parse(localStorage.getItem("notes") || "[]");
}

function saveNotes(notes) {
  localStorage.setItem("notes", JSON.stringify(notes));
}

function saveNote() {
  let notes = getNotes();

  let title = document.getElementById("title").value;
  let content = document.getElementById("content").value;

  let note = {
    id: Date.now(),
    title: title,
    content: content,
    time: new Date().toLocaleString(),
    pinned: false
  };

  notes.push(note);

  saveNotes(notes);

  document.getElementById("title").value = "";
  document.getElementById("content").value = "";

  renderNotes();
}

function renderNotes() {
  let notes = getNotes();

  // pinned notes top pe
  notes.sort((a, b) => b.pinned - a.pinned);

  document.getElementById("notes").innerHTML = notes.map(note => `
    <div class="note">
      <h3>${note.pinned ? "📌 " : ""}${note.title}</h3>

      <p>${note.content}</p>

      <small>${note.time}</small>

      <br><br>

      <button onclick="deleteNote(${note.id})">
        Delete
      </button>

      <button onclick="pinNote(${note.id})">
        ${note.pinned ? "Unpin" : "Pin"}
      </button>
    </div>
  `).join("");
}

function deleteNote(id) {
  let notes = getNotes().filter(note => note.id !== id);

  saveNotes(notes);

  renderNotes();
}

function pinNote(id) {
  let notes = getNotes();

  notes = notes.map(note => {
    if (note.id === id) {
      note.pinned = !note.pinned;
    }

    return note;
  });

  saveNotes(notes);

  renderNotes();
}

function searchNotes() {
  let query = document.getElementById("search").value.toLowerCase();

  let notes = getNotes();

  let filtered = notes.filter(note =>
    note.title.toLowerCase().includes(query) ||
    note.content.toLowerCase().includes(query)
  );

  document.getElementById("notes").innerHTML = filtered.map(note => `
    <div class="note">
      <h3>${note.title}</h3>
      <p>${note.content}</p>
      <small>${note.time}</small>
    </div>
  `).join("");
}

function toggleDark() {
  document.body.classList.toggle("dark");
}

window.onload = renderNotes;

// Service Worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js")
      .then(() => {
        console.log("Service Worker Registered");
      })
      .catch(err => {
        console.log(err);
      });
  });
}
