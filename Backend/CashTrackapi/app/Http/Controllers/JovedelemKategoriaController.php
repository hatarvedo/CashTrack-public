<?php

namespace App\Http\Controllers;

use App\Models\Jovedelem_kategoria;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Jovedelem;

class JovedelemKategoriaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Jovedelem_kategoria::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'jovedelemKategoria' => 'required'
        ]);
        if($validator->fails()){
            return response()->json(['message' => 'Nem megfelelő adatok'],400);
        }
        $kategoria = Jovedelem::create($request->all());
        return response($kategoria,201);
    }
    

    /**
     * Display the specified resource.
     */
    public function show(jovedelemKategoria $jovedelemKategoria)
    {
        $jovedelem = Jovedelem::find($kategoriaID);
        if(is_null($jovedelem)){
            return response()->json(['message' => 'Felhasznalo nem talalhato'],404);
        }
        return response()->json($jovedelem,200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, jovedelemKategoria $jovedelemKategoria)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(jovedelemKategoria $jovedelemKategoria)
    {
        //
    }
}
