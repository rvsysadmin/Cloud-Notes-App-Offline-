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
    id: Date.now(),          // unique id
    title: title,
    content: content,
    time: new Date().toLocaleString()
  };

  notes.push(note);         // new note add
  saveNotes(notes);         // localStorage me save

  document.getElementById("title").value = "";
  document.getElementById("content").value = "";

  renderNotes();            // screen update
}
function renderNotes() {
  let notes = getNotes();

  let notesContainer = document.getElementById("notes");

  notesContainer.innerHTML = notes.map(note => `
    <div class="note">
      <h3>${note.title}</h3>
      <p>${note.content}</p>
      <small>${note.time}</small>
      <br><br>
      <button onclick="deleteNote(${note.id})">Delete</button>
    </div>
  `).join("");
}
function deleteNote(id) {
  let notes = getNotes();

  let updatedNotes = notes.filter(note => note.id !== id);

  saveNotes(updatedNotes);

  renderNotes();
}

function searchNotes() {
  let query = document.getElementById("search").value.toLowerCase();
  let notes = getNotes();

  let filtered = notes.filter(note =>
    note.title.toLowerCase().includes(query) ||
    note.content.toLowerCase().includes(query)
  );

  document.getElementById("notes").innerHTML =
    filtered.map(note => `
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

renderNotes();
