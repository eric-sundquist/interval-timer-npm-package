# LAB 2 - Interval Timer - For Developers

## Vision

Tick-Tock Interval Timer app let the user define a working timer followed by a resting timer. These intervals can then by multiplied in forms of sets. Upon start and end of a working session the user is notified visually and by sound. The application is presented as a web app with a simplistic and minimalistic user interface.

To set up a new timer the user defines a working time, resting time and how many times they should repeat, i.e. sets.

## Requirements

The application is defined by the following functional requirements:

1. As a user I want to be able to define a working time, resting time and amount of sets on intial page load.
2. As a user I want to be able to start the interval timer after entering a working time, resting time and amount of sets.
3. As a user I want to, after starting the interval timer, be presented with a countdown timer and the name of the current interval.
4. As a user I want to be able to pause/resume and reset a started interval timer.
5. As a user I want to be able to exit from a started interval timer and be able to define a new.
6. As a user I want to be notified when an interval ends by sound.
7. As a user I want the interval timer to expire after the last working interval.

## Test specification

Testing is performed via manual testing.

### Test cases

| Test case | What is tested | Input                                                        | Output |
| --------- | -------------- | ------------------------------------------------------------ | ------ |
| 1         | Req 1.         | Start the application by following the instruction in README |        |

| Test case nr | What is tested                                                                                                                      | Input                                                                                | Output                                                                                                                                        | Result PASS/FAIL |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| 1            | Instansiering av ett Timer object och utskrift av tid getTimeString-metoden. Utan att ställa någon tid på timern.                   | Starta upp test-appen genom att följa instruktionerna i README filen.                | Sidan ska laddas och tiden mellan "Set Timer" och timer kontrollerna ska visa 00:00.                                                          | PASS             |
| 2            | Sätta tiden på timern med setTime-metoden. Testar även getTimeString-metoden för att visa timerns interna tid i test applikationen. | Skriv in 12345 i inputfältet. Tryck på Set Timer.                                    | 03:25:45:00 ska visas                                                                                                                         | PASS             |
| 3            | Start av timern med start-metoden.                                                                                                  | Förkrav: Testfall ovan. Tryck därefter Startknappen.                                 | Timern ska nu börja räkna nedåt.                                                                                                              | PASS             |
| 4            | Pausa timern med pause-metoden.                                                                                                     | Förkrav: Testfall ovan. Tryck därefter på pause-knappen.                             | Timern ska stanna på den tid den var på när knappen trycktes.                                                                                 | PASS             |
| 5            | Återgå till att räkna ner efter pausning.                                                                                           | Förkav: Testfall ovan. Tryck på start-knappen                                        | Timern ska nu börja räkna ner från den tiden som den var pausad på.                                                                           | PASS             |
| 6            | Återställning av tiden på timern med reset-metoden.                                                                                 | Förkrav: Testfall ovan. Tryck på reset-knappen.                                      | Tiden ska nu visa den tid som den först sattas till i testfall 2. Alltså den ska visa 03:25:45:00. Tiden ska vara stoppad och inte räkna ner. | PASS             |
| 7            | Lägga till tid till en startad timer.                                                                                               | Förkrav: Testfall 3. Tryck på +5 knappen.                                            | 5 sekunder ska ha adderats till tiden.                                                                                                        | PASS             |
| 8            | Dra av tid från timern.                                                                                                             | Förkrav: Testfall 3. Tryck på -5 knappen.                                            | 5 sekunder ska ha dragits av tiden.                                                                                                           | PASS             |
| 9            | När timern når 0 ska ett expired event skickas ut och timern stannar på 0.                                                          | Förkrav: Testfall 1. Sätt timern på 5 sekunder och tryck på start. Vänta 5 sekunder. | Timern ska efter 5 sekunder stanna på 0 och i consolen printas "Timer expired"                                                                | PASS             |
