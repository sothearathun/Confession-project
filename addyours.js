// Get the select element
const colorSelect = document.getElementById('colors');

// Get the card element
const card = document.querySelector('.card');
const recipientInput = document.querySelector('.card-header input');
// const titleInput = document.querySelector('.card-title input');
const messageInput = document.getElementById('message');
const cardElement = document.querySelector('.card');
const submitButton = document.querySelector('button[type="submit"]');
const deleteButton = document.querySelector('.delete-btn');

// Function to update the card color
function updateCardColor() {
    const selectedColor = colorSelect.value;
    if (selectedColor) {
        card.style.backgroundColor = selectedColor;
        deleteButton.style.backgroundColor = selectedColor;
    } else {
        card.style.backgroundColor = 'lightblue';
        deleteButton.style.backgroundColor = 'lightblue';
    }
}

// Add event listener to the select element
if (colorSelect) {
    colorSelect.addEventListener('change', updateCardColor);
    // Set initial color
    updateCardColor();
}

// Function to handle form submission
function submit() {
    // Check if form elements exist
    if (!recipientInput || !messageInput || !colorSelect) {
        console.error('Form elements not found');
        return;
    }

    const to = recipientInput.value;
    // const title = titleInput.value;
    const message = messageInput.value;
    const color = colorSelect.value || 'lightblue'; // Default color if none selected

    if (!to  || !message) {
        alert('Please fill in all fields.');
        return;
    }

    // Create card data with timestamp
    const cardData = {
        recipient: to,
        // title: title,
        message: message,
        color: color
    };

    // Get existing confessions or initialize empty array
    let confessions = JSON.parse(localStorage.getItem('confessions') || '[]');
    
    // Add new confession
    confessions.push(cardData);
    
    // Save back to localStorage
    localStorage.setItem('confessions', JSON.stringify(confessions));
    
    // alert('Your confession has been submitted!');
    setTimeout(function() {
        window.location.href = 'unsent.html';
    }, 1000);
}

// Add event listener to the submit button if it exists
if (submitButton) {
    submitButton.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent form submission
        submit();
    });
}