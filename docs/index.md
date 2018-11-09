---
Date:    2017-10-15
---

*Stand:* 06.11.2018
*Version:* 2.0.4

Omeka Multiinstanz Manager - OMIM
=================================

OMIM ermöglicht das Bereitstellen und die Verwaltung von Omeka Instanzen.
Es setzt dabei eine Produktionslinie von min. zwei Servern voraus.

- Entwicklungs- bzw. Redaktionsserver (Ausstellungsredaktionssystem)
- Produktions- bzw. Liveserver (Mutterinstanz) bzw. Produktions-Ausspielungsserver mit 1-n Servern (für Loadbalancing)

OMIM wird auf dem Redaktionsserver installiert und eingerichtet.
Die Software ermöglicht das Veröffentlichen von Instanzen auf den Ausspielungsservern.

## Testserver

Bei der Einrichtung von Testservern, ist das Vorgehen grundsätzlich identisch zu dem im Folgenden beschriebenen. Allerdings wird dort, sowohl von OMIM als auch DDB Omeka die __develop-Branch__ bei GitHub verwendet:

- [DDB Virtualexhibitions Manager - develop](https://github.com/Deutsche-Digitale-Bibliothek/ddb-virtualexhibitions-manager/tree/develop)
- [DDB Omeka - develop](https://github.com/Deutsche-Digitale-Bibliothek/ddb-virtualexhibitions/tree/develop)