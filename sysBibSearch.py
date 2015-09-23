#!/usr/bin/env python
# -*- coding: utf-8 -*

# Ohjelma muodostaa LOW-tagien poistoajoja varten poistettavista tietueista listan muotoa <SYS>\t<BIB>
# Syötteenä annetaan 1) lista poistettavista Melinda-id-tunnisteista
# 2) Tietokannan <BIB> <SYS> -muotoinen indeksi replikointipalvelimelta

import sys

def parseFile(sysList, bibSysIndex):
  with open(sysList, 'rt') as f:
    sysIDsToRemove = f.read()
    sysIDsToRemove = sysIDsToRemove.split('\n')
  with open(bibSysIndex, 'rt') as f:
    completeBibSysIndex = f.read()
  completeBibSysIndex = completeBibSysIndex.split('\n')
  sysBibDict = {}
  errors = []
  for line in completeBibSysIndex:
    line = line.strip(' ')
    try:
      bib, sys = line.split(' ')
    except:
      if (len(line) > 4):
        errors.append('Error with ' + line)
    sysBibDict[sys] = bib
  for line in sysIDsToRemove:
    try:
      print('{0}\t{1}'.format(line, sysBibDict[line]))
    except:
      if (len(line) > 4):
        errors.append('Error with ' + line)
  for line in errors:
    print(line)

if __name__ == '__main__':
  if (len(sys.argv) >= 2):
    sysList = sys.argv[1]
    bibSysIndex = sys.argv[2]
  else:
    print('Arguments: 1) a list of Melinda-IDs to remove, 2) an index file, format: <BIB> <SYS>')
    sys.exit()
  parseFile(sysList, bibSysIndex)
