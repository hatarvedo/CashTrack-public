<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Kiadas_kategoria;
use App\Models\Jovedelem_kategoria;
use App\Models\Felhasznalo;
use App\Models\Jovedelem;
use App\Models\Kiadas;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        /*$kategoriak = ['Ház','Lakás','Építési telek','Garázs','Mezőgazdasági terület','Ipari ingatlan'];
        foreach ($kategoriak as $key => $value) 
        {
          Kategoria::create(['nev'=> $value]);
        }*/

        $kiadasKategoriak = ['Étel', 'Ház', 'Közlekedés', 'Telefonszolgáltató', 'Egészségügy', 'Ruházat', 'Higénia', 'Gyerekek', 'Szórakozás', 'Utazás', 'Edzés', 'Megtakarítás', 'Malacpersely','Hiteltörlesztés', 'Támogatás', 'Egyéb'];
        foreach ($kiadasKategoriak as $key => $value) {
          Kiadas_kategoria::create(['kiadasKategoria' => $value]);
        }

        $jovedelemKategoriak = ['Fizetés', 'Banki kamat', 'Hitelfelvétel', 'Nyugdíj', 'Ösztöndíj', 'GYES', 'GYED', 'Egyéb'];
        foreach ($jovedelemKategoriak as $key => $value) {
          Jovedelem_kategoria::create(['jovedelemKategoria' => $value]);
        }
        $felhasznalok = [
          ['Porkoláb','Martin','porkolab.martin@szikszi-ozd.hu','123'],
          

        ];
        foreach ($felhasznalok as $key => $value) {
          Felhasznalo::create(['vezeteknev' => $value[0], 'keresztnev' => $value[1], 'email' => $value[2], 'jelszo' => $value[3]]);
        }
        $kiadasok = [
          [1,20000,'2024-12-24',9,'teszt'],
          [1,23000,'2025-01-01',7,'teszt2'],
          [1,30000,'2025-01-04',5,'teszt3'],
          [1,45000,'2025-01-08',6,'teszt4'],
          [1,70000,'2025-01-11',7,'teszt5'],
          [1,8500,'2025-01-21',1,'teszt6']

        ];
        foreach ($kiadasok as $key => $value) {
          Kiadas::create(['felhasznaloID' => $value[0], 'kiadasHUF' => $value[1], 'kiadasDatum' => $value[2], 'kategoriaID' => $value[3], 'kiadasKomment' => $value[4]]);
        }

        $jovedelmek =[
          [1,1500000,'2024-12-24',1],
          [1,2000000,'2025-01-31',2],
          [1,2300000,'2024-12-31',3],
          [1,400000,'2025-01-21',4],
          [1,210000,'2025-01-23',4],
          [1,10000,'2025-01-12',2]
        ];
        foreach ($jovedelmek as $key => $value) {
          Jovedelem::create(['felhasznaloID' => $value[0], 'bevetelHUF' => $value[1], 'bevetelDatum' => $value[2], 'kategoriaID' => $value[3]]);
        }
    }
}
