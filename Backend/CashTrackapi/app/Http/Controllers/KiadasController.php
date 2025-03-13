<?php

namespace App\Http\Controllers;

use App\Models\Kiadas;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class KiadasController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Kiadas::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'felhasznaloID' => 'required',
            'kiadasHUF' => 'required',
            'kiadasDatum' => 'required',
            'kategoriaID' => 'required'

        ]);
        if($validator->fails()){
            return response()->json(['message' => 'Nem megfelelő adatok'],400);
        }
        $kiadas = Kiadas::create($request->all());
        return response()->json($kiadas->all(),201);
    }

    /**
     * Display the specified resource.
        */
  /*   public function show ($kiadasID)
    {
        $kiadas = Kiadas::find($kiadasID);
        if(is_null($kiadas)){
            return response()->json(['message' => 'Nem található a kiadás'],400);
        }
        else
            return response()->json($kiadas,200);
    } */


    public function showByUser(Request $request)
    {
        $kiadas = Kiadas::where('felhasznaloID', $request->felhasznaloID)->with('kategoria')->get();
        if(is_null($kiadas)){
            return response()->json(['message' => 'Nem található a kiadás'],400);
        }
        else
            return response()->json($kiadas,200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Kiadas $kiadas)
    {
        $validator = Validator::make($request->all(),[
            'felhasznaloID' => 'required',
            'kiadasHUF' => 'required',
            'kiadasDatum' => 'required',
            'kategoriaID' => 'required'
        ]);
        if($validator->fails())
        {
            return response()->json(['message' => 'Nem megfelelő adatok'],400);
        }
        else{
            $kiadas = Kiadas::find($request->kiadasID);
            if(is_null($kiadas))
            {
                return response()->json(['message' => 'Nem található a kiadás'],400);
            }
            else
            {
                $kiadas->update($request->all());
                return response()->json($kiadas,200);    
            }  
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $kiadas = Kiadas::find($request->kiadasID);
        if (is_null($kiadas)) {
            return response()->json(['message' => 'Nem található a kiadás'], 400);
        }
        $kiadas->delete();
        return response()->json(['message' => 'Törölve lett a rekord.'], 204);
    }
}
