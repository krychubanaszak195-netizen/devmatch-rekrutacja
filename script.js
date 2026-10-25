document.getElementById('contact-form').addEventListener('submit', async function(event) {
  event.preventDefault(); // Blokuje błąd 405 i przeładowanie strony!

  const statusMessage = document.getElementById('status-message');
  const sendButton = document.getElementById('send-button');
  
  // Pobranie wartości z formularza
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  statusMessage.innerText = "Wysyłanie zgłoszenia, proszę czekać...";
  statusMessage.style.color = "#ffa500"; 
  sendButton.disabled = true;

  // Tworzymy paczkę danych FormData - to omija blokady sieciowe i błędy typu CORS / brak połączenia
  const formData = new FormData();
  formData.append('access_key', 'ee1369d3-3bb6-4386-b842-52319359c9b3'); // Twój klucz Web3Forms
  formData.append('name', name);
  formData.append('email', email);
  formData.append('message', message);
  formData.append('subject', `Nowe zgłoszenie rekrutacyjne od ${name}`);

  try {
    // WAŻNE: Przy FormData NIE dodajemy nagłówka 'Content-Type' w fetch, przeglądarka doda go sama!
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData
    });

    const result = await response.json();

    if (response.status === 200) {
      statusMessage.innerText = "✓ Zgłoszenie zostało pomyślnie wysłane na maila!";
      statusMessage.style.color = "#008000"; 
      document.getElementById('contact-form').reset(); // Czyszczenie pól
    } else {
      statusMessage.innerText = `Błąd serwera: ${result.message || 'Nieznany błąd'}`;
      statusMessage.style.color = "#ff0000";
    }
  } catch (error) {
    console.error("Szczegóły błędu sieci:", error);
    statusMessage.innerText = "Problem techniczny z wysyłką. Zobacz konsolę przeglądarki (F12).";
    statusMessage.style.color = "#ff0000";
  } finally {
    sendButton.disabled = false;
  }
});
