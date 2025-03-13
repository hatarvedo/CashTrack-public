<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Kiadas_kategoria extends Model
{
    use HasFactory;
    public $table = "kiadasKategoriak";
    
    public $timestamps = false;
    protected $primaryKey = "kategoriaID";
    public $guarded = ['kiadasKategoria'];
  
}
