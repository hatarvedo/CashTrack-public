<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Kiadas_Kategoria;

class Kiadas extends Model
{
    use HasFactory;
    public $table = "kiadasok";
    protected $primaryKey = "kiadasID";
    public $timestamps = false;
    public $guarded = [];
    public function kategoria()
    {
        return $this->belongsTo(Kiadas_Kategoria::class, 'kategoriaID');
    }


}
