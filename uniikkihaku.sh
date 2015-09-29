#!/bin/bash
[ $# -eq 0 ] && { echo "Käyttö: ./uniikkihaku.sh tiedostonimi"; exit 1; } 
nawk '{print $1}' $1 | sort | uniq -c | sort -h | nawk '{print $1}' | uniq -c | nawk '{print "Tietueita joissa on " $2 " LOW-tagia löytyy kannasta " $1 "."}'
KANNANKOKO=$(nawk '{print $1}' $1 | uniq | wc -l)
echo "Yhteensä kannassa on $KANNANKOKO tietuetta."
