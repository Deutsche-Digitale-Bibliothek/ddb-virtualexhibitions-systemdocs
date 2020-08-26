
# Installation

## MySQL

Legen Sie bitte eine leere Datenbank mit der Kollation `utf8_unicode_ci` und einen MySQL Benutzer an. Gewähren Sie dem MySQL Benutzer alle Rechte auf die Datenbank.
Die Datenbank bleibt leer und wird, durch die Aktion "Veröffentlichen" bei der Verwendung von OMIM, vom Redaktionsserver aus mit Daten befüllt.

!!! warning "Konfiguration OMIM"
    Achten darauf, dass die Angaben unter  
    `['remote']['n']['production']['db']` in der 
    [Konfiguration des Redaktionsservers](dev-srv.html#appconfigomimphp)
    für die Datenbank auf diesen Ausspielungsserver korrekt sein müssen.

## Dateien
## Stammverzeichnis

Erstellen Sie in einem leeren Ordner ihrer Wahl (Stammverzeichnis) drei Unterordner:

- `data`
- `lib`
- `public`

Sorgen Sie dafür, dass in der Apache Serverkonfiguration der `DOCUMENT_ROOT` der Domäne auf das Unterverzeichnis `public` zeigt.

!!! warning "Konfiguration OMIM"
    Beachten Sie, dass die Pfadangaben in  
    `['remote']['n']['production']['ssh']['docroot']` und  
    `['remote']['n']['production']['ssh']['datadir']` in der 
    [Konfiguration des Redaktionsservers](dev-srv.html#appconfigomimphp)
    für diesen Ausspielungsserver die korrekten absoluten Serverpfade für die Ordner `public` und `data` enthalten müssen.

!!! note "Verzeichnis- und Dateirechte"
    Es muss gewährleistet sein, dass einerseits der Benutzer, mit dessen Konto sich der Redaktionsserver per SSH verbindet und andererseits die Gruppe, unter der Apache & PHP auf dem Server ausgeführt werden, Lese- und Schreibzugriff auf alle erstellten Verzeichnisse und Dateien haben.

    Sie können dazu z.B. den Benutzer für alle betreffenden Verzeichnisse und Dateien auf den SSH-Benutzer und die Gruppe auf die Gruppe von Apache & PHP und die Rechte für Verzeichnisse auf 775 und für Dateien auf 664 setzen.

### OMIM

Klonen Sie das **[Git-Repositorium von OMIM][repo_omim]** in ein **leeres** Verzeichnis auf dem Server. Checken Sie den jeweils abgesprochenen Branch für die Installation aus. 

!!! warning "Speicherort für Git-Repositorium von OMIM"
    Bitte klonen Sie auf Ausspielungsservern das Repositorium von OMIM **NICHT** in das [Stammverzeichnis](#stammverzeichnis), wo sich `data`, `lib` und `public` befinden!

Kopieren Sie die Datei `.htaccess` aus dem Ordner `data/production` in dem Git-Repositorium von OMIM nach `public` im oben erstelltem Stammverzeichnis.

Kopieren Sie die Dateien `deploy.tar.gz` und `deploy_lf.tar.gz` aus dem Ordner `data/production` in dem Git-Repositorium von OMIM nach `data` im oben erstelltem Stammverzeichnis. Bitte die Dateien hier wirklich kopieren und nicht per symbolischer Verknüpfung setzen.

!!! warning "Ordnername production"
    Beachten Sie, dass sich der Ordnername `production`, aus historischen Gründen, 
    nicht nach der aktuellen Nomenklatur richtet! `production` steht für hier **Ausspielungsserver**.  
    Der Ordner hat nichts mit der Unterscheidung nach Test- oder Produktionsumgebungen zu tun!

### Omeka

In das oben erstellte Verzeichnis **`lib`** im Stammverzeichnis, muss der Inhalt bzw. der Unterordner `omeka` des **[Git-Repositoriums von Omekas][repo_omeka]** gelegt werden. Dazu gibt es zwei Möglichkeiten:

Zum einen, können Sie das [Git-Repositorium von Omeka][repo_omeka] in ein beliebiges Verzeichnis auf dem Server klonen und dann eine symbolische Verknüpfung bei OMIM innerhalb von `lib` auf den Unterordner `omeka` erstellen (Die anderen Ordner und Dateien wie LICENSE, README.md etc. werden dort nicht benötigt). 

Zum anderen können Sie auch direkt das [Git-Repositorium von Omeka][repo_omeka] innerhalb des Unterverzeichnis `lib` klonen.

Gleich für welche Methode Sie sich entscheiden, muss am Ende in OMIM ein Pfad existieren mit `lib/omeka`.

Vergessen Sie auch beim **[Git-Repositorium von Omeka][repo_omeka]** nicht, den jeweils abgesprochenen Branch für die Installation auszuchecken.

### SSH

Denken Sie daran, den öffentlichen Schlüssel des SSH Benutzers vom [Redaktionsserver](index.html#redaktionsserver) in die `authorized_keys` Datei einzutragen.

# Aktualisierungen
## MySQL

Die bereits existierende Datenbank kann, sofern Sie die [Anforderungen](install.html#mysql-server) erfüllt, weiterhin verwendet werden.
Die Datenbankinhalte werden über [OMIM](index.html#omeka-multiinstanz-manager-omim) aktualisiert, sodass hier i.d.R. kein Handlungsbedarf besteht.


## Dateien
### OMIM

In der Regel werden die benötigten Dateien vom Redaktionsserver aus automatisch aktualisiert.
Falls dennoch Handlungsbedarf besteht, werden Sie explizit dazu aufgefordert.

### Omeka

Vergewissern Sie sich, dass Sie sich im Ordner von Omeka in der richtigen Git-Branch befinden und checken Sie ggf. die erforderlioche Branch aus. Führen Sie dann den `git pull` bzw. `git fetch` und `git merge` Befehl aus. 

### Sprachdateien Cache

Omeka (bzw. die Zend Framework Komponente) legt für die verwendeten Sprachdateien bzw. Übersetzungen einen Cache auf dem jeweiligen Server an.
Dieser muss nach Aktualisierungen von Omeka, die die Sprachdateien betreffen (wir weisen entsprechend im Ticket darauf hin), vom Server gelöscht werden, da sonst Änderungen in den Sprachdateien nicht unmittelbar wirksam werden.

Die Dateien liegen in dem Standard-Temp-Verzeichnis des Servers, was standardmäßig ``/tmp`` sein sollte.
Die Dateinamen fangen immer mit der Zeichenfolge ``omeka_i18n_cache---`` an. Diese Dateien bitte auf allen Servern nach der Aktualisierung von Omeka bitte löschen.
Die Dateien werden beim nächsten Seitenaufruf automatisch wieder neu erstellt.


[repo_omim]:https://github.com/Deutsche-Digitale-Bibliothek/ddb-virtualexhibitions-manager
[repo_omeka]:https://github.com/Deutsche-Digitale-Bibliothek/ddb-virtualexhibitions