# RailWatch 🚂

Suomalaisten junien reaaliaikainen seuranta — PWA joka toimii iPhonessa ja Androidissa.

## Tiedostot

```
index.html      ← Koko sovellus (yksi tiedosto)
manifest.json   ← PWA-asetukset
sw.js           ← Service Worker (offline + ilmoitukset)
icon-192.png    ← Sovelluskuvake
icon-512.png    ← Sovelluskuvake (iso)
```

## GitHub Pages -käyttöönotto

### 1. Luo uusi repository GitHubissa

Kirjaudu GitHubiin → **New repository** → anna nimeksi esim. `railwatch`

### 2. Lataa tiedostot

Vaihtoehto A — GitHub web-käyttöliittymä (helpoin):
1. Avaa repository
2. Klikkaa **Add file → Upload files**
3. Vedä kaikki 5 tiedostoa (index.html, manifest.json, sw.js, icon-192.png, icon-512.png)
4. Klikkaa **Commit changes**

Vaihtoehto B — Git komentorivillä:
```bash
git init
git add .
git commit -m "Initial RailWatch PWA"
git branch -M main
git remote add origin https://github.com/SINUN-KÄYTTÄJÄNIMI/railwatch.git
git push -u origin main
```

### 3. Ota GitHub Pages käyttöön

1. Repository → **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: **main** / **(root)**
4. Klikkaa **Save**
5. Odota ~2 min → osoite on `https://KÄYTTÄJÄNIMI.github.io/railwatch/`

### 4. Lisää iPhoneen kotinäyttöön

1. Avaa Safari iPhonessa
2. Mene osoitteeseen `https://KÄYTTÄJÄNIMI.github.io/railwatch/`
3. Jaa-painike (neliö nuolella) → **Lisää kotinäyttöön**
4. Nimeä "RailWatch" → **Lisää**
5. Sovellus toimii nyt kuin natiivi iOS-app!

## Ominaisuudet

| Toiminto | Kuvaus |
|---------|---------|
| 🗺️ **Kartta** | Kaikki junat kartalla, GPS-sijainti päivittyy 5 sekunnin välein |
| 🚆 **Junaluettelo** | Haku, suodatus (live / myöhässä), myöhästymistiedot |
| 🔔 **Vahdit** | Hälytykset veturityypeistä, junanumeroista, asemista, reiteistä |
| 📸 **Kuvauskohteet** | Tallenna kuvauspaikat, saa ennakkovaroitus lähestyvästä junasta |
| 🔔 **Hälytykset** | Historia kaikista lauenneista vahdeista |

## Vahti-tyypit

- **Veturityyppi** — Hälytys kun Dr16, Sr1, Sr2 jne. havaitaan
- **Ajoneuvonumero** — Tietty vaunun/veturin numero
- **Junanumero** — Seuraa tiettyä junaa
- **Junatyyppi** — IC, S, P, T...
- **Asema** — Juna saapuu/lähtee asemalta
- **Reitti** — Juna ajaa tietyn reitin
- **Lähestyminen** — GPS-pohjainen, kun juna on X km päässä

## Tietolähteet

Kaikki junatieto: [Digitraffic](https://rata.digitraffic.fi) (Fintraffic, CC BY 4.0)
Kartta: [OpenStreetMap](https://openstreetmap.org) (ODbL)

## Tietosuoja

- Ei rekisteröitymistä, ei palvelinta
- Vahdit ja kuvauskohteet tallennetaan vain laitteellesi (localStorage)
- Sovellus hakee vain julkista avointa junadataa
