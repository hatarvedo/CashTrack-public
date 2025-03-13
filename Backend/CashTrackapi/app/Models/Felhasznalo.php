<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Felhasznalo extends Model
{
    use HasFactory;
    public $table = "felhasznalok";
    public $timestamps = false;
    protected $primaryKey = 'felhasznaloID';
    protected $fillable = ['vezeteknev', 'keresztnev', 'email', 'jelszo', 'profilkepUrl'];
}
