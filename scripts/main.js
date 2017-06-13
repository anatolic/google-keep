var addNotesInput = document.getElementById('addNote');
var notesListLS = [];
var backgroundColors = ['#ffffff', '#ff8a80', '#ffd180', '#ffff8d', '#cfd8dc', '#80d8ff', '#a7ffeb', '#ccff90'];
var cardsLabels = ['all', 'personal', 'learning', 'inspiration', 'work'];

// Markup va'r
var notesWrap = document.getElementById('notes');
var labelsWrap = document.getElementById('labelsList');

// Add Obj to localStorage
notesListLS = JSON.parse(localStorage.getItem("notes_list"));
if (!notesListLS && notesListLS === null) {
  notesListLS = [
    {
      id: Math.random().toString(16).slice(2),
      type: 'text-plain',
      paragraph: 'First-card! Welcome!',
      cardHeader: 'Card header',
      cardColor: backgroundColors[0],
      label: []
    }
  ];
}
;

// Change color markup
function changeColorMarkup() {
  var changeColorWrap = document.createElement('div');
  changeColorWrap.className = "change-color__wrap";
  var callCCWrapBtnIcon = document.createElement('i');
  callCCWrapBtnIcon.className = 'material-icons color-lens__icon';
  callCCWrapBtnIcon.innerText = 'color_lens';
  var colorsMarkupList = document.createElement('ul');
  colorsMarkupList.className = 'color-list card-panel hoverable';
  for (var i = 0; i < backgroundColors.length; i++) {
    var colorsMarkupListElm = document.createElement('li');
    colorsMarkupListElm.className = "scale-transition color-list__elm test";
    colorsMarkupListElm.setAttribute('data-color', backgroundColors[i]);
    colorsMarkupListElm.setAttribute("style", "background-color: " + backgroundColors[i]);
    colorsMarkupList.appendChild(colorsMarkupListElm);
  }
  changeColorWrap.appendChild(callCCWrapBtnIcon);
  changeColorWrap.appendChild(colorsMarkupList);
  changeColorWrap.addEventListener("click", changeColor, false);
  return changeColorWrap;
};

function addLabelMarkup() {
  var addLabelWrap = document.createElement('div');
      addLabelWrap.className = "add-label__wrap";
  var callCLWrapBtnIcon = document.createElement('i');
      callCLWrapBtnIcon.className = 'material-icons label__icon';
      callCLWrapBtnIcon.innerText = 'label';
  var addLabelList = document.createElement('ul');
      addLabelList.className = 'label-list card-panel hoverable';
  for (var i = 0; i < cardsLabels.length; i++) {
    var addLabelInput = document.createElement('input');
        addLabelInput.setAttribute('type', 'checkbox');
        addLabelInput.id = cardsLabels[i];
    var addLabelHeader = document.createElement('label');
        addLabelHeader.setAttribute('for', cardsLabels[i]);
        addLabelHeader.innerText = cardsLabels[i]
    var labelMarkupListElm = document.createElement('li');
        labelMarkupListElm.appendChild(addLabelInput);
        labelMarkupListElm.appendChild(addLabelHeader);

    addLabelList.appendChild(labelMarkupListElm);
  }
  addLabelWrap.appendChild(callCLWrapBtnIcon);
  addLabelWrap.appendChild(addLabelList);

  addLabelWrap.addEventListener("click", addLabel, false);
  return addLabelWrap;
}
addLabelMarkup();

function createMarkup(index) {
  var changeColorWrap = changeColorMarkup();
  var addLabelWrap = addLabelMarkup();
  notesWrap.addEventListener("click", deleteItem, false);

  var noteText = document.createElement('p');
  noteText.innerText = notesListLS[index].text;
  var noteHeader = document.createElement('p');
  noteHeader.className = 'card-title';
  noteHeader.innerText = 'This is test header';
  // Notes footer wrap
  var labelIcon = document.createElement('i');
      labelIcon.className = 'material-icons';
      labelIcon.innerText = 'label';
  var deleteIcon = document.createElement('i');
      deleteIcon.className = 'material-icons delete-card__icon';
      deleteIcon.innerText = 'delete';
  var deleteButton = document.createElement('a');
      deleteButton.className = 'delete';
      deleteButton.setAttribute('data-note', notesListLS[index].id);
      deleteButton.appendChild(deleteIcon);
  var cardFooter = document.createElement('div');
      cardFooter.className = 'card-action';
      cardFooter.appendChild(deleteButton);
      cardFooter.appendChild(changeColorWrap);
      cardFooter.appendChild(addLabelWrap);
  // Note card Panel
  var cardContent = document.createElement('div');
      cardContent.className = 'card-content';
      cardContent.appendChild(noteHeader);
      cardContent.appendChild(noteText);
  var cardPanel = document.createElement('div');
      cardPanel.className = 'card';
      cardPanel.setAttribute("style", "background-color: " + notesListLS[index].cardColor);
      cardPanel.appendChild(cardContent);
      cardPanel.appendChild(cardFooter);
  // Main wrap of notes
  var noteWrap = document.createElement('div');
  noteWrap.className = "col s12 m4";
  noteWrap.setAttribute('data-note', notesListLS[index].id);
  //noteWrap.id = 'work';

  noteWrap.appendChild(cardPanel);
  notesWrap.appendChild(noteWrap);
}

