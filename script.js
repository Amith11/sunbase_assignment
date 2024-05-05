
$(document).ready(function() {
  // Add Input
  $('.add-input').click(function(e) {
    e.preventDefault();
    addInput();
  });

  // Add Select
  $('.add-select').click(function(e) {
    e.preventDefault();
    addSelect();
  });

  // Add Textarea
  $('.add-textarea').click(function(e) {
    e.preventDefault();
    addTextarea();
  });

  // Save Button Click
  $('#saveBtn').click(function() {
    if (validateForm()) {
      saveFormData(); 
    }
  });

  // Delete Icon Click
  $(document).on('click', '.delete-icon', function() {
    $(this).closest('.input-group').remove();
  });
});




//Function to validate the form
function validateForm() {
  var isValid = true;
  $('.input-group').each(function() {
    var inputType = $(this).find('input, select, textarea').prop('tagName').toLowerCase(); 
    var value;
    if (inputType === 'input') {
      value = $(this).find('input').val();
    } else if (inputType === 'select') {
      value = $(this).find('select').val();
    } else if (inputType === 'textarea') {
      value = $(this).find('textarea').val();
    }
    if (value.trim() === '') {
      alert('Please fill in all fields.');
      isValid = false;
      return false; 
    }
  });

  return isValid;
}




// Function to save form data
function saveFormData() {
  var formData = []; 
  $('.input-group').each(function() {
    var inputType = $(this).find('input, select, textarea').prop('tagName').toLowerCase(); 
    var label = $(this).find('h4').text(); 
    var value;

    // Based on the input type, get the value
    if (inputType === 'input') {
      value = $(this).find('input').val();
    } else if (inputType === 'select') {
      value = $(this).find('select').val();
    } else if (inputType === 'textarea') {
      value = $(this).find('textarea').val();
    }

    // Construct an object with id, type, label, and value
    var data = {
      id: generateUUID(), 
      type: inputType,
      label: label,
      value: value
    };

    formData.push(data); 
  });
  console.log(JSON.stringify(formData));
}

// Function to generate a UUID (Universally Unique Identifier)
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0,
      v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function addInput() {
  $('#inputs').append(
    '<div class="input-group">' +
     '<h4 style="cursor: pointer;">Sample Label</h4>' +
      '<i class="fa fa-trash delete-icon"></i>' +
      '<input type="text" placeholder="Enter Label">' +
    '</div>'
  );
  makeDraggable();
}

function addSelect() {
  $('#inputs').append(
    '<div class="input-group">' +
      '<h4 style="cursor: pointer;">Select</h4>' +
      '<i class="fa fa-trash delete-icon"></i>' +
      '<select class="select-options">' +
        '<option value="option1">Option 1</option>' +
        '<option value="option2">Option 2</option>' +
        '<option value="option3">Option 3</option>' +
      '</select>' +
      '<button class="add-option-btn" style="margin-top: 15px;">Add</button>' +
      '<button class="delete-selected-btn">Delete</button>' +
    '</div>'
  );
  makeDraggable();
}

function addTextarea() {
  $('#inputs').append(
    '<div class="input-group">' +
    '<h4 style="cursor: pointer;">Textarea</h4>' +
     '<i class="fa fa-trash delete-icon"></i>' +
    '<textarea placeholder="Enter text"></textarea>' +
    '</div>'
  );
  makeDraggable();
}

function makeDraggable() {
  $('.draggable').draggable({
    containment: 'parent',
    cursor: 'pointer',
    opacity: 0.8
  });
}

$(document).ready(function() {
  $('#inputs').sortable({
    placeholder: 'sortable-placeholder',
    forcePlaceholderSize: true
  });
});

function openNav() {
  document.getElementById("mySidenav").style.left = "0";
}

function closeNav() {
  document.getElementById("mySidenav").style.left = "-200px";
}

// $(document).on('click', '.add-option-btn', function() {
//   openAddOptionPopup($(this).prev('.select-options'));
// });

// $(document).on('click', '.delete-selected-btn', function() {
//   deleteSelectedOption($(this).prev('.select-options'));
// });

function openAddOptionPopup(selectElement) {
  var newOption = prompt('Enter the new option:');
  if (newOption) {
    var option = $('<option>').val(newOption).text(newOption);
    selectElement.append(option);
  }
}

function deleteSelectedOption(selectElement) {
  var selectedOption = selectElement.find('option:selected');
  console.log('Selected option:', selectedOption);
  if (selectedOption.length > 0) {
    selectedOption.each(function() {
      $(this).remove();
    });
    console.log('Selected option(s) deleted successfully.');
  } else {
    console.log('No option selected for deletion.');
  }
}

$(document).on('click', '.add-option-btn', function(event) {
  event.preventDefault(); 
  var inputGroup = $(this).closest('.input-group');
  var selectElement = inputGroup.find('select.select-options');
  openAddOptionPopup(selectElement);
});

$(document).on('click', '.delete-selected-btn', function(event) {
  event.preventDefault();
  var inputGroup = $(this).closest('.input-group');
  var selectElement = inputGroup.find('select.select-options');
  deleteSelectedOption(selectElement);
});


