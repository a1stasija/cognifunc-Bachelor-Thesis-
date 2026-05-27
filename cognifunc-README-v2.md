# CogniFunc — Merni sistem za ispitivanje pažnje i inhibicije

> Diplomski rad — Univerzitet u Beogradu, Elektrotehnički fakultet
> Autor: Anastasija Mladić (2019/0278) · Mentor: prof. dr Nadica Miljković
> Beograd, oktobar 2025.

Veb-aplikacija za izvođenje kognitivno-psiholoških testova (**Flanker test** i **zadatak vizuelne pretrage**) sa sinhronim beleženjem trajektorija računarskog miša. Cilj sistema je da ispita može li se kretanje miša koristiti kao indirektna mera pažnje i inhibicije u uslovima kada praćenje pokreta očiju (*eye tracking*) nije izvodljivo — na primer u online istraživanjima.

> 📊 **Analiza podataka** prikupljenih ovom aplikacijom realizovana je u zasebnom repozitorijumu: **[cognifunc-statistics](https://github.com/a1stasija/cognifunc-statistics)** (Python: preprocessing, deskriptivna statistika, ekstrakcija obeležja).

## Motivacija

Klasične paradigme za ispitivanje izvršnih funkcija (Flanker, visual search) tipično se sprovode uz skup hardver za praćenje pogleda. S obzirom na nalaze iz literature o korelaciji između pokreta očiju i pokreta kursora, ovaj rad istražuje da li se efekti **inhibicije** i **usmeravanja pažnje** mogu pouzdano detektovati analizom mikrodinamike trajektorija miša — kroz parametre kao što su linearna brzina, ugaona brzina i vremenski normalizovan broj lokalnih maksimuma u tim signalima.

## Tehnologije

Sistem je realizovan po **MEAN** arhitekturi.

| Sloj | Tehnologija |
|------|-------------|
| Frontend | Angular 16, TypeScript, HTML, CSS |
| Backend | Node.js 18, Express.js, TypeScript |
| Baza podataka | MongoDB (preko Mongoose ODM-a) |
| Komunikacija | REST (HTTP / JSON) |
| Analiza podataka | Python 3.13 — vidi [cognifunc-statistics](https://github.com/a1stasija/cognifunc-statistics) |

## Struktura projekta

```
cognifunc-Bachelor-Thesis-/
├── frontend/              # Angular klijentska aplikacija
│   ├── src/app/
│   │   ├── components/    # HomeComponent, ConsentComponent,
│   │   │                  # FlankerTestComponent, VisualSearchTestComponent
│   │   ├── services/      # *DataTransferService — komunikacija sa serverom
│   │   │                  # *MouseDataService — beleženje koordinata miša
│   │   └── models/        # ReadingMouseData, VisualItem
│   └── package.json
│
├── backend/               # Node.js + Express server
│   ├── src/
│   │   ├── server.ts      # Inicijalizacija servera, konekcija sa MongoDB
│   │   ├── routers/       # flanker, visualSearch, reading
│   │   ├── controllers/   # logika obrade zahteva
│   │   └── models/        # Mongoose šeme
│   └── package.json
│
└── .gitignore
```

## Komponente sistema

### Frontend (Angular)

Klijentska aplikacija je organizovana modularno, sa jasnim razdvajanjem prikaza i logike:

- **Komponente** upravljaju prikazom i interakcijom sa korisnikom
  - `HomeComponent` — početna strana sa izborom testa i jezika (srpski / engleski)
  - `ConsentComponent` — strana za informisani pristanak (po Helsinškoj deklaraciji)
  - `FlankerTestComponent` — sprovođenje Flanker testa (60 iteracija, 30 kongruentnih + 30 inkongruentnih)
  - `VisualSearchTestComponent` — sprovođenje testa vizuelne pretrage (30 iteracija, 5 kontrolnih + 25 eksperimentalnih)

- **Servisi za beleženje pokreta miša** prikupljaju koordinate kursora (x, y) zajedno sa preciznim vremenskim oznakama (`performance.now()`) na frekvenciji od ~100 Hz preko `pointermove` event listener-a:
  - `FlankerTestMouseDataService`
  - `VisualSearchTestMouseDataService`
  - `ReadingMouseDataService`

- **Servisi za prenos podataka** šalju rezultate na server:
  - `FlankerTestDataTransferService`
  - `VisualSearchDataTransferService`
  - `ReadingDataTransferService`

### Backend (Node.js + Express)

Server prima podatke od klijenta i čuva ih u MongoDB bazi. Strukturiran je u tri sloja po test-tipu:

| Ruter | Kontroler | Model (Mongoose) |
|-------|-----------|------------------|
| `flanker.router.ts` | `flanker.controller.ts` | `flanker.ts` |
| `visualSearch.router.ts` | `visualSearch.controller.ts` | `visualSearch.ts` |
| `reading.router.ts` | `reading.controller.ts` | `reading.ts` |

Svaki model sadrži zajednička polja: jedinstveni `sessionId` (identifikator ispitanika za dati test) i niz prikupljenih uzoraka (koordinate + timestamp), kao i polja specifična za tip testa (`isCongruent`, `isCorrect`, broj iteracije).

### Analiza podataka

Sve Python skripte za preprocessing, statističku analizu i ekstrakciju obeležja (brzina, ugaona brzina, lokalni maksimumi, vremenski normalizovan broj pikova) izdvojene su u zaseban repozitorijum:

➡️ **[github.com/a1stasija/cognifunc-statistics](https://github.com/a1stasija/cognifunc-statistics)**

Pipeline analize:
1. Izvoz MongoDB kolekcija u `.json` formatu
2. Računanje signala linearne brzine (`numpy.gradient`) i ugaone brzine
3. Detekcija lokalnih maksimuma (`scipy.signal.find_peaks`) sa pragom 2σ i minimalnim rastojanjem od 4 uzorka (≈ 40 ms — preporuka iz literature za sakade)
4. Deskriptivna statistika po uslovu i vizualizacija (matplotlib)

## Glavni eksperimentalni rezultati

Na pilot uzorku od 3 ispitanika (zdrave odrasle osobe, srednja vrednost godina 25 ± 4):

- **Flanker test:** efekat interferencije (razlika u medijani vremena reakcije inkongruentno − kongruentno) bio je prisutan kod sva tri ispitanika (70–91 ms), u skladu sa literaturom.
- **Visual search:** veća tačnost u kontrolnim iteracijama (bez mete) i kraće vreme reakcije u eksperimentalnim iteracijama (sa metom), takođe u skladu sa literaturom.
- **Mikrodinamika miša:** vremenski normalizovan broj lokalnih maksimuma signala ugaone brzine pao je u opseg fiziološki očekivane učestalosti mikrosakada (~1–2 Hz), što sugeriše da kretanje miša donekle prati obrasce poznate iz eye tracking studija.

## Pokretanje

### Preduslovi

- Node.js ≥ 18
- MongoDB (lokalno ili remote — URL u `.env` fajlu)

### Frontend

```bash
cd frontend
npm install
ng serve
# aplikacija dostupna na http://localhost:4200
```

### Backend

```bash
cd backend
npm install
npm run start
# API dostupan na http://localhost:3000 (ili port iz .env-a)
```

### Analiza prikupljenih podataka

Za reprodukovanje statističke analize iz diplomskog rada, vidi uputstva u [cognifunc-statistics](https://github.com/a1stasija/cognifunc-statistics) repozitorijumu.

## Eksperimentalni protokol

Eksperimenti su sprovedeni u kontrolisanim uslovima:
- prostorija bez spoljašnjih distrakcija, popodnevni časovi
- udaljenost od monitora ~70 cm, fiksna osetljivost miša
- 14" IPS ekran 1920×1200 @ 60 Hz, Logitech M170 miš (1000 dpi)
- isključen internet i notifikacije; mobilni telefoni van prostorije
- informisani pristanak po Helsinškoj deklaraciji i Kodeksu profesionalne etike Univerziteta u Beogradu

## Ograničenja i pravci daljih istraživanja

- Mali uzorak (n = 3) — pilot karakter; predstoji proširenje na metodološki raznovrsniji uzorak
- **Sekvencijalni *carryover* efekti** — moguć je uticaj ponavljanja prethodnog odgovora i motorne inercije; preporuka: interpredmetno kontrabalansiranje i resetovanje kursora u centralnu tačku na početku svake iteracije
- Paralelno snimanje pokreta očiju kao kontrolne mere za dalju validaciju
- Statistička provera značajnosti razlika između uslova na većem uzorku

## Povezani repozitorijumi

- 📊 **[cognifunc-statistics](https://github.com/a1stasija/cognifunc-statistics)** — Python skripte za analizu prikupljenih podataka

## Reference

Pun spisak literature je dostupan u dokumentu diplomskog rada (poglavlje *Literatura*). Među ključnim referencama:

- Miyake et al. — model izvršnih funkcija (*The unity and diversity of executive functions*)
- Eriksen & Eriksen (1974) — originalni Flanker zadatak
- Wolfe et al. — paradigma vizuelne pretrage
- Navalpakkam et al. (2013) — korelacija eye–mouse u različitim layout-ima
- Engbert & Kliegl (2003) — mikrosakade i pažnja

## Licenca

Akademski projekat — diplomski rad na ETF-u Univerziteta u Beogradu.
