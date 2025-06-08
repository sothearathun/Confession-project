let confessionsLoaded = false;

document.addEventListener('DOMContentLoaded', function() { 
   if (!confessionsLoaded) {  
    // Get all confessions   
    const confessions = JSON.parse(localStorage.getItem('confessions') || '[]');   
    const cardContainer = document.getElementById('cardContainer');    
    
    function renderCards() {
      if (cardContainer) {
        if (confessions.length > 0) {
          // Create HTML for each confession
          let allCards = '';
          
          confessions.forEach((card, index) => {
            allCards += `
              <div class="card text-white mb-3" style="background-color: ${card.color}; max-width: 30rem; align-item: center">
                <h3>To: ${card.recipient}</h3>
                <p>${card.message}</p><hr>
                <button class="delete-btn" data-index="${index}">Delete</button>
              </div>
            `;
          });
          
          cardContainer.innerHTML = allCards;
          
          // Add event listeners to delete buttons
          document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', function() {
              const index = parseInt(this.getAttribute('data-index'));
              deleteCard(index);
            });
          });
        } else {
          cardContainer.innerHTML = '<p class="no-confessions">Create the first confession!</p>';
        }
        
        cardContainer.style.display = 'block';
      }
    }

     // Initial render
    renderCards();
    
    // Function to delete a card
    function deleteCard(index) {
      if (confirm('Are you sure you want to delete this confession?')) {
        confessions.splice(index, 1);
        localStorage.setItem('confessions', JSON.stringify(confessions));
        renderCards();
      }
    }
    
    
    // Search function  
    const searchInput = document.querySelector('.search input');
    
    function search() {
      if (!searchInput) return;
      
      const searchTerm = searchInput.value.toLowerCase();
      const cards = document.querySelectorAll('.card');
      
      cards.forEach(card => {
        if (card.textContent.toLowerCase().includes(searchTerm)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    }
    
    // Add event listener to search input if it exists
    if (searchInput) {
      searchInput.addEventListener('input', search);
    }


      localStorage.setItem('confessionsLoaded', 'true');
  }
  });