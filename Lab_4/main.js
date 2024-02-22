const notesEl = document.querySelector('.notes');
const addBtn = document.querySelector('.note-add');

// Функция для загрузки заметок из локального хранилища
function loadNotes() {
  const savedNotes = JSON.parse(localStorage.getItem('notes'));
  if (savedNotes) {
    savedNotes.forEach(note => {
      const el = createNote(note.title, note.text, note.tag, note.color, note.pinned);
      notesEl.appendChild(el);
    });
  }
}

// Функция для создания новой заметки// Функция для создания новой заметки
function createNote(title, text, tag, color, pinned) {
  const currentDate = new Date(); // Получаем текущую дату и время

  const noteEl = document.createElement('div');
  noteEl.classList.add('note');
  noteEl.dataset.color = color;
  noteEl.style.backgroundColor = color; // Устанавливаем начальный цвет фона заметки
  noteEl.innerHTML = `
    <div class="note-header">
      <div>
        <label for="note-pin">PIN</label>
        <input type="checkbox" class="note-pin" id="note-pin" ${pinned ? 'checked' : ''}>
      </div>
      <p id="note-title">${title}</p>
      <textarea id="note-title-input" class="hidden">${title}</textarea>
      <div>
        <button class="note-edit"><i class="fa-solid fa-pen-to-square"></i></button>
        <button class="note-delete"><i class="fa-solid fa-trash"></i></button>
      </div>
    </div>
    <p id="note-text">${text}</p>
    <textarea id="note-textarea" class="hidden">${text}</textarea>
    <p>Tag: <span id="note-tag">${tag}</span></p>
    <textarea id="note-tag-input" class="hidden">${tag}</textarea>
    <div class="note-colors">
      <label for="note-color">Color:</label>
      <input type="color" class="note-color" id="note-color" value="${color}">
    </div>
    <div class="note-created-at">Created at: ${currentDate.toLocaleString()}</div>
  `;

  const editBtn = noteEl.querySelector('.note-edit');
  const deleteBtn = noteEl.querySelector('.note-delete');
  const titleEl = noteEl.querySelector('#note-title');
  const textEl = noteEl.querySelector('#note-text');
  const titleInputEl = noteEl.querySelector('#note-title-input');
  const textInputEl = noteEl.querySelector('#note-textarea');
  const tagEl = noteEl.querySelector('#note-tag');
  const tagInputEl = noteEl.querySelector('#note-tag-input');
  const colorInputEl = noteEl.querySelector('.note-color');
  const pinInputEl = noteEl.querySelector('.note-pin');

  editBtn.addEventListener('click', (e) => {
    titleEl.classList.toggle('hidden');
    textEl.classList.toggle('hidden');
    tagEl.classList.toggle('hidden');
    colorInputEl.classList.toggle('hidden');
    titleInputEl.classList.toggle('hidden');
    textInputEl.classList.toggle('hidden');
    tagInputEl.classList.toggle('hidden');
    saveNotes();
  });

  deleteBtn.addEventListener('click', (e) => {
    noteEl.remove();
    saveNotes();
  });

  titleInputEl.addEventListener('input', (e) => {
    titleEl.innerText = e.target.value;
    saveNotes();
  });

  textInputEl.addEventListener('input', (e) => {
    textEl.innerText = e.target.value;
    saveNotes();
  });

  tagInputEl.addEventListener('input', (e) => {
    tagEl.innerText = e.target.value;
    saveNotes();
  });

  colorInputEl.addEventListener('change', (e) => {
    noteEl.dataset.color = e.target.value;
    noteEl.style.backgroundColor = e.target.value; // Изменяем цвет фона заметки
    saveNotes();
  });

  pinInputEl.addEventListener('change', (e) => {
    if (pinInputEl.checked) {
      notesEl.insertBefore(noteEl, notesEl.firstChild);
    } else {
      const pinnedNotes = document.querySelectorAll('.note-pin:checked');
      if (pinnedNotes.length > 0) {
        const lastPinnedNote = pinnedNotes[pinnedNotes.length - 1].parentNode.parentNode;
        notesEl.insertBefore(noteEl, lastPinnedNote.nextSibling);
      } else {
        notesEl.insertBefore(noteEl, notesEl.firstChild);
      }
    }
    saveNotes();
  });

  return noteEl;
}

addBtn.addEventListener('click', (e) => {
  const el = createNote("Заголовок", "Ваш текст", "Тэг", "#ffff00", false); // По умолчанию цвет - желтый
  notesEl.appendChild(el);
  saveNotes();
});

loadNotes();
