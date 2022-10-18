# Kapitelreflektioner

> Går över till svenska här då det gör det lättare att uttrycka mig bredare.

Gå igenom all kod inklusive kod från laboration 1 och uppdatera enligt bokens clean code kapitel 2-11 och det vi diskuterat på föreläsningar och workshops. Skriv en kort (4-6 meningar) reflektion för varje kapitel om hur just det kapitlet har påverkat eller inte påverkat din kod. Använd bokens termer. Ge exempel med läsbara screenshots från er kod till varje reflektion. Dokumentera detta till mig i ett separat dokument reflection.md där jag är mottagaren

Fokusera på tydlighet, variation, ärlighet och vad som är intressant. Exempelvis om du har icke självklara överväganden med olika kvalitetsregler som står i konflikt med varandra så är dessa extra intressanta.

## Kapitel 2 - Meaningful Names

Det viktigaste kapitlet för mig tillsammans med kapitel 3 - functions. Att skriva meningsfulla namn kan sänka antalet WTFs/minute drastiskt! Genom att göra koden självbeskrivande blir det mycket enklare att förstå dess innebörd. Tidigt i utbildningen blev vi uppmuntrade att skriva beskrivande namngivningar. Detta har jag tagit med mig och övat på under utbildningens gång. Detta kapitel hjälper att sätta ord på de tankar man själv haft när man försökt definera vad ett bra namn är.

Eftersom jag oftast skriver i Javascript som är dynamiskt typat har jag ofta haft en tendens att lägga till typinformation i namnen. Detta kan ha sin plats i JS,alternativt att man använder sig av JSDOC och definerear typ, men är en dålig vana i statiskt typade språk som java.

Exempel:

```javascript
// L1 modul, Timer.js, rad 137

  /**
   * @returns {String} - time in MM:SS format.
   */
  getMinutesAndSecondsString() {
    return new MillisecondsTimeFormatter(this.#timeUntilExpire()).getMinutesAndSecondsString()
  }
```

## Kapitel 3 - Functions

Som sagt har det här kapitlet varit högst inflytelse rikt på mig. Till skillnad från kapitel 2 var det mycket nytt här. Tidigare har jag mest brytit ur funktioner när jag känner att det börjat bli för mycket kod och komplexiteten har jag det svårt för mig själv att greppa. I CC ges man tydliga regler för att bryta ut funktioner. Små, göra en sak, en abstraktionsnivå är verkligen ledord som jag tagit med mig. En fälla jag ofta ser mig själv gå i är att de inte ska ha sidoeffekter. Sidoeffekter är att funktionen gör andra gömda saker än endast vad den utlovat. Jag tycker också att dessa kan vara svåra att få bukt med då det inte alltid är solklart att namnge och strukturera funktioner så att de endast gör vad de utlovar. Tycker också att regeln är ganska snarlik med "Do one thing". Till exempel:

```javascript
// L1 modul Timer.js rad 157.
  #updateTime() {
    this.#updateEllapsedTime()

    if (this.#isExpired()) {
      this.#endTimer()
    } else {
      this.#dispatchEvent('updated')
      this.#setNextTimerUpdate()
    }
  }
```

Funktionen utlovar att updatera tiden på timern, vilket den gör, men den kollar också om tiden har löpt ut och avslutar isåfall timern. Dessutom skickar den ett event när tiden uppdaterats och sätter kallar därefter på sig själv recursivt efter en timout. Vad scopet för en funktion "updateTime" och vad den bör göras argumenteras för på båda sidor tycker jag. De flesta anrop är starkt relaterat eller också en sidoeffekt till att tiden uppdateras. Det svåra är att avgöra om det är en gömd oönskad sido effekt eller inte. Så här i efterhand hade jag nog försökt bryta ur "endTimer" och göra checken någonstans utanför. Det svåra med det är att funktionen kallar på sig själv recursivt så det hade nog behövts refactorerats mycket.

## Kapitel 4 - Comments

Fick ett stort leende på läpparna och nickade instämmande när jag läste om "Redundant comments" och hur han tycker att stil guidelines som tvingar metodkommentarer är urbota dumt. Detta är något som vi tvingats på under utbildningen i samtliga kursen. (Förutom denna, tack Daniel! :smiley:) Jag har alltid kännt mig så otroligt dum när jag kommenterat JSDOC eller JavaDOC som säger exakt samma sak som metodnamnet redan gör tillsammans kommentaren "@param time - the time".

