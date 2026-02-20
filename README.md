# CoreX Smart-FAQ Engine ✨

Die **CoreX Smart-FAQ Engine** ist eine hochperformante, KI-gestützte Lösung zur automatischen Generierung von Produkt-FAQs für E-Commerce-Systeme (wie JTL-Shop). Sie verbessert die User Experience und stärkt das SEO-Ranking durch dynamische, relevante Inhalte.

## 🚀 Vorteile

### 1. SEO-Boost
* **Verweildauer**: Kunden verbringen mehr Zeit auf der Produktseite, um Antworten zu lesen.
* **Content-Dichte**: Erzeugt einzigartigen, relevanten Text, der von Suchmaschinen indexiert werden kann.
* **Rich Snippets**: Die Daten können leicht in Schema.org-Markup umgewandelt werden, um "Häufig gestellte Fragen" direkt in den Google-Suchergebnissen anzuzeigen.

### 2. Kosten-Effizienz (Smart Caching)
Das System verfügt über eine integrierte **Caching-Logik**. Eine KI-Anfrage wird pro Produkt nur **ein einziges Mal** gestellt. Das Ergebnis wird lokal als `.json` gespeichert. Jeder weitere Aufruf erfolgt blitzschnell ohne API-Kosten.

### 3. Conversion-Rate (CRO)
Direkte Beantwortung von Kundenfragen im Sichtfeld der Produktbilder reduziert die Absprungrate und steigert das Vertrauen.

## 🛠 Installation

1. Lade den Ordner `api/` auf deinen Server hoch.
2. Erstelle einen Unterordner `api/cache/` mit Schreibrechten (755).
3. Binde das JavaScript `smart-faq-engine.js` in deinem Shop-Template ein.
4. Trage deinen API-Key in der `api/config.php` ein.

## 🎨 Design & UI
Das Frontend wurde im **Clean-Design** entwickelt:
* **Hintergrund**: `#f7f7f7` (Soft Gray)
* **Schrift**: `#303030` (Deep Anthracite)
* **Layout**: Sticky-Positionierung unter der Bildergalerie für maximale Sichtbarkeit beim Scrollen.

## 🔍 SEO & Funktionsweise

### Wie die KI arbeitet
Das System analysiert die `product-description` direkt im Browser des ersten Besuchers. Dieser Text wird an das Backend gesendet, wo eine KI (z.B. GPT-4 oder Gemini) drei gezielte Fragen und Antworten generiert, die Kaufhürden abbauen.

### Das Caching-Prinzip (Kostenersparnis)
* **Schritt 1**: Ein Kunde besucht ein neues Produkt.
* **Schritt 2**: Das System prüft den `/cache/` Ordner. Keine Datei vorhanden? -> KI-Anfrage wird ausgelöst.
* **Schritt 3**: Die Antwort wird als statische `.json` Datei gespeichert.
* **Schritt 4**: Alle weiteren 10.000 Besucher erhalten sofort die gespeicherte Datei. 
* **Ergebnis**: Minimale Ladezeiten und nahezu Null API-Kosten nach der Initialisierung.

### SEO Vorteile
Durch die dynamische Injektion von textbasierten Antworten in den DOM erhöht sich die Relevanz der Seite für Long-Tail-Suchanfragen. Da die Antworten im Sichtbereich der Bilder liegen, steigt die Interaktionsrate (CTR), was ein positives Signal für Google darstellt.

---
Entwickelt von **Corex-Systems**
