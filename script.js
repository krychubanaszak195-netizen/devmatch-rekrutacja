document.getElementById('contact-form').addEventListener('submit', async function(event) {
  event.preventDefault(); 

  const statusMessage = document.getElementById('status');
  const sendButton = document.getElementById('send-button');
  
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  statusMessage.innerText = "Wysyłanie zgłoszenia, proszę czekać...";
  statusMessage.style.color = "#ffa500"; 
  sendButton.disabled = true;

 
  const formData = new FormData();
  formData.append('access_key', 'ee1369d3-3bb6-4386-b842-52319359c9b3'); 
  formData.append('name', name);
  formData.append('email', email);
  formData.append('message', message);
  formData.append('subject', `Nowe zgłoszenie rekrutacyjne od ${name}`);

  try {
    const response = await fetch('https://web3forms.com', {
      method: 'POST',
      body: formData
    });

    const result = await response.json();

    if (response.status === 200) {
      statusMessage.innerText = "✓ Zgłoszenie zostało pomyślnie wysłane na maila!";
      statusMessage.style.color = "#008000"; 
      document.getElementById('contact-form').reset(); 
    } else {
      statusMessage.innerText = `Błąd serwera: ${result.message || 'Nieznany błąd'}`;
      statusMessage.style.color = "#ff0000";
    }
  } catch (error) {
    console.error("Szczegóły błędu:", error);
    statusMessage.innerText = "Problem techniczny z wysyłką. Spróbuj ponownie.";
    statusMessage.style.color = "#ff0000";
  } finally {
    sendButton.disabled = false;
  }
});
