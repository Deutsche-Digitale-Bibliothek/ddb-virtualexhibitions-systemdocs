# Installation
## MySQL

Legen Sie bitte eine leere Datenbank mit der Kollation `utf8_unicode_ci` und einen MySQL Benutzer an. Gewähren Sie dem MySQL Benutzer alle Rechte auf die Datenbank.
Sie erhalten initial eine MySQL-Datenbank-Dump-Datei, die Sie **einmalig** auf dem Redaktionsserver in die von Ihnen erstellte Datenbank einlesen müssen.

## Dateien
### OMIM

Klonen Sie zunächst das **[Git-Repositorium von OMIM][repo_omim]** in ein **leeres** Verzeichnis auf dem Server. Checken Sie den jeweils abgesprochenen Branch für die Installation aus.

Sorgen Sie dafür, dass in der Apache Serverkonfiguration der `DOCUMENT_ROOT` der Domäne auf das Unterverzeichnis `public` zeigt.

Sorgen Sie ebenfalls dafür, dass der Benutzer bzw. die Gruppe, unter der Apache & PHP auf dem Server ausgeführt werden, **Lese- und Schreibzugriff** auf **alle** erstellten Verzeichnisse und Dateien hat.

### Omeka

In dem oben geklonten [Git-Repositorium von OMIM][repo_omim] befindet sich ein Unterverzeichnis **`lib`**. Dort hinein muss der Inhalt bzw. der Unterordner `omeka` des **[Git-Repositoriums von Omeka][repo_omeka]** gelegt werden. Dazu gibt es zwei Möglichkeiten:

Zum einen, können Sie das [Git-Repositorium von Omeka][repo_omeka] in ein beliebiges Verzeichnis auf dem Server klonen und dann eine symbolische Verknüpfung bei OMIM innerhalb von `lib` auf den Unterordner `omeka` erstellen (Die anderen Ordner und Dateien wie LICENSE, README.md etc. werden dort nicht benötigt). 

Zum anderen können Sie auch direkt das [Git-Repositorium von Omeka][repo_omeka] innerhalb des Unterverzeichnis `lib` klonen.

Gleich für welche Methode Sie sich entscheiden, muss am Ende in OMIM ein Pfad existieren mit `lib/omeka`.

Vergessen Sie auch beim **[Git-Repositorium von Omeka][repo_omeka]** nicht, den jeweils abgesprochenen Branch für die Installation auszuchecken.

## Konfiguration
### OMIM

Die Konfiguration erfolgt über die Dateien im Unterverzeichnis `app/config` des [Git-Repositoriums von OMIM][repo_omim].

Benennen oder kopieren Sie zunächst in dem Ornder `app/config` folgende Dateien um:

- `app.sample.php` zu `app.php`
- `database.sample.php` zu `database.php`
- `omim.sample.php` zu `omim.php`

Für die Konfiguration sind insgesamt folgende Dateien anzupassen:  
<small>(Alle anderen Konfigurationsdateien können mit den Standardeinstellungen beibehalten werden)</small>

* * *

- app
    - config
        - app.php
        - database.php
        - (mail.php)
        - omim.php

* * *

#### app/config/app.php

Passen Sie hier die allgemeine Konfiguration der OMIM-APP an.

Relevanter Konfigurationsabschnitt:

- 'url'
    -  Standardwert: `'http://redaktion.tld'`
    -  Hier bitte die URL des Redaktionsservers angeben
- 'key'
    -  Standardwert: `'R5rt8vDRd3z75QyPqwEk1q88y5sCIH08'`
    - Hier bitte einen 32 Zeichen lange Zeichenkette eingeben

#### app/config/database.php

Passen Sie hier die Datenbankeinstellungen des **Redaktionsservers** an.

Relevanter Konfigurationsabschnitt:

