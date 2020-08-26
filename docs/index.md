---
Date:    2020-08-26
---

*Stand:* 26.08.2020
*Version:* 3.0.0

# DDB Studio Installations- &amp; Instandhaltungs-Handbuch

## Nomenklatur

### DDB Studio

DDB Studio besteht technisch aus zwei Komponenten,
zum einen aus dem [Omeka Multiinstanz Manager](#omeka-multiinstanz-manager-omim) 
und zum anderen aus der angepassten Version von [Omeka](#omeka).  
Je nach __[Servertyp](#servertypen)__ werden diese Komponenten __unterschiedlich__ 
installiert und aktualisiert.

#### Omeka Multiinstanz Manager - OMIM

OMIM ermöglicht das Bereitstellen, die Verwaltung und Veröffentlichung
von einzelnen virtuellen Ausstellungen d.h. von Omeka Instanzen.

Darüber hinaus können in OMIM Benutzer, Farbpaletten etc. der Ausstellungen verwaltet werden.

Das Repository bei github heißt __ddb-virtualexhibitions-manager__ 
und findet sich unter  
[https://github.com/Deutsche-Digitale-Bibliothek/ddb-virtualexhibitions-manager](https://github.com/Deutsche-Digitale-Bibliothek/ddb-virtualexhibitions-manager)

#### Omeka

Für die virtuellen Ausstellungen der DDB angepasste Version von Omeka.

Das Repository bei github heißt __ddb-virtualexhibitions__ und findet sich unter  
[https://github.com/Deutsche-Digitale-Bibliothek/ddb-virtualexhibitions](https://github.com/Deutsche-Digitale-Bibliothek/ddb-virtualexhibitions)

### Servertypen

#### Redaktionsserver  

Bezeichnet Server, auf denen die DDB-Studio-Redaktion neue Ausstellungen anlegt,
bearbeitet oder löscht und von denen aus sie Ausstellungen auf den 
Ausspielungsservern veröffentlicht.

Die Ausstellungen werden vor der Veröffentlichung hier von Kuratoren bearbeitet.  
Auf diesen Servern sind die zwei Komponenten von DDB Studio vollständig 
installiert.

In diesem Handbuch wird, für Beispiele und Erläuterungen, der 
Redaktionsserver mit der Beispieldomäne `redaktion.tld` gleichgesetzt.

#### Ausspielungsserver  

Bezeichnet Server, die zum Anzeigen der Ausstellungen für die Besucher dienen.  
Ausstellungen werden vom jeweiligen Redaktionsserver bei der Veröffentlichung 
automatisch hierhin übertragen.

Auf diesen Servern ist die Omeka-Komponente vollständig installiert, 
während von OMIM nur einzelne, spezielle Dateien installiert sind.

In diesem Handbuch werden, für Beispiele und Erläuterungen, die 
Ausspielungsserver mit den Beispieldomänen `live.tld` sowie `live-two.tld` 
gleichgesetzt.

#### Produktionsserver  

Bezeichnet Server, die der Öffentlichkeit (Kuratoren oder Besuchern) zugänglich sind.
Dabei gibt es einen Produktions-Redaktionsserver, sowie 1-n (derzeit zwei) Produktions-Ausspielungsserver.
Die Produktions-Ausspielungsserver sind hinter einen Loadbalancer geschaltet.

#### Testserver  

Bezeichnet Server, die zum Testen durch die DDB insbes. bei neuen Releases der Komponenten dienen.
Dabei gibt es einen Test-Redaktionsserver, sowie 1-n Test-Ausspielungsserver.


## Git-Repositorien

Bei der Installation oder Aktualisierung aus den beiden Git-Repositorien wird bei der
Aufforderung (Jira-Ticket) der zu verwendende Branch bzw. Tag angegeben.

-   OMIM  
    [https://github.com/Deutsche-Digitale-Bibliothek/ddb-virtualexhibitions-manager](https://github.com/Deutsche-Digitale-Bibliothek/ddb-virtualexhibitions-manager)
-   Omeka  
    [https://github.com/Deutsche-Digitale-Bibliothek/ddb-virtualexhibitions](https://github.com/Deutsche-Digitale-Bibliothek/ddb-virtualexhibitions)