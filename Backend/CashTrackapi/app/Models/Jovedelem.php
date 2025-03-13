<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Jovedelem_Kategoria;

class Jovedelem extends Model
{
    use HasFactory;
    public $table = "jovedelmek";
    public $timestamps = false;
    protected $primaryKey = "jovedelemID";
    public $guarded = [];
    public function kategoria()
    {
        return $this->belongsTo(Jovedelem_Kategoria::class, 'kategoriaID');
    }
}
