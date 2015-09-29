#!/bin/bash
[ $# -eq 0 ] && { echo "Käyttö: ruutu-dl lähtö-URL"; exit 1; } 
NIMI_JAKSO=$(echo $1 | egrep -o [0-9a-z-]+ | tail -1)
NIMI_SARJA=$(echo $1 | egrep -o [0-9a-z-]+ | tail -n 2 | head -n 1)
OSOITE2=$(curl -s $1 | egrep -o 'http:\/\/gatling.ruutu.fi\/media-xml-cache\?id=[0-9]+')
OSOITE3=$(curl -s $OSOITE2 | egrep -o 'rtmp:\/\/stream.nelonen.fi\S+.mp4')
TIEDOSTONIMI="$NIMI_SARJA""_""$NIMI_JAKSO"".mp4"
rtmpdump -R -r ${OSOITE3} -o ${TIEDOSTONIMI}