## 💸 CashTrack, az Ön költségvetés kezelője
> A **CashTrack** egy költségvetés-kezelő, amivel nyomon követhető minden kiadás, illetve bevétel.

A **CashTrack** egy szakmai projekt keretein belül készül, amit a SZIKSZI diákjai: Martocean Máté, Pacza Dominik és Porkoláb Martin készítenek.

## 💸 CashTrack telepítése

### Követelmények:
* XAMPP ([Letöltés](https://www.apachefriends.org/download.html)) - 8.2.12 vagy újabb (aktuális verzió: 8.2.12 – 2025/02/06)
* Composer ([Letöltés](https://getcomposer.org/Composer-Setup.exe)) – v.2.8.5 vagy újabb (aktuális verzió: v2.8.5 – 2025/02/06)
* PHP: 8.1 vagy újabb
* Git ([Letöltés](https://git-scm.com/download/win)) – 2.48.1 vagy újabb (aktuális verzió: 2.48.1 – 2025/02/06)
* Node.js [Letöltés](https://nodejs.org/en) - v18.19.1 vagy újabb (aktuális verzió: v23.10.0 - 2025/03/16)


## Backend beüzemelési folyamat folyamat:
1.Telepítsük a XAMPP-ot, a Git-et, valamint a Composer-t a számítógépre.
2. Indítsuk el a XAMPP-ot, aztán a programon belül az Apache és MySQL szervereket.
3. Ha rendelkezünk mind a három programmal, nyissunk egy konzolos felületet. (pl. CMD, PowerShell). Írjuk be a következő parancsot: 
> composer global require laravel/installer
4. Migráljuk fel a táblákat a MySQL felületre a következő paranccsal:
> php artisan migrate —seed
5.A sikeres migráció után futtassuk a szervert a következő paranccsal:
>php artisan serve
