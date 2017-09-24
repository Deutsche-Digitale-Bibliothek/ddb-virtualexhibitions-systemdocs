
# Produktionsserver

## MySQL Datenbank

### Bei Updates

Die bereits existierende Datenabnk kann weiter verwendet werden.

### Erst-Installation

Legen Sie bitte eine leere Datenbank mit der Kollation ``utf8_unicode_ci`` und einen MySQL Benutzer an. Gewähren Sie dem MySQL Benutzer alle Rechte auf die Datenbank.
Die Datenbank bleibt leer und wird bei der Aktion "Veröffentlichen" des OMIM vom Entwicklungsserver aus mit Daten befüllt.


## Dateien

### Bei Updates

Erstellen Sie eine Kopie von allen Unterordnern von ``public``.

### Installation und Konfiguration

Erstellen Sie in einem leeren Ordner drei Unterordner:

- `data`
- `lib`
- `public`

Speichern Sie aus der [Repository des DDB Virtual-Exhibitions-Manager](https://github.com/Deutsche-Digitale-Bibliothek/ddb-virtualexhibitions-manager/tree/master/data/production) die Dateien ``.htaccees`` und ``deploy.tar.gz``. (Sie konnen die ganze Repository als ZIP herunter laden und die Dateien dann aus dem Ordner ``ddb-virtualexhibitions-manager/data/production/`` extrahieren.). Speichern Sie dabei die Datei ``.htaccees`` im Ordner ``public`` und die Datei ``deploy.tar.gz`` im Ordner ``data``.

!!! warning "Repository für Repository des DDB Virtual-Exhibitions-Manager nicht klonen!"
    Bitte klonen Sie auf Produktionsservern das Repository des DDB Virtual-Exhibitions-Manager **nicht** in das Stammverzeichnis!
    Die zwei Dateien aus dem Repository müssen nur einmalig per Hand kopiert werden. Später werden beim Veröffentlichen die Dateien ggf. automatisch erstzt.

Klonen jetzt Sie das [Repository](https://github.com/Deutsche-Digitale-Bibliothek/ddb-virtualexhibitions) direkt in den Unterordner ``lib``.
Verwenden sie dazu den Befehl ```git clone https://github.com/Deutsche-Digitale-Bibliothek/ddb-virtualexhibitions.git . --branch omeka-2.5```
um das Repositorium direkt in den Ordner zu klonen (es muss am Ende ein Pfad exisiteren mit ``lib/omeka``).
Falls Sie das Argument ```--branch omeka-2.5``` am Ende weggelassen haben, wechseln Sie jetzt in den Branch omeka-2.5 mit ```git checkout omeka-2.5```.

!!! warning "Der aktuelle Branch ist omeka-2.5"
    Beachten Sie, dass Sie bis auf Weiteres immer nur mit der omeka-2.5 Branch arbeiten. Nur dort sind die Dateien aktualisiert.
    Der Master-Branch ist noch die alte Omeka-Version.

!!! note "Verzeichnis- und Dateirechte"
    Es muss gewährleistet sein, dass einerseits der Benutzer, mit dessen Konto sich der Entwicklungsserver per SSH verbindet und andererseits die Gruppe, unter der Apache / PHP auf dem Server ausgeführt wird, Lese- und Schreibzugriff auf alle erstellten Verzeichnisse und Dateien haben.
    Setzen Sie dazu den Benutzer für alle betreffenden Verzeichnisse und Dateien auf den SSH-Benutzer und die Gruppe auf die Gruppe von Apache / PHP (i.d.R. www-data) und die Rechte für Verzeichnisse auf 775 und für Dateien auf 664.

Falls Sie ein Update vornehmen kopieren Sie die gesicherten Unterordner von ``public`` wieder dort hin.

Das Verzeichnis ``public`` muss in der Apache-Konfiguration des Servers das ``DOCUMENT_ROOT`` der Domäne sein.

Denken Sie daran, den öffentlichen Schlüssel des SSH Benutzers vom Entwicklungsserver in die ``authorized_keys`` Datei einzutragen.