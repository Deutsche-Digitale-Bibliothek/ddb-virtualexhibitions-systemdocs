# Redaktionsserver

## MySQL Datenbank

### Bei Updates
Die bereits existierende Datenabnk kann weiter verwendet werden.

### Erst-Installation
Legen Sie bitte eine leere Datenbank mit der Kollation ``utf8_unicode_ci`` und einen MySQL Benutzer an. Gewähren Sie dem MySQL Benutzer alle Rechte auf die Datenbank.
Sie erhalten initial eine MySQL-Datenbank-Dump-Datei, die Sie **einmalig** auf dem Redaktionsserver in die von Ihnen erstellte Datenbank einlesen müssen.

## Dateien

### Vorbereitung bei Upgrade auf Git-Verion
Falls Sie ein Upgrade auf die Git-Version durchführen, sichern Sie zunächst alle Dateien aus dem Verzeichnis ``app\config`` und die SSH-Schlüssel aus dem Verzeichnis ``data/rsa/``, sowie die bereits vorhandenen Omneka Instanzen aus dem Ordner ``public``!
Das sind alle Verzeichnisse unter ``public`` außer diesen:

- js
- css
- fonts
- assets
- packages

### Installation
Klonen Sie zunächst das [Repository](https://github.com/Deutsche-Digitale-Bibliothek/ddb-virtualexhibitions-manager) für OMIM in eine **leeres** Verzeichnis auf Server.


!!! note "Verzeichnis- und Dateirechte"
    Es muss gewährleistet sein, dass der Benutzer bzw. die Gruppe, unter der Apache / PHP auf dem Server ausgeführt wird, Lese- und Schreibzugriff auf alle erstellten Verzeichnisse und Dateien hat. Dazu sollten die Berechtigungen gesetzt sein, indem die **Gruppe** gleich der primären Gruppe von Apache / PHP ist (i.d.R. ``www-data``) und die Rechte für Verzeichnisse auf ``775`` und für Dateien auf ``664`` gesetzt sind.

Klonen jetzt Sie das [Repository](https://github.com/Deutsche-Digitale-Bibliothek/ddb-virtualexhibitions) direkt in den Unterordner ``lib``.
Verwenden sie dazu den Befehl ```git clone https://github.com/Deutsche-Digitale-Bibliothek/ddb-virtualexhibitions.git . --branch master```
um das Repositorium direkt in den Ordner zu klonen (es muss am Ende ein Pfad exisiteren mit ``lib/omeka``).
Falls Sie das Argument ```--branch master``` am Ende weggelassen haben und Sie noch nicht im master Branch sind, wechseln Sie jetzt in den Branch master mit ```git checkout master```.

!!! warning "Der aktuelle Branch ist master"
    Beachten Sie, dass Sie bis auf Weiteres immer nur mit der master Branch arbeiten. Nur dort sind die Dateien für die stabilen Releases enthalten.

Bei einer **Upgrade-Installation** Verschieben oder kopieren Sie jetzt, die im vorigen Schritt gesicherten, Dateien und Ordner an Ihre jeweiligen Orte (``app\config``, ``data/rsa/``, ``public``)!

Achten Sie darauf, dass in der Apache Serverkonfiguration das ``DOCUMENT_ROOT`` von der Domäne auf das ``public`` Verzeichnis zeigt.

### Konfiguration

Wenn Sie eine Upgrade Installation durchführen, brauchen Sie die Konfigurationsdateien nicht weiter anzupassen, sondern nur aus der Sicherung zu übernehmen.

Hier der für die Konfiguration relevanten Dateien:

* * *

- app
    - config
        - app.php
        - database.php
        - mail.php
        - omim.php
- data
    -  rsa
        -  ddb_rsa
        -  ddb_rsa.pub
- public

* * *

#### app/config/app.php

Allgemeine Konfiguration des OMIM

- 'debug'
    - Standardwert: ``false``
    - Falls ``true`` werden bei Fehlern des OMIM detaillierte Meldungen angezeigt
- 'url'
    -  Standardwert: ``'http://redaktion.tld'``
    -  Hier bitte die URL des Redaktionsservers angeben

#### app/config/database.php
Datenbankeinstellungen des **Redaktionsservers**
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

- Tragen Sie unter ``database``, ``username`` und ``password`` die Angaben für die MySQL-Datenbank auf dem Redaktionsserver ein (s.o. unter "MySQL Datenbank").
- Passen Sie ggf. den Pfad ``unix_socket`` zu der Unix Socket Datei an.

##### app/config/mail.php
Sollten Sie wünschen, dass OMIM E-Mails versenden kann, tragen Sie hier bitte die entsprechenden Werte ein.

##### app/config/omim.php
Spezifische Konfiguration für die OMIM Anwendung.

Verwenden Sie als Vorlage die [omim.sample.php](https://github.com/Deutsche-Digitale-Bibliothek/ddb-virtualexhibitions-manager/blob/master/app/config/omim.sample.php)

!!! warning "Aktualisierungen und neue Versionen von OMIM"
    Beachten Sie, dass die Einträge in der aktuellen omim.sample.php, unter dem Schlüssel  
    ```'common' => 'db' => 'tables'``` mit ihrer Konfiguration übereinstimmen müssen!

Relevanter Konfigurationsabschnitt für Development- und Remote-Server:

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


- Tragen Sie unter ``['development']['user']['group']`` die Apache Benutzergruppe des Redaktionsservers ein.
- Tragen Sie unter ``['remote']['n']['production']['http']['url']`` die URL des jeweiligen Ausspielungsservers ein.
- Tragen Sie unter ``['remote']['n']['production']['ssh']['host']`` den Hostnamen oder die IP-Adresse des jeweiligen Ausspielungsservers ein.
- Tragen Sie unter ``['remote']['n']['production']['ssh']['port']`` den SSH Port ein, über den der Ausspielungsserver per SSH erreichbar ist.
- Tragen Sie unter ``['remote']['n']['production']['ssh']['username']`` den Namen des Benutzers, der sich per SSH mit dem jeweiligen Ausspielungsserver verbinden soll, ein.
- Tragen Sie unter ``['remote']['n']['production']['ssh']['key']`` den absoluten Dateipfad zu der privaten Schlüsseldatei, mit dem sich der Benutzer am Redaktionsserver anmeldet, ein. Es empfiehlt sich selbst einen neuen RSA-Key auf dem Redaktionsserver zu erzeugen. Sie müssen dann den öffentlichen Schlüssel auf dem Ausspielungsserver in die ``authorized_keys`` Datei des Benutzers (unter ``home/benutzername/.ssh/authorized_keys``) importieren. Achten Sie darauf, dass der Schlüssel selbst nicht durch eine Passphrase geschützt sein darf, da die Server-zu-Server Anmeldung sonst nicht automatisiert ablaufen kann. Vergewissern sie sich ggf. auch, dass die Schlüsseldatei dem entsprechenden Benutzer (und der Gruppe) gehört und ändern Sie ggf. die Zugriffsrechte.
- Tragen Sie unter ``['remote']['n']['production']['ssh']['docroot']`` den absoluten Pfad zu dem in der Apache-Konfiguration (Virtaul Host) festgelegten ``DOCUMENT_ROOT`` des Ausspielungsservers ein. Beachten sie, dass dieser zwingend auf das Verzeichnis ``public`` des Ausspielungsservers zeigen muss (s.u.)
- Tragen Sie unter ``['remote']['n']['production']['ssh']['datadir']`` den absulten Pfad zu dem ``data`` Verzeichnis des Ausspielungsservers ein. Beachten Sie, dass dieser zwingend auf das Verzeichnis ``data`` des Ausspielungsservers zeigen muss.
- Tragen Sie unter ``['remote']['n']['production']['ssh']['group']`` die Gruppe ein, unter der Apache / PHP auf dem Ausspielungsserver ausgeführt wird.
- Tragen Sie in den Unterschlüsseln von ``['remote']['n']['production']['db']`` die Datenbankangaben für den **Ausspielungsserver** ein.
    - Tragen Sie unter ``database``, ``username`` und ``password`` die Angaben für die MySQL-Datenbank auf dem Ausspielungsserver ein (s.u. unter "MySQL Datenbank").
    - Passen Sie ggf. den Pfad ``unix_socket`` zu der Unix Socket Datei an.
    - Beachten Sie, dass diese Einstellungen in die Omeka-DB-INI-Dateien auf dem Ausspielungsserver übernommen werden. Das bedeutet, dass sich z.B. die Angabe 'localhost' auf den Ausspielungsserver bezieht.

##### data/rsa/ddb\_rsa und data/rsa/ddb\_rsa.pub
Private und öffentliche Schlüsseldatei zur Verwendung für die Authentifizierung bei SSH-Verbindungen.
Bitte generieren Sie aus Sicherheitsgründen selbst ein Schlüsselpaar (s.o.).

##### public
Dieses Verzeichnis muss in der Apache-Konfiguration des Redaktionsservers das ``DOCUMENT_ROOT`` der Domäne sein (s.o).
Übernehmen Sie bei einer Upgrade-Installation alle Verzeichnisse von bereits angelegten Instanzen.

## Konvertieren vorhander Ausstellungen

Um bereits vorhandene Ausstellungen zu konvertieren, kopieren Sie aus ``data/deploy.tar.gz`` die Dateien:

- files/layout/pagethumbnail/default-page-icon.jpg
- files/layout/pagethumbnail/default-summary-icon.jpg
- bootstrap.php
- index.php

in alle Verzeichnisse von Ausstellungs-Instanzen unter ``public`` und ersetzen so alle alten Dateien.


## Cronjobs

Um erzeugte Download-Dateien regelmäßig automatisch löschen zu lassen, richten Sie einen Cronjob ein.

Für den Cronjob finden Sie im OMIM die [cron.php](https://github.com/Deutsche-Digitale-Bibliothek/ddb-virtualexhibitions-manager/blob/master/cron.php). Aktualisieren Sie Ihr Repository, falls die Datei auf Ihrem Server noch nicht vorhanden ist.

Sie können in der cron.php-Datei unter  `#!php $threshold = 1 * 24 * 60 * 60; // a day;` die Zeit in Sekunden einstellen, die bestimmt, wie alt die Dateien maximal sein dürfen, um nicht gelöscht zu werden. Standardmäßig steht der Wert auf einem Tag, d.h. alle Dateien, die älter als ein Tag sind, werden, bei Aufruf der cron.php, aus dem Verzeichnis ```public/downloads``` gelöscht.

Damit die cron.php als Cronjpb ausgeführt werden kann, muss auf dem Server php-cli >= v.5.x installiert sein. Das sollte i.d.R. der Fall sein. Überprüfen Sie das, indem Sie auf der Kommandozeile den Befehl ```php -v``` eingeben. Sollte php nicht im Pfad stehen, suchen Sie php mit dem Befehl ```whereis php```. Die Ausgabe sollte i.d.R. den Pfad ```/usr/bin/php ``` enthalten. Für diesen Pfad sollte der Versionstest entsprechend funktionieren: ```/usr/bin/php -v```.

Richten Sie Crontab (```crontab -e```) ein. Fügen Sie eine Zeile hinzu mit:

```sh linenums="1"

0 0 * * * php /pfad/auf/server/zu/cron.php

```
Alternativ setzen sie den vollen Pfad zur PHP-Executable:

```sh linenums="1"

0 0 * * * /usr/bin/php /pfad/auf/server/zu/cron.php

```

In dem Beispiel wird der Job einmal täglich ausgeführt. Sie können die Frequenz natürlich ändern.

!!! warning "Lese- und Schreibrechte des Benutzers"
    Beachten Sie, dass der Benutzer, der den Cronjob ausführt, Lese- und Schreibrechte 
    für die Dateien im Verzeichnis ```public/downloads``` haben muss! Sollte das nicht der Fall sein,
    konfigurieren Sie den Cronjob in einem Benutzerkontext, der über entsprechende Rechte verfügt.