``` php linenums="43"
<?php

    // ...

    'connections' => array(
        'mysql' => array(
            'driver'    => 'mysql',
            'host'      => 'localhost',
            'unix_socket' => '/tmp/mysql5.sock',
            'database'  => 'Name der Datenbank',
            'username'  => 'Benutzername',
            'password'  => 'Passwort',
            'charset'   => 'utf8',
            'collation' => 'utf8_unicode_ci',
            'prefix'    => '',
        ),
    ),

    // ...

```

- Tragen Sie unter `database`, `username` und `password` die Angaben für die MySQL-Datenbank auf dem Redaktionsserver ein.
- Passen Sie ggf. den Pfad `unix_socket` zu der Unix Socket Datei an.

#### app/config/mail.php

Sollten Sie wünschen, dass OMIM E-Mails versenden kann, tragen Sie hier bitte die entsprechenden Werte ein.

#### app/config/omim.php

Passen Sie hier die spezifische Konfiguration für die OMIM Anwendung an.

Relevanter Konfigurationsabschnitt:

``` php linenums="49"
<?php

    // ...

    'development' => array(
        'user' => array(
            'group' => 'www-data'
        )
    ),

    'remote' => array(
        0 => array(
            'production' => array(
                'http' => array(
                    'url' => 'http://live.tld'
                ),
                'ssh' => array(
                    'host' => 'live.tld',
                    'port' => '22',
                    'username' => 'Benutzername für SSH',
                    'key' => '/path/to/private/rsa/key/file',
                    'docroot' => '/path/to/document_root/on/live/server',
                    'datadir' => '/path/to/data/dir/on/live/server',
                    'group' => 'www-data'
                ),
                'db' => array(
                    'host'      => 'localhost',
                    'database'  => 'Name der Datenbank',
                    'username'  => 'Benutzername',
                    'password'  => 'Passwort',
                    'charset'   => 'utf8',
                    'collation' => 'utf8_unicode_ci',
                    'unix_socket' => '/tmp/mysql5.sock',
                )
            )
        ),
        1 => array(
            'production' => array(
                'http' => array(
                    'url' => 'http://live-two.tld'
                ),
                'ssh' => array(
                    'host' => 'live-two.tld',
                    'port' => '22',
                    'username' => 'Benutzername für SSH',
                    'key' => '/path/to/private/rsa/key/file',
                    'docroot' => '/path/to/document_root/on/live/server',
                    'datadir' => '/path/to/data/dir/on/live/server',
                    'group' => 'www-data'
                ),
                'db' => array(
                    'host'      => 'localhost',
                    'database'  => 'Name der Datenbank',
                    'username'  => 'Benutzername',
                    'password'  => 'Passwort',
                    'charset'   => 'utf8',
                    'collation' => 'utf8_unicode_ci',
                    'unix_socket' => '/tmp/mysql5.sock',
                )
            )
        ),
    )

    // ...

```

`['development']['user']['group']` 
:   Tragen Sie hier die Apache **Benutzergruppe** des Redaktionsservers ein.

`['remote']['n']['production']['http']['url']`
:   Tragen Sie die **URL** des jeweiligen Ausspielungsservers ein.

`['remote']['n']['production']['ssh']['host']`
:   Tragen Sie den **Hostnamen** oder die IP-Adresse des jeweiligen Ausspielungsservers ein.

`['remote']['n']['production']['ssh']['port']`
:   Tragen Sie den SSH **Port** ein, über den der Ausspielungsserver per SSH erreichbar ist.

`['remote']['n']['production']['ssh']['username']`
:   Tragen Sie den **Benutzernamen** des Benutzers, der sich per SSH mit dem jeweiligen Ausspielungsserver verbinden soll, ein.

