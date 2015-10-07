#!/usr/bin/env python
# -*- coding: utf-8 -*

import os
import argparse
import time
import datetime


class Kysely(object):
    def __init__(self):
        self.directory = "/dev/shm/alina/fin01/"
        self.seqfiles = []
        for dirnames, subdirlist, filenames in os.walk(self.directory,
                                                       topdown=False):
                for filename in filenames:
                        self.seqfiles.append(os.path.join(dirnames, filename))
        self.seqfiles = sorted([x for x in self.seqfiles if x[-4:] == '.seq'])

    def esityskokoonpano(self):
            # Tulosta listaus musiikin esityskokoonpanokirjauksista:
            start_time = time.time()
            kentat = [130, 240, 600, 610, 630, 700, 710, 730, 800, 810, 830]
            osakentat = ['m']
            esityskokoonpanot = self.haku(kentat, osakentat)
            tiedostonimi = "esityskokoonpanot.txt"
            kuvaus = """Esityskokoonpanokirjaukset Melindasta: kentät 130, 240,
600, 610, 630, 700, 710, 730, 800, 810, 830 (osakenttä $m)"""
            self.kirjoita(esityskokoonpanot, tiedostonimi, kuvaus)
            executionTime = round((time.time() - start_time))
            print("Done. Processing time: " + self.calculate(executionTime))

    def sovitusmerkinto(self):
            start_time = time.time()
            kentat = [130, 240, 600, 610, 630, 700, 710, 730, 800, 810, 830]
            osakentat = ['o']
            sovitusmerkinnot = self.haku(kentat, osakentat)
            tiedostonimi = "sovitusmerkinnat.txt"
            kuvaus = """Sovitusmerkinnöt Melindasta: kentat 130, 240, 600, 610,
630, 700, 710, 730, 800, 810, 830 (osakentta $o)"""
            self.kirjoita(sovitusmerkinnot, tiedostonimi, kuvaus)
            executionTime = round((time.time() - start_time))
            print("Done. Processing time: " + self.calculate(executionTime))

    def haku(self, kentat, osakentat):

            recordcount = 0
            currentrecord = ""
            osumat = []
            readfiles = 0
            osakenttatunnukset = []
            for osakentta in osakentat:
                    tunnus = "$$" + osakentta
                    osakenttatunnukset.append(tunnus)
            for file in self.seqfiles:
                    inputfile = open(file, 'rt')
                    for line in inputfile:
                            id = line[:9]
                            if id != currentrecord:
                                    recordcount += 1
                                    currentrecord = id
                            field = line[10:13]
                            if field.isdigit() and int(field) in kentat:
                                    for tunnus in osakenttatunnukset:
                                            if tunnus in line:
                                                    sisalto = self.listaksi(line)
                                                    for x in sisalto:
                                                            koodi = x[0]
                                                            if koodi in osakentat:
                                                                    osuma = x[1:].strip()
                                                                    osumat.append(osuma)
                    readfiles += 1
                    if readfiles % 10000 == 0:
                            print("Read {0} records...".format(recordcount))
                    inputfile.close()
            osumat = sorted(osumat)
            return osumat

    def kirjoita(self, lista, tiedostonimi, kuvaus):
            uniikit = []
            o = open(tiedostonimi, 'w')
            kuvaus = kuvaus.upper()
            ts = time.time()
            aikaleima = datetime.datetime.fromtimestamp(ts).strftime('%d-%m-%Y %H:%M:%S')
            o.write(kuvaus + "\n" + aikaleima + "\n\n")
            for l in lista:
                    if not l in uniikit:
                            o.write(l + "\n")
                            uniikit.append(l)
            o.close()

    def calculate(self, time):
            value = str(datetime.timedelta(seconds=time))
            return value

    def listaksi(self, rivi):
            # Palauttaa rivin listaksi pilkottuna muodossa
            # ['KENTTÄKOODI', 'aDimdum', 'cLiidadaada']
            field = rivi[10:13]
            content = rivi[18:-1]
            subfields = content.split("$$")
            if subfields[0] == "":
                    del subfields[0]
            subfields.insert(0, field)
            return subfields


if __name__ == '__main__':
        parser = argparse.ArgumentParser(description="Aleph Seq dump processor")
        parser.add_argument("-e", "--esityskokoonpano",
                            help="Hae listaus esityskokoonpanoista",
                            action='store_true')
        parser.add_argument("-o", "--sovitusmerkinto",
                            help="Hae listaus sovitusmerkinnöistä",
                            action='store_true')
        args = parser.parse_args()
        kysely = Kysely()
        if args.esityskokoonpano:
                kysely.esityskokoonpano()
        if args.sovitusmerkinto:
                kysely.sovitusmerkinto()