Annars kan jag bara instämma med allt han säger med grundpelaren att kommentarer kan inte göra upp för dålig kod. Gör koden lättförståerlig med hjälp av meningsfull namngiving och att refactorera så behövs sällan de där kommentarerna.

Ett undantag är väl återigen med Javascript som dynamiskt typat språk. Där gillar jag att lägga till JSDOC för viktiga variabler eller parametrar för att förtydliga vilken typ det ska vara.

Ett exempel på en radkommentar jag gjort där jag försöker förklara mitt syfte med en viss implementation då det inte är så uppenbart varför jag gjort på det sättet.

```javascript
// /src/js/components/interval-timer/index.js

// Importing like this to index.js makes for easier import of component, by only needing to import folder, while still having file name in IDE TAB.

import './interval-timer.js'
```

## Kapitel 5 - Formatting

Återigen intressant att kunna sätta ord för och få regler för hur man formatterar sina filer, något som jag länge har försökt på själv för att göra det mer lättförståerligt. Ofta har jag funderat på vart jag ska placera en metod jag brutit ut. Det kanske är en liten metod på lågabstraktion från en publik metod. Ska den ligga direkt efter eller ska den ligga sist med alla andra små metoder. I CC får vi guidelines för detta även om det inte alltid är solklart. Till exempel nyhets strukturen med hög abstraktion nivå högt uppe på sidan och mer detaljer längre ner. "Vertical distance" att liknande koncept ska ligga nära varandra. Här kan det ibland uppstå lite av en konflikt då den ena vill dela upp kod efter abstraktion och den andra efter koncept. Jag kan ibland ha svårt för att få till "rätt" ordning. CC reglerna i huvudet kan man åtmistona föra något slags konkret resonemang för hur det skulle kunna upprättas en ordning.

Exempel: (Har lagt till radkommentarer i koden som för mitt resonemang)

```javascript
// L1 modul - intervalTimer.js rad 50

#handleTimerInstanceExpired() {           // "högre" nivå på metod
    if (this.#isWorkTime) {
      this.#handleWorkTimerExpire()
    } else {
      this.#handleRestTimeExpire()
    }
  }

  #handleWorkTimerExpire() {              // "lägre"
    this.#soundEffect.playDingDing()

    if (!this.#isLastSet()) {
      this.#doRestTimer()
    } else {
      this.#isExpired = true
    }
  }

  #isLastSet() {                          // Denna skulle eventullt tas ner ett steg..
    return this.#currentSet === this.#sets  // ...eftersom den är på lägre abstraktion än metoden nedan...
  }                                         //Men den "tillhör" metoden ovan konceptuelt.

  #handleRestTimeExpire() {
    this.#soundEffect.playDing()
    this.#currentSet += 1
    this.#doWorkTimer()
  }
```

Horisontell ordning har för mig ofta manderats av en kodformatterare, tillsammans med dess regler, som tvingat en för det mesta god formattering. Dessa har till exempel alltid klagat om det inte varit mellanrum mellan två värden och en operator ex `a/b -> a / b`. Men som det lyfts i CC så finns det inga formatteringsregler skrivna i sten så i ett projekt tillsammans med andra programmerare får man ofta definera en gemensam stilguide för formattering.

## Kapitel 6 - Objects and Data Structures

Tack vare objekt orienterad programmering kan vi enkapsulera och abstrahera bort komplex logik och bara tillhandahålla ett simpelt interface. "Law of Demeter" förklarar att en modul inte ska veta om den interna strukturen hos ett ett objekt det manipulerar. Den förhindrar eller talar mot "train wreck" implemenationer där du har flera metod anrop kedjade efter varandra.

I IntervalTimer har jag enkapsulerat timer objectet och tillhandahåller ett interface för att pausa timern istället för att låta någon utomstånde anropa pause på timern direkt.

```javascript
// L2 modul
// IntervalTimer.js

  pause() {
    this.#timer.pause()
  }
```

## Kapitel 7 - Error Handling

