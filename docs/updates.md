Aktualisierungen
================

Aktualisierungen erhalten alle Server über die GitHub-Repositories.
Bei Updates von OMIM über dieses [Repository](https://github.com/Deutsche-Digitale-Bibliothek/ddb-virtualexhibitions-manager) auf der "master" Branch.
Bei Updates von Omeka über dieses [Repository](https://github.com/Deutsche-Digitale-Bibliothek/ddb-virtualexhibitions) auf der "master" Branch..

Bei Updates die lokalen Repositories dann entsprechend mit ```git pull``` aktualisieren.

## Sprachdateien Cache

Omeka (bzw. die Zend Framework Komponente) legt für die verwendeten Sprachdateien bzw. Übersetzungen einen Cache auf dem Server an.
Dieser muss nach Updates von Omeka vom Server gelöscht werden, da sonst Änderungen in den Sprachdateien nicht (gleich) wirksam werden.

Die Dateien liegen in dem Standard-Temp-Verzeichnis des Servers, was standardmäßig ```/tmp``` sein sollte.
Die Dateinamen fangen immer mit der Zeichenfolge ```omeka_i18n_cache---``` an. Diese Dateien bitte auf allen Server nach jedem Omeka Update bitte einfach löschen.
Sie werden beim nächsten Seitenaufruf automatisch wieder neu erstellt.