// Markup for Labels list
function labelsMarkup() {
  for (var i = 0; i < cardsLabels.length; i++) {
    var labelListAnchor = document.createElement('a');
        labelListAnchor.className = 'waves-effect';
        labelListAnchor.setAttribute('data-label', cardsLabels[i]);
        labelListAnchor.setAttribute('href', '#' + cardsLabels[i])
        labelListAnchor.innerText = cardsLabels[i];
    var labelListElm = document.createElement('li');
        labelListElm.appendChild(labelListAnchor);
    labelsWrap.appendChild(labelListElm);
  }
};
labelsMarkup();

// Render the note List
function renderNotes() {
  for (var i = 0; i < notesListLS.length; i++) {
    createMarkup(i);
  }
};

// Add new note
//function newNote() {
addNotesInput.addEventListener("keypress", function (e) {
  // Create unique id for each note
  var uniqId = Math.random().toString(16).slice(2);
  // NotesObject
  var newNoteObject = {
    id: uniqId,
    type: 'plain-text',
    text: addNotesInput.value,
    cardColor: '',
    label: []
  }

  if (event.keyCode === 13) {
    e.preventDefault();
    if (addNotesInput.value.length > 3) {
      // push new object to the array then added in local-storage
      notesListLS.push(newNoteObject);
      localStorage.setItem("notes_list", JSON.stringify(notesListLS));
      // re'render array of notes
      notesWrap.innerHTML = "";
      renderNotes();
      // clearing the input
      addNotesInput.value = "";
    }
    ;
  }
});
//};

// Search the object inside an array and removed from local storage to
function updateNotesListOnRemoveItem(btnClicked) {
  notesListLS.filter(function (elm) {
    var noteId = btnClicked.getAttribute('data-note');
    if (elm.id === noteId) {
      var elmIndex = notesListLS.indexOf(elm)
      notesListLS.splice(elmIndex, 1);
      localStorage.setItem("notes_list", JSON.stringify(notesListLS));
    }
    ;
  });
}

// Handle clicks that might come through the delete button
function deleteItem(e) {
  var btn = e.target;

  while (btn && (btn.tagName != "A" || !/\bdelete\b/.test(btn.className))) {
    btn = btn.parentNode;
    if (btn === this) {
      btn = null;
    }
  }
  if (btn) {
    var btnParent = btn.parentNode.parentNode.parentNode
    this.removeChild(btnParent);
    updateNotesListOnRemoveItem(btn);
  }
};

function changeColor(e) {
  var btn = e.target;
  // Get Elm index from backgroundColor array
  backgroundColors.filter(function (elm) {
    var elmBgColor = btn.getAttribute('data-color');
    if (elm === elmBgColor) {
      this.colorIndex = backgroundColors.indexOf(elm);
    }
  })
  // Get clicked card Index from array
  var btnParentCard = btn.parentNode.parentNode.parentNode.parentNode.parentNode;
  notesListLS.filter(function (elm) {
    if (elm.id === btnParentCard.getAttribute('data-note')) {
      this.cardIndex = notesListLS.indexOf(elm);
    };
  });
  // Apply index color elm from Colors array to clicked card
  notesListLS[cardIndex].cardColor = backgroundColors[colorIndex];
  notesWrap.innerHTML = "";
  renderNotes();
  localStorage.setItem("notes_list", JSON.stringify(notesListLS));
}

function addLabel(e) {
  var btn = e.target;
  cardsLabels.filter(function(elm) {
    if (elm.toUpperCase() === btn.innerText.toUpperCase() ) {
      var indexOfElm = cardsLabels.indexOf(elm);
    }
  });
};

// Init all function, also can be added after dom initialization
var initFn = [
  renderNotes()
];