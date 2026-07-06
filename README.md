# Vicolo Wine & Food — Sito Web (versione senza sottocartelle)

Questa è una versione **semplificata** del sito: tutti i file stanno in un'unica cartella, senza sottocartelle. È pensata apposta per essere caricata su GitHub trascinando tutti i file insieme in un colpo solo, dall'interfaccia web di GitHub, senza rischiare che i percorsi si rompano.

---

## 1. Cosa contiene questa cartella

```
index.html         → la pagina del sito
main.css           → tutto lo stile grafico
main.js            → le interazioni (menu, slider, form, animazioni)
hero.jpg, story.jpg, cantina.jpg,
gallery-a.jpg … gallery-f.jpg,
og-image.jpg       → immagini (placeholder, da sostituire con foto reali)
favicon.svg        → icona del sito
robots.txt          → indicazioni per i motori di ricerca
sitemap.xml          → mappa del sito per Google
_headers             → sicurezza e cache per Cloudflare Pages
README.md            → questa guida
```

**Importante:** tutti questi file devono restare **allo stesso livello**, nella stessa cartella — non spostarli in sottocartelle, altrimenti i collegamenti si rompono di nuovo.

---

## 2. Come caricarli su GitHub (senza errori)

1. Vai nella tua repository su GitHub.
2. Se ci sono già file vecchi caricati in modo sbagliato (es. `main.css` senza stile, file mancanti), **cancellali prima** per evitare confusione: seleziona ogni file → icona del cestino → conferma.
3. Clicca **Add file → Upload files**.
4. **Seleziona tutti i file di questa cartella insieme** (usa Ctrl/Cmd+A nella finestra di selezione) e trascinali tutti in una volta nella pagina di upload.
5. Scorri in basso e clicca **Commit changes**.

Alla fine dell'operazione, l'elenco dei file nella repository dovrebbe corrispondere esattamente a quello del punto 1 — tutti sullo stesso livello, nessuna cartella.

---

## 3. Il form di prenotazione — come funziona ora

Il form **non usa più un backend**: quando qualcuno lo compila e clicca "Invia richiesta", il browser apre automaticamente il **programma di posta del cliente** (Mail, Outlook, Gmail nel browser, ecc.) con oggetto e messaggio già scritti, pronti per essere inviati al ristorante.

Per cambiare l'indirizzo email di destinazione, apri `main.js`, cerca questa riga vicino all'inizio della sezione "Form prenotazione":

```js
const RESTAURANT_EMAIL = 'info@vicolowineandfood.it';
```

e sostituiscila con l'email reale del ristorante.

**Limite di questo approccio:** funziona solo se il cliente ha un programma di posta configurato sul dispositivo (su computer non sempre è così). Se in futuro vuoi un form che invia davvero senza aprire un'app esterna, la soluzione più semplice — senza scrivere codice server — è collegare un servizio gratuito come [Formspree](https://formspree.io): basta creare un account, copiare l'endpoint che ti forniscono, e me lo puoi far integrare in una versione successiva.

---

## 4. Deploy su Cloudflare Pages

1. Vai su [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages → Create → Pages → Connect to Git**.
2. Seleziona la tua repository.
3. Impostazioni di build:
   - **Framework preset:** `None`
   - **Build command:** *(lascia vuoto)*
   - **Build output directory:** `/`
4. **Save and Deploy**. In pochi secondi il sito sarà online su un indirizzo `*.pages.dev`.
5. Per collegare il tuo dominio: **Custom domains** nel progetto Cloudflare Pages.

---

## 5. Prima di pubblicare, personalizza

- **Immagini** — sostituisci i placeholder (generati nella palette del brand) con foto reali del locale, mantenendo **esattamente gli stessi nomi file** (es. il nuovo file va comunque chiamato `hero.jpg`), così non devi toccare il codice.
- **Testi** — indirizzo, telefono, orari, prezzi del menu: apri `index.html` con un editor di testo e cerca la frase da cambiare.
- **Email prenotazioni** — vedi punto 3 sopra.
- **Dominio** — sostituisci `https://www.vicolowineandfood.it/` dentro `index.html`, `robots.txt` e `sitemap.xml` con il tuo dominio reale.

---

Buon lavoro! 🍷
