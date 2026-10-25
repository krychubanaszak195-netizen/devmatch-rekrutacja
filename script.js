document.getElementById('contact-form').addEventListener('submit', async function(event) {
  event.preventDefault(); // To całkowicie blokuje błąd 405 i przeładowanie strony!

  const statusMessage = document.getElementById('status-message');
  const sendButton = document.getElementById('send-button');
  
  // Pobranie wartości z pól formularza
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  // Zmiana tekstu na przycisku, żeby użytkownik wiedział, że coś się dzieje
  statusMessage.innerText = "Wysyłanie zgłoszenia, proszę czekać...";
  statusMessage.style.color = "#ffa500"; // kolor pomarańczowy
  sendButton.disabled = true;

  try {
    // Wysyłamy dane ukrytym zapytaniem w tle bezpośrednio do Web3Forms
    const response = await fetch('https://web3forms.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        access_key: 'ee1369d3-3bb6-4386-b842-52319359c9b3', // Twój działający klucz Web3Forms
        name: name,
        email: email,
        message: message,
        subject: `Nowe zgłoszenie rekrutacyjne od ${name}`
      })
    });

    const result = await response.json();

    if (response.status === 200) {
      // Sukces! Strona nie zgasła, a komunikat zmieni się na zielony
      statusMessage.innerText = "✓ Zgłoszenie zostało pomyślnie wysłane na maila!";
      statusMessage.style.color = "#008000"; // kolor zielony
      document.getElementById('contact-form').reset(); // Czyszczenie pól formularza
    } else {
      // Coś poszło nie tak po stronie Web3Forms
      statusMessage.innerText = `Błąd: ${result.message}`;
      statusMessage.style.color = "#ff0000"; // kolor czerwony
    }
  } catch (error) {
    // Problem z siecią internetową
    statusMessage.innerText = "Błąd połączenia z siecią. Spróbuj ponownie.";
    statusMessage.style.color = "#ff0000";
  } finally {
    // Odblokowanie przycisku po zakończeniu operacji
    sendButton.disabled = false;
  }
});
