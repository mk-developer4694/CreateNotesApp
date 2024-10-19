const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");

// Function to load saved notes from localStorage
function loadNotes() {
  const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
  savedNotes.forEach(noteHTML => {
    createNote(noteHTML); // Pass saved HTML content
  });
}

// Function to create a new note
function createNote(noteHTML = "") {
  // Create a new 'p' element
  let inputBox = document.createElement("p");

  // Create a new 'img' element for the trash icon
  let img = document.createElement("img");

  // Add class to the 'p' element
  inputBox.classList.add("input-box");

  // Set the 'contenteditable' attribute to true so the 'p' is editable
  inputBox.setAttribute("contenteditable", "true");

  // Set the initial HTML of the note (if provided)
  inputBox.innerHTML = noteHTML;

  // Set the image source for the 'img' element
  img.src = "images/trash.png";
  img.classList.add("trash-icon");

  // Append 'p' to the notes container and 'img' to the 'p'
  notesContainer.appendChild(inputBox).appendChild(img);

  // Add event listener to the trash icon to remove the parent p element
  img.addEventListener("click", () => {
    inputBox.remove();
    saveNotes();
  });

  // Save notes when the content is edited
  inputBox.addEventListener("input", () => {
    saveNotes();
  });

  // Move the cursor to the beginning of the 'p' element if it’s a new note
  if (!noteHTML) {
    let range = document.createRange();
    let selection = window.getSelection();
    range.setStart(inputBox, 0);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
  }
}

// Function to save notes to localStorage
function saveNotes() {
  const notes = [];
  document.querySelectorAll(".input-box").forEach(note => {
    notes.push(note.innerHTML);  // Save the HTML content
  });
  localStorage.setItem("notes", JSON.stringify(notes));
}

// Add event listener to the create button to create new notes
createBtn.addEventListener("click", () => {
  createNote();  // Create an empty note
  saveNotes();   // Save the newly created note
});

// Load notes when the page loads
window.addEventListener("DOMContentLoaded", loadNotes);
