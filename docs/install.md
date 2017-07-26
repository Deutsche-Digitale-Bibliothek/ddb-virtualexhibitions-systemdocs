## Allgemeine Anforderungen

Die Installation erfolgt auf [*nix-Servern] mit eingerichteter [LAMP] Konfiguration.

Voraussetzung ist, dass der Entwicklungsserver mit den Produktionsservern per SSH mit schlüsselbasierter Authentifizierung kommunizieren kann.

Die Server sollten jeweils über nicht weniger als 1GB RAM verfügen.

Für diese Dokumentation wird für die Beispiele und Erläuterungen der Entwicklungsserver mit der Beispieldomäne ``redaktion.tld`` und der Produktionsserver mit ``live.tld`` sowie ``live-two.tld`` gleichgesetzt.

## Apache Server
Auf allen Apache http-Servern (Entwicklung und Produktion) müssen mindestens folgende Module installiert und aktiviert sein:

- ``deflate``
- ``mime``
- ``rewrite``

Das Modul ``rewrite`` muss für .htaccess-Dateien des jeweiligen Hosts erlaubt sein.

Darüber hinaus muss in der Apachekonfiguration für den jeweiligen Host die Option `FollowSymLinks` muss gesetzt sein.

## MySQL Server
Version 5 oder höher und mit Verbindung über UNIX-SOCKET

## PHP
Version 5.4 oder höher.
Erforderliche Module/Extensions:

- MCrypt
- PHP JSON
- MYSQLI und PDO_MySQL
- EXIF
- php-imagick

Bitte die Einstellungen für große Dateiuploads innerhalb Omeka (z.B. Audiodateien) insbes. auf dem Entwicklungsserver in der php.ini anpassen.
Empfohlene Werte:

- max\_execution\_time = 7200
- max\_input\_time = 7200
- memory\_limit = 256M
- post\_max\_size = 200M
- upload\_max\_filesize = 200M

## ImageMagick
Muss auf allen Servern installiert sein.


[*nix-Servern]:http://en.wikipedia.org/wiki/Unix-like
[LAMP]:http://de.wikipedia.org/wiki/LAMP_%28Softwarepaket%29