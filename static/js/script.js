let button = document.querySelector('button');
let loadingText = document.createElement('p');
loadingText.textContent = 'Fetching your mood booster...';
loadingText.style.fontSize = '18px';
loadingText.style.textAlign = 'center';
loadingText.style.fontWeight = 'bold';
loadingText.style.color = '#ff758c';
loadingText.style.display = 'none';

document.body.appendChild(loadingText);

function fetchContent() {
    button.disabled = true;
    loadingText.style.display = 'block';

    fetch('/generate')
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            loadingText.style.display = 'none';
            if (data.error) {
                alert(data.error);
            } else {
                showPopup(data.joke, data.quote);
            }
        })
        .catch(error => {
            loadingText.style.display = 'none';
            console.error('Error fetching content:', error);
            alert('Error fetching content, please try again later.');
        })
        .finally(() => {
            button.disabled = false;
        });
}

function showPopup(joke, quote) {
    let existingModal = document.querySelector('.modal-overlay');
    if (existingModal) {
        return;
    }

    let modalOverlay = document.createElement('div');
    modalOverlay.classList.add('modal-overlay');

    let modal = document.createElement('div');
    modal.classList.add('modal');

    let jokeText = document.createElement('p');
    jokeText.innerHTML = `${joke}`;

    let quoteText = document.createElement('p');
    quoteText.innerHTML = `${quote}`;

    let closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.classList.add('close-btn');
    closeButton.addEventListener('click', () => {
        modalOverlay.remove();
    });

    modal.appendChild(jokeText);
    modal.appendChild(quoteText);
    modal.appendChild(closeButton);
    modalOverlay.appendChild(modal);

    document.body.appendChild(modalOverlay);
}

button.addEventListener('click', fetchContent);
