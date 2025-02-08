# Calcolatore Lega Alpacca

Un'applicazione web per calcolare la composizione della lega Alpacca e visualizzare i costi dei metalli in tempo reale.

## Funzionalità

- Calcolo interattivo delle proporzioni dei metalli (rame, zinco, nichel)
- Visualizzazione grafica della composizione
- Anteprima del colore risultante
- Calcolo dei costi basato sui prezzi correnti dei metalli
- Interfaccia responsive
- Supporto tema chiaro/scuro

## Requisiti di Sistema

- Node.js 20.x o superiore
- PostgreSQL 16.x o superiore
- npm (incluso con Node.js)

## Installazione

1. Clona il repository:
   ```bash
   git clone [URL_DEL_TUO_REPOSITORY]
   cd [NOME_DIRECTORY]
   ```

2. Installa le dipendenze:
   ```bash
   npm install
   ```

3. Configura il database:
   - Crea un database PostgreSQL
   - Copia il file `.env.example` in `.env`:
     ```bash
     cp .env.example .env
     ```
   - Modifica il file `.env` con i tuoi dati di connessione al database:
     ```
     DATABASE_URL=postgresql://user:password@localhost:5432/nome_database
     ```

4. Esegui le migrazioni del database:
   ```bash
   npm run db:push
   ```

## Avvio dell'Applicazione

1. Per ambiente di sviluppo:
   ```bash
   npm run dev
   ```
   L'applicazione sarà disponibile su http://localhost:5000

2. Per ambiente di produzione:
   ```bash
   npm run build
   npm run start
   ```

## Utilizzo

1. Apri l'applicazione nel browser
2. Usa gli slider per regolare le percentuali dei metalli:
   - Rame (47-64%)
   - Zinco (15-42%)
   - Nickel (10-25%)
3. Osserva in tempo reale:
   - Il grafico a torta della composizione
   - L'anteprima del colore della lega
   - Il costo totale basato sui prezzi correnti dei metalli

## Sviluppo

- Frontend: React + TypeScript
- Backend: Express + PostgreSQL
- Styling: Tailwind CSS + shadcn/ui
- State Management: TanStack Query

## Note sulla Sicurezza

Assicurati di:
- Non committare mai il file `.env`
- Utilizzare variabili d'ambiente in produzione
- Configurare correttamente CORS e altre misure di sicurezza in produzione

## Licenza

MIT
