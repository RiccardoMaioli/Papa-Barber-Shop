# PAPA Barber Shop · Oleggio

Sito statico (HTML + CSS + JS, nessuna build) per PAPA Barber Shop, Corso Matteotti, Oleggio (NO).

## Cosa personalizzare

- **Link di prenotazione**: in `index.html` cerca `#prenota` / `wa.me` e metti il tuo link (Barber App, WhatsApp, ecc.).
- **Telefono**: cerca `+39 000 000 0000` e `390000000000`.
- **Prezzi e servizi**: sezione `#servizi`.
- **Orari**: sezione `#orari` (il giorno corrente si evidenzia da solo).
- **Foto**: metti le immagini in una cartella `img/` e sostituisci i blocchi `<div class="ph">` con `<img src="img/foto1.jpg" alt="Taglio fade">`.
- **Colori**: variabili all'inizio di `style.css` (`--accent` è l'oro).
- **Mappa**: l'indirizzo esatto si regola cambiando il `marker` nell'iframe OpenStreetMap.

## Pubblicare su GitHub Pages

1. Crea un nuovo repository su GitHub (es. `papa-barber`).
2. Carica tutti i file di questa cartella nella radice del repository.
3. Vai su **Settings → Pages**, in "Build and deployment" scegli **Deploy from a branch**, branch `main`, cartella `/ (root)`, poi **Save**.
4. Dopo circa un minuto il sito sarà su `https://TUO-UTENTE.github.io/papa-barber/`.

Per un dominio tuo: Settings → Pages → Custom domain.