I början av utbildnigen tyckte jag det var lite klurigt med exceptions men har efter mer användning uppskattat dem mer och mer. Det är också den enda typen av felhantering vi lärt oss. Jag gillar att man kan definera olika scopes för exceptions med hjälp av try catch block. Man kan antingen hantera det på låg abstraktionsnivå eller på högabstraktionsnivå. Alternativt låta det bubble upp och hantera det nära användargränsnittet. I javascript används bara unchecked exceptions vad jag vet. Jag kan tycka att det känns som att ett exceptions kommer lite från ingenstans när det fångas i ett catch block med ett brett scope. Men som det beskrivs i CC är det viktigt att undantaget beskriver kontext och källan till felet. Till exempel med att skicka med stack trace.

Här är ett exempel från min kod där try catch blocket är i ett begränsat scope. I det här fallet är det bara setTimer metoden som kastar undatag.

```javascript
// interval-timer.js

#handleStartNew(event) {
      if (!this.#isErrorMessageHidden()) {
        this.#errorMessageElement.classList.add('hidden')
      }

      try {
        this.#startTimer(event.detail)
        this.#updateComponentVisability()
      } catch (error) {
        this.#errorMessageElement.setErrorMessage(error.message)
        this.#errorMessageElement.classList.remove('hidden')
      }
    }

    /**
     * @param {Object} timerData
     */
    #startTimer(timerData) {
      this.#setTimer(timerData)
      this.#intervalTimer.startNew()
    }
```

## Kapitel 8 - Boundaries

Tredje parts kod låter oss importera ta del av andras lösningar på problem vi delar. Så slipper vi lösa samma problem igen. Det kan dock finnas många olika nyanser till det problem vi vill få löst. Det göra att den tredje parts lösning kanske inte alltid är den mest optimala för oss. Dessutom kan det vara väldigt svårt att sätta sig in i någon annas lib, eventuellt utan vetskap hur det är testat. Stötet man på eventuella buggar kan det också vara svårt att veta om det kommer från vår kod eller från tredje part. Alltså är det troligen en bra ide att skriva egna tester för de funktioner man använder av ett tredje parts lib. Inte bara kommer du kunna verifiera att den gör vad du tänkt, utan du kommer också lära dig om libet under processen av att skriva testen.

Det är också viktigt att ha allt för mycket beroende mot en tredje part. Eftersom man inte äger det kan skulle det kunna ändras och då vill man inte att dessa ändringar ska ha för stor konsekvens på sin egen kod.

I mitt fall har jag i den här upgiften turen att ha skapat även tredjeparts modulen tillsammans med dess tester. Något man för det mesta såklart inte har.

## Kapitel 9 - Unit Tests

Här förklars begrepp som TDD, test driven development, och hur Unit tests kan stå för grunden för konceptet. Jag läste först om begreppen under projektkursen och tyckte att det lät intressant men har tyvärr inte tagit mig tid att sätta mig in i det och utföra. Vilket jag är förväntansfull med inför testkursen.

Skrivna tester är en del av kodbasen och bör också innefattas av samma clean code riktlinjer som övrig kod. Det ska vara lätt att förstå och kunna läsa sig till vad ett unit test gör. Håll testerna små och till ett koncept.

I den här uppgiften har jag gjort manuella tester och har därför inget exempel att komma med.

## Kapitel 10 - Classes

Likt funktioner ska klasser hållas små, bryt ut, bryt ut! Variabler kommer först och därefter publika metoder, funktioners nyhets koncept gäller även här. Gör en sak och var sammhängande (cohesion). Encapsulera sånt som omvärlden inte behöver veta.

Här kund jag bryta ut en Sound klass från IntervalTimer:

```javascript
// Sound.js
export class Sound {
  #dingSound
  #dingDingSound

  constructor() {
    this.#dingSound = new Audio('../sound/ding.mp3')
    this.#dingDingSound = new Audio('../sound/ding-ding.mp3')
  }

  playDing() {
    this.#stopSound(this.#dingDingSound)

    this.#dingSound.play()
  }

  playDingDing() {
    this.#stopSound(this.#dingSound)

    this.#dingDingSound.play()
  }

  #stopSound(sound) {
    sound.pause()
    sound.currentTime = 0
  }
}
```

## Kapitel 11 - Systems

Har lyfts mer objekt orienterad och arkitekturell metodik för att hjälpa till att abstrahera stor system så att de kan utvecklas utan att förloras i dess komplexitet.
