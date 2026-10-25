document.getElementById('contact-form').addEventListener('submit', async function(event) {
  event.preventDefault(); // Powstrzymuje przeładowanie strony i błędy typu 405

  const RESEND_API_KEY = 're_HJJ3es4X_HUjs9TW11pmHm8cz8e3j8UbG';
  const statusMessage = document.getElementById('status-message');
  
  // Pobranie danych z pól formularza
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  statusMessage.innerText = "Wysyłanie zgłoszenia...";
  statusMessage.style.color = "orange";

  try {
    const response = await fetch('https://resend.com', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev', // Darmowa testowa domena wysyłkowa Resend
        to: 'TUTAJ_WPISZ_SWÓJ_PRYWATNY_EMAIL_NA_KTORY_MA_PRZYJSC_WIADOMOSC',
        subject: `Nowa aplikacja od: ${name}`,
        html: `<p><strong>Firma/Osoba:</strong> ${name}</p>
               <p><strong>Email:</strong> ${email}</p>
               <p><strong>Wymagania:</strong> ${message}</p>`
      })
    });

    if (response.ok) {
      statusMessage.innerText = "✓ Zgłoszenie zostało wysłane na maila!";
      statusMessage.style.color = "green";
      document.getElementById('contact-form').reset(); // Czyszczenie formularza
    } else {
      const errorData = await response.json();
      statusMessage.innerText = `Błąd serwera: ${errorData.message || response.statusText}`;
      statusMessage.style.color = "red";
    }
  } catch (error) {
    statusMessage.innerText = "Błąd połączenia z serwerem pocztowym.";
    statusMessage.style.color = "red";
  }
});
