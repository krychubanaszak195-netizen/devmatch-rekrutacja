document.getElementById('contact-form').addEventListener('submit', async function(event) {
  event.preventDefault(); // Blokuje błąd 405 i przeładowanie strony!

  const statusMessage = document.getElementById('status');
  const sendButton = document.getElementById('send-button');
  const form = event.target;

  statusMessage.innerText = "Wysyłanie zgłoszenia, proszę czekać...";
  statusMessage.style.color = "#ffa500"; 
  sendButton.disabled = true;


  const formData = new FormData(form);
  
  
  formData.append('access_key', 'ee1369d3-3bb6-4386-b842-52319359c9b3');
  formData.append('subject', 'Nowe zgłoszenie rekrutacyjne - DevMatch');

 
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: json
    });

    const result = await response.json();

    if (response.status === 200) {
      statusMessage.innerText = "✓ Zgłoszenie zostało pomyślnie wysłane na maila!";
      statusMessage.style.color = "#008000"; 
      form.reset(); // Czyszczenie pól formularza
    } else {
      statusMessage.innerText = `Błąd serwera: ${result.message || 'Nieznany błąd'}`;
      statusMessage.style.color = "#ff0000";
    }
  } catch (error) {
    console.error("Błąd sieci:", error);
    statusMessage.innerText = "Coś poszło nie tak. Spróbuj ponownie.";
    statusMessage.style.color = "#ff0000";
  } finally {
    sendButton.disabled = false;
  }
});