`['remote']['n']['production']['ssh']['key']`
:   Tragen Sie den absoluten Dateipfad zu der privaten **Schlüsseldatei**, mit dem sich der Benutzer am Redaktionsserver anmeldet, ein. Sie müssen zunächst einen RSA-Key auf dem Redaktionsserver erzeugen. Sie müssen dann den öffentlichen Schlüssel auf dem Ausspielungsserver in die `authorized_keys` Datei des Benutzers importieren. Achten Sie darauf, dass der Schlüssel selbst nicht durch eine Passphrase geschützt sein darf, da die Server-zu-Server Anmeldung sonst nicht automatisiert ablaufen kann. Vergewissern sie sich ggf. auch, dass die Schlüsseldatei dem entsprechenden Benutzer (und der Gruppe) gehört und ändern Sie ggf. die Zugriffsrechte.

`['remote']['n']['production']['ssh']['docroot']`
:   Tragen Sie den absoluten Pfad, zu dem in der Apache-Konfiguration festgelegten `DOCUMENT_ROOT` des Ausspielungsservers, ein. Beachten sie, dass dieser zwingend auf das Verzeichnis `public` des Ausspielungsservers zeigen muss.

`['remote']['n']['production']['ssh']['datadir']`
:   Tragen Sie den absoluten Pfad zu dem `data` Verzeichnis des Ausspielungsservers ein. Beachten Sie, dass dieser zwingend auf das Verzeichnis `data` des Ausspielungsservers zeigen muss (s.u.).

`['remote']['n']['production']['ssh']['group']`
:   Tragen Sie die Benutzergruppe ein, unter der Apache & PHP auf dem Ausspielungsserver ausgeführt wird.

`['remote']['n']['production']['db']['database']`
:   Tragen Sie hier den Namen der Datenbank auf dem **Ausspielungsserver** ein.

`['remote']['n']['production']['db']['username']`
:   Tragen Sie hier den Benutzernamen der Datenbank auf dem **Ausspielungsserver** ein.

`['remote']['n']['production']['db']['password']`
:   Tragen Sie hier das Passwort für den Benutzer der Datenbank auf dem **Ausspielungsserver** ein.

`['remote']['n']['production']['db']['unix_socket']`
:   Passen Sie ggf. den Pfad zu der Unix Socket Datei auf dem **Ausspielungsserver** an.


!!! danger "Variablenbezeichnungen"
    Beachten Sie, dass in der Konfigurationsdatei die Bezeichnungen sich, aus historischen Gründen, nicht nach der aktuellen Nomenklatur richten!  
    Der Konfigurationsschlüssel `development` steht für den **Redaktionsserver**.  
    Der Konfigurationsschlüssel `production` steht für einen **Ausspielungsserver**.  
    Die Variablenbezeichnungen haben nichts mit der Unterscheidung nach Entwicklungs- oder Produktionsumgebungen zu tun!

!!! info "Remotekonfiguration"
    Beachten Sie, dass die Einstellungen für `db` unter `remote` in die Omeka-DB-INI-Dateien auf den Ausspielungsservern übernommen werden. Das bedeutet, dass sich z.B. die Angabe 'localhost' auf den jeweiligen Ausspielungsserver bezieht.

#### Verzeichnis /public
Dieses Verzeichnis muss in der Apache-Konfiguration des Redaktionsservers das `DOCUMENT_ROOT` der Domäne sein.

## Cronjobs

Um unter OMIM erzeugte Download-Dateien regelmäßig automatisch löschen zu lassen, richten Sie einen Cronjob ein.

