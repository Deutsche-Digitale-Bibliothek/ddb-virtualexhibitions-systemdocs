Konfiguration
=============

Es können in den Skriptdateien verschiedene Konfigurationen vorgenommen werden.

## DDB Video-Quellen

In der Datei 

```ddb-virtualexhibitions/omeka/plugins/ExhibitBuilder/helpers/ExhibitDdbHelper.php```

können die Schlüssel der Eigenschaft ```$config``` geändert werden, um die Videoquellen der DDB festzulegen. Folgende Schlüssel können angepasst werden:

- ```ddbXmlSrv``` Server mit XML Daten
- ```ddbIIFResHelperSrvPrefix``` Server mit JSON Daten für Videobildgrößen
- ```ddbIIIFSrvPrefix``` IIF Server mit Bilddateien
- ```ddbVideoSrvPrefix``` Server mit Videodateien

## Lizenz-Shortcodes

In der Datei 

```ddb-virtualexhibitions/omeka/plugins/ExhibitBuilder/helpers/ExhibitDdbHelper.php```

in der Methode ```getLicenseFromShortcode``` können in der Variable ```$licenses``` die Lizenz-Shortcodes angepasst werden.

Der Aufbau der jeweiligen Einträge ist:
```
'SHORTCODE' => array(
    'name' => 'Name der Lizenz',
    'link' => 'URL zu der Lizenzdefinition',
    'icon' => 'HTML Markup für die Ausgabe von Icons'
)
```

Beim Schlüssel icon können mehrere Icons angegeben werden.  
HTML Format für Icons:

```
<i class="license CSS-KLASSE-DES-JEWEILGEN-ICONS"> </i>
```

Die Grafikdatei für die Icons befindet sich unter:

```<root-der-installation>/lib/omeka/themes/ddb/images/licenses.png```

CSS-Definitionen sind in der Datei:

```<root-der-installation>/lib/omeka/themes/ddb/css/style.css```

Definierte CSS-Class-Selectoren:

- .license-by
- .license-nd
- .license-nc
- .license-sa
- .license-pd
- .license-pdzero
- .license-rr
- .license-or
- .license-vw

## DBB Basis-URL

Zur Verlinkung mit der DDB in der Top-Navigation und im Footer kann die Variable ```$ddbBaseDomain``` in den Dateien 

- ```ddb-virtualexhibitions/omeka/themes/ddb/common/header.php```
- ```ddb-virtualexhibitions/omeka/themes/ddb/common/footer.php```

angepasst werden.