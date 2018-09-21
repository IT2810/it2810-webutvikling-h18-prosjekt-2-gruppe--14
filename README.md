# Dokumentasjon

## React
For å løse oppgaven som gikk ut på å lage en interaktiv utstilling med responsive web-design har vi benyttet React, noe som gjør det smertefritt å lage interaktiv UI (User Interface). Vi har delt prosjektet opp i en rekke React-komponenter.

### App.js

App.js er moder-komponenten og entrypoint til web-applikasjonen. Alt som blir vist på skjermen blir rendret via App.js. App.js rendres på DOM-en i index.js, som igjen rendres i index.html. 

I App.js har vi definert tilstander for settings, disse skal holde styr på hvilket tema innenfor tekst, lyd og bilde brukeren ønsker at bildegalleriet skal bestå av. Brukeren velger innstillinger gjennom interaksjon med Navbar.js, dette er komponenten som viser menyen på venstre side av skjermen og som blir instansiert via funksjonen renderHeader() i App.js. 

### Navbar.js

Denne komponenten har en egen tilstand som styrer åpning/lukking av sidebaren. Den har også tre tilstander for selve innstillingene. Ved å trykke på en valgt innstilling endres tilstanden inne i komponenten, men vi må også sørge for at endringer i innstillingene blir sendt opp til App.js. Dette løser man i React ved å sende funksjoner nedover i komponent-hierarkiet. Funksjoner (og annen data) som sendes nedover kan aksesseres i etterkommeren via this.props. I dette tilfellet har vi sendt funksjoner som endrer tilstander direkte i App.js ned til Navbar.js, dermed kan vi kalle funksjonen i Navbar.js ved endring av innstillinger med den oppgitte innstillingen som parameter. Dette er vanlig praksis i React, men kan etter hvert som prosjektet blir større medføre utfordringer. Her hadde det vært naturlig å benytte et støtte-bibliotek for å håndtere tilstander i Navbar.js som vi skal ha tilgjengelig i andre komponenter. Et eksempel på et slik støtte-bibliotek er Redux, som alene holder orden på tilstanden til alle komponentene i en Store. Men i denne øvingen var det et krav om å løse slik logikk selv med states og props. Nå er det klart hvordan tilstanden til Navbar.js blir tilgjengelig i App.js, men App.js i seg selv har ikke bruk for innstillingene. Det er derimot komponenten som generere og gjengir tekst, lyd og bilde som er avhengig av tilgang til de valgte innstillingene. Innstillingene i App.js sendes derfor ned til Art.js.

### Tabs.js
I denne komponenten rendres tab-menyen som alltid er synlig på venstre side. Her velger brukeren mellom fire forskjellige versjoner av generert lyd, tekst og bilde basert på de valgte innstillingene. Den valgte taben lagres i tilstanden art og blir sendt opp til App.js på samme måte som innstillingene fra Navbar.js. Den valgte taben sendes så ned til Art.js fra App.js. Dermed får Art.js tilgang til både innstillingene angitt i Navbar.js og hvilken tab som blir valgt i Tabs.js. Alle handlinger gjort av brukeren er dermed tilgjengelig i Art.js.  

### Art.js

Art.js har alt den trenger for å alene kunne fokusere på å hente inn riktig lyd-, bilde- og tekstelement basert på tilstander (innstillinger og tab) mottatt ovenfra i komponent-hierarkiet. Vi bruker AJAX (Asynchronous JavaScript And XML) til å asynkront laste inn bilder og motiver fra resources. Dette gjøres fordi man da kan laste inn og oppdatere siden uten å ‘reloade’ siden. Når vi har lastet inn dataen, så kan vi også i samme funksjon behandle dataene som lastes inn. Her så parser vi dataen til enten JSON eller rene tekstfiler. Når dataene er lastet inn, lagres den i en cache dictionary, som har URLen til filene som key, og dataen på URLene som verdi. 
Vi la merke til at det var problematisk å kjøre applikasjonen på iPhone, ettersom iPhone ikke gir tilgang til auto-playing av audio. Dette medførte at siden ikke fungerte i det hele tatt. Vi valgte derfor å ikke spille av noe audio på mobil, ettersom dette var bedre enn å ha en nettside som ikke fungerte i det hele tatt.

![structure](https://i.imgur.com/y3zfpdY.png)

## Responsive web design 
Vi har brukt både inline-styling og CSS-filer for å designe webapplikasjonen. Hver komponent har sin egen CSS-fil. Dette gjør det veldig ryddig når man skal gjøre endringer underveis under utvikling og i ettertid når man ser tilbake på koden.  

## Tilpass skjermstørrelse
Vi har benyttet viewport for å sørge for at applikasjonen tilpasser seg alle ulike skjermstørrelser. Trikset for å få til dette er å istedenfor å bruke absolutte størrelser i klassene i CSS-filene så benytter vi relative størrelser som for eksempel vh og vmax. Dette er størrelser som baserer seg på størrelsen på viewporten. Det gjør at vi enkelt kan designe en applikasjon som automatisk tilpasser seg enhetens skjermstørrelse. Vi benyttet også media queries for å egendefinere parametere i klassene der det trengtes, da spesielt for å endre tekststørrelsen basert på skjermens bredde og høyde. 

## Testing av brukergrensesnitt
Vi har brukt device toolbaren i Chrome dev tools for å teste at brukergrensesnittet tilpasser seg alle tilgjengelige enheter der, det inkluderer iPhone 5/SE/6/7/8/X samt alle pluss-versjoner, iPad, iPad Pro og Samsung Galaxy S5. Vi launchet også applikasjonen vår på heroku for å teste brukergrensesnittet på våre egne telefoner, der fikk vi bekreftet at det vi fikk ut av testing med device toolbaren stemte overens med virkeligheten på iPhone X, iPhone 8 og One Plus 6. Vi gikk nøye gjennom alle innstillingene på alle enhetene nevnt ovenfor, både i landskap orientering og portrettorientering

## Git
Vår git bruk baserte seg i stor grad på Git Workflow. Vi opererte med en master branch og en dev branch. Dev branchen var den viktigste branchen for utviklingen, og det var til denne vi merget ny funksjonalitet. Master branchen ble det kun merget til på slutten av prosjektet. I tillegg til disse to hadde vi flere feature og design branches hvor vi jobbet med å løse bestemte issues. Vi lagde issues på git og markerte alle commits (bortsett fra merge commits) med hvilket issue de tilhørte. Dette gjør det lett og gå tilbake på issues, og se hva som ble gjort. Vi brukte også issues til å foreta korte diskusjoner, samt lagre noen av resultatene vi kom frem til på møter.

![structure](https://i.imgur.com/BAPsiBQ.png)


#### Sources
- All icons are from https://www.flaticon.com/
- The creator of all of them were FreePik
- All music came from https://freemusicarchive.org/ 
- The license for all the audio are the Attribution-NonCommercial-ShareAlike 4.0 International
https://creativecommons.org/licenses/by-nc-sa/4.0/ 
- The artist of the rock songs are: Michael Rault
- The artist of the electronic songs are: KieLoKaz and Andre Jetson
- The artist of the jazz songs are: BeeBeeSea
- Sidebar hamburger button from https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_menu_icon_js

 

 
