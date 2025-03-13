<?php

namespace App\Http\Controllers;
use App\Models\Kiadas_kategoria;
use Illuminate\Http\Request;

class KiadasKategoria extends Controller
{
    public function index()
    {
        return Kiadas_kategoria::all();
    }

    public function show(Request $request)
    {
        $kiadas = Kiadas_kategoria::find($request->id);
        if(is_null($kiadas)){
            return response()->json(['message' => 'Felhasznalo nem talalhato'],404);
        }
        return response()->json($kiadas,200);
    }
}
