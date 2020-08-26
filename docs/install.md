## Allgemeine Anforderungen

Die Installation erfolgt auf [*nix-Servern] mit eingerichteter [LAMP] Konfiguration.

Voraussetzung ist, dass der [Redaktionsserver] mit den [Ausspielungsservern] per SSH mit schlüsselbasierter Authentifizierung kommunizieren kann.

Die Server sollten jeweils über nicht weniger als 1GB RAM verfügen.


## Apache Server
Auf allen Apache http-Servern müssen mindestens folgende Module installiert und aktiviert sein:

- `deflate`
- `mime`
- `rewrite`

Das Modul `rewrite` muss für .htaccess-Dateien des jeweiligen Hosts erlaubt sein.

Darüber hinaus muss in der Apachekonfiguration für den jeweiligen Host die Option `FollowSymLinks` gesetzt sein.

## MySQL Server
Version 5 oder höher und mit Verbindung über UNIX-SOCKET  
<small>(Getestet Version: MariaDB 10.1.44, sowie MySQL 5.7.26)</small>

## PHP
Version 5.4 oder höher.  
<small>(Getestete Version: 7.2 (mit FastCGI-Prozessmanager php7.2-fpm))</small>

Erforderliche Module/Extensions:

- MCrypt
- PHP JSON
- MYSQLI und PDO_MySQL
- EXIF
- php-imagick
- cURL

### php.ini

Empfohlene Mindestwerte insbes. auf Redaktionsservern:

- `max_execution_time = 7200`
- `max_input_time = 7200`
- `memory_limit = 256M`
- `post_max_size = 200M`
- `upload_max_filesize = 200M`

## ImageMagick

Muss auf allen Servern installiert sein.

## mozjpeg und jpeg-archive

mozjpeg muss auf [Redaktionsservern][Redaktionsserver] installiert sein:  
https://github.com/mozilla/mozjpeg

jpeg-archive muss auf [Redaktionsservern][Redaktionsserver] installiert sein:  
https://github.com/danielgtaylor/jpeg-archive/


[*nix-Servern]:https://en.wikipedia.org/wiki/Unix-like
[LAMP]:https://de.wikipedia.org/wiki/LAMP_%28Softwarepaket%29
[Redaktionsserver]:index.html#redaktionsserver
[Ausspielungsservern]:index.html#ausspielungsserver