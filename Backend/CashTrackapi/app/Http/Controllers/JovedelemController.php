<?php

namespace App\Http\Controllers;

use App\Models\Jovedelem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Supoort\Facdades\Auth;

class JovedelemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Jovedelem::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'felhasznaloID' => 'required',
            'bevetelHUF' => 'required',
            'bevetelDatum' => 'required',
            'kategoriaID' => 'required'
        ]);
        if($validator->fails()){
            return response()->json(['message' => 'Jovedelem nem talalhato'],400);
        }
        $jovedelem = Jovedelem::create($request->all());
        return response()->json($jovedelem,201);
    }
    

    /**
     * Display the specified resource.
     */
    public function show(Jovedelem $jovedelem,$jovedelemID)
    {
        $jovedelem = Jovedelem::find($jovedelemID);
        if(is_null($jovedelem)){
            return response()->json(['message' => 'Felhasznalo nem talalhato'],404);
        }
        return response()->json($jovedelem,200);
    }
    public function showByUser(Request $request)
    {
        $jovedelem = Jovedelem::where('felhasznaloID',$request->felhasznaloID)->with('kategoria')->get();
        if(is_null($jovedelem)){
            return response()->json(['message' => 'Nem található a kiadás'],400);
        }
        else
            return response()->json($jovedelem,200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Jovedelem $jovedelem, $jovedelemID)
    {
        $jovedelem = Jovedelem::find($jovedelemID);
        if(is_null($jovedelem)){
            return response()->json(['message' => 'Jovedelem nem talalhato'],404);
        }
        $jovedelem->update($request->all());
        return response($jovedelem,200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Jovedelem $jovedelem,$jovedelemID)
    {
        $jovedelem = Jovedelem::find($jovedelemID);
        if(is_null($jovedelem)){
            return response()->json(['message' => 'Jovedelem nem talalhato'],404);
        }
        $jovedelem->delete();
        return response()->json(null,204);
    }

    
}