Für den Cronjob finden Sie im OMIM die [cron.php](https://github.com/Deutsche-Digitale-Bibliothek/ddb-virtualexhibitions-manager/blob/master/cron.php). Aktualisieren Sie Ihr Repositorium, falls die Datei auf Ihrem Server nicht vorhanden ist.

Sie können in der cron.php-Datei unter  `#!php $threshold = 1 * 24 * 60 * 60; // a day;` die Zeit in Sekunden einstellen, die bestimmt, wie alt die Dateien maximal sein dürfen, um nicht gelöscht zu werden. Standardmäßig steht der Wert auf einem Tag, d.h. alle Dateien, die älter als ein Tag sind, werden, bei Aufruf der cron.php, aus dem Verzeichnis `public/downloads` gelöscht.

Damit die cron.php als Cronjpb ausgeführt werden kann, muss auf dem Server php-cli >= v.5.x installiert sein. Das sollte i.d.R. der Fall sein. Überprüfen Sie das, indem Sie auf der Kommandozeile den Befehl `php -v` eingeben. Sollte php nicht im Pfad stehen, suchen Sie php mit dem Befehl `whereis php`. Die Ausgabe sollte i.d.R. den Pfad `/usr/bin/php ` enthalten. Für diesen Pfad sollte der Versionstest entsprechend funktionieren: `/usr/bin/php -v`.

Richten Sie Crontab (`crontab -e`) ein. Fügen Sie eine Zeile hinzu mit:

``` sh linenums="1"
0 0 * * * php /pfad/auf/server/zu/cron.php
```

Alternativ setzen sie den vollen Pfad zur PHP-Executable:

``` sh linenums="1"
0 0 * * * /usr/bin/php /pfad/auf/server/zu/cron.php
```

In dem Beispiel wird der Job einmal täglich ausgeführt. Sie können die Frequenz natürlich ändern.

!!! warning "Lese- und Schreibrechte des Benutzers"
    Beachten Sie, dass der Benutzer, der den Cronjob ausführt, Lese- und Schreibrechte 
    für die Dateien im Verzeichnis `public/downloads` haben muss! Sollte das nicht der Fall sein,
    konfigurieren Sie den Cronjob in einem Benutzerkontext, der über entsprechende Rechte verfügt.



# Aktualisierungen

Alle Aktualisierungen werden über die jeweiligen [GitHub-Repositorien bereit](index.html#git-repositorien) gestellt.

## MySQL

Die bereits existierende Datenbank kann, sofern Sie die [Anforderungen](install.html#mysql-server) erfüllt, weiterhin verwendet werden.
Die Datenbankinhalte werden über [OMIM](index.html#omeka-multiinstanz-manager-omim) aktualisiert, sodass hier i.d.R. kein Handlungsbedarf besteht.

## Dateien
### OMIM

Falls Sie im Verzeichnis `app/config` Dateien editiert haben, sichern Sie diese zunächst. 

Vergewissern Sie sich, dass Sie sich im Ordner von OMIM in der richtigen Git-Branch befinden und checken Sie ggf. die erforderliche Branch aus.
Führen Sie dann den `git pull` bzw. `git fetch` und `git merge` Befehl aus. 

Spielen Sie ggf. gesicherte Konfigurationsdateien zurück.

### Omeka

Vergewissern Sie sich, dass Sie sich im Ordner von Omeka in der richtigen Git-Branch befinden und checken Sie ggf. die erforderliche Branch aus. Führen Sie dann den `git pull` bzw. `git fetch` und `git merge` Befehl aus. 

### Sprachdateien Cache

Omeka (bzw. die Zend Framework Komponente) legt für die verwendeten Sprachdateien bzw. Übersetzungen einen Cache auf dem jeweiligen Server an.
Dieser muss nach Aktualisierungen von Omeka, die die Sprachdateien betreffen (wir weisen entsprechend im Ticket darauf hin), vom Server gelöscht werden, da sonst Änderungen in den Sprachdateien nicht unmittelbar wirksam werden.

Die Dateien liegen in dem Standard-Temp-Verzeichnis des Servers, was standardmäßig `/tmp` sein sollte.
Die Dateinamen fangen immer mit der Zeichenfolge `omeka_i18n_cache---` an. Diese Dateien bitte auf allen Servern nach der Aktualisierung von Omeka bitte löschen.
Die Dateien werden beim nächsten Seitenaufruf automatisch wieder neu erstellt.

[repo_omim]:https://github.com/Deutsche-Digitale-Bibliothek/ddb-virtualexhibitions-manager
[repo_omeka]:https://github.com/Deutsche-Digitale-Bibliothek/ddb-virtualexhibitions