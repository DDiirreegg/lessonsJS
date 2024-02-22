const notesEl = document.querySelector('.notes');
const addBtn = document.querySelector('.note-add');
const colorPicker = document.getElementById('note-color-picker');
const tagInput = document.getElementById('note-tag-input');

function createNote(title, text, color, tag, pinned) {
  const noteEl = document.createElement('div');
  noteEl.classList.add('note');
  noteEl.style.backgroundColor = color;
  if (pinned) {
    notesEl.prepend(noteEl);
  } else {
    notesEl.appendChild(noteEl);
  }

  noteEl.innerHTML = `
    <div class="note-header">
      <p class="note-title">${title}</p>
      <textarea class="note-title-input hidden">${title}</textarea>
      <div>
        <button class="note-edit"><i class="fa-solid fa-pen-to-square"></i></button>
        <button class="note-delete"><i class="fa-solid fa-trash"></i></button>
        <button class="note-pin"><i class="fa-solid fa-thumbtack"></i></button>
      </div>
    </div>
    <p class="note-text">${text}</p>
    <textarea class="note-textarea hidden">${text}</textarea>
    <p class="note-tag">Тег: ${tag}</p>
  `;

  const editBtn = noteEl.querySelector('.note-edit');
  const deleteBtn = noteEl.querySelector('.note-delete');
  const pinBtn = noteEl.querySelector('.note-pin');
  const titleEl = noteEl.querySelector('.note-title');
  const textEl = noteEl.querySelector('.note-text');
  const titleInputEl = noteEl.querySelector('.note-title-input');
  const textInputEl = noteEl.querySelector('.note-textarea');

  editBtn.addEventListener('click', () => {
    titleEl.classList.toggle('hidden');
    textEl.classList.toggle('hidden');
    titleInputEl.classList.toggle('hidden');
    textInputEl.classList.toggle('hidden');
  });

  deleteBtn.addEventListener('click', () => {
    noteEl.remove();
  });

  pinBtn.addEventListener('click', () => {
    if (noteEl.dataset.pinned === 'true') {
      notesEl.appendChild(noteEl);
      noteEl.dataset.pinned = 'false';
    } else {
      notesEl.prepend(noteEl);
      noteEl.dataset.pinned = 'true';
    }
  });

  titleInputEl.addEventListener('input', (e) => {
    titleEl.innerText = e.target.value;
  });

  textInputEl.addEventListener('input', (e) => {
    textEl.innerText = e.target.value;
  });

  return noteEl;
}

addBtn.addEventListener('click', () => {
  const color = colorPicker.value;
  const tag = tagInput.value;
  const el = createNote("Заголовок", "Ваш текст", color, tag, false);
});
