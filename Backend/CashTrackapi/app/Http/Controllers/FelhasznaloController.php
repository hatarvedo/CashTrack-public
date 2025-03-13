<?php

namespace App\Http\Controllers;

use App\Models\Felhasznalo;
use Illuminate\Http\Request;
use  Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class FelhasznaloController extends Controller
{
    public function index()
    {
        return Felhasznalo::all();
    }

    public function getFelhasznalo()
    {
        return response()->json(Felhasznalo::all(),200);
    }

    public function getFelhasznaloById($felhasznaloID){
        $felhasznalo = Felhasznalo::find($felhasznaloID);
        if(is_null($felhasznalo)){
            return response()->json(['message' => 'Felhasznalo nem talalhato'], 404);
        }
        return response()->json($felhasznalo, 200);
    }

   




    public function getFelhasznaloByEmail(string $email)
    {
        $felhasznalo = Felhasznalo::where('email', $email)->first();

        if (is_null($felhasznalo)) {
            return response()->json(['message' => 'Felhasznalo nem talalhato'], 404);
        }

        return response()->json($felhasznalo, 200);
    }
    public function addFelhasznalo(request $request){
        $validator = Validator::make($request->all(),[
            'vezeteknev' => 'required',
            'keresztnev' => 'required',
            'email' => 'required',
            'jelszo' => 'required'

        ]);
        if($validator->fails()){
            return response()->json($validator->errors(),400);
        }
            $felhasznalok = Felhasznalo::create($request->all());
            return response($felhasznalok,201);
        
       
    }
    public function updateFelhasznalo(Request $request, $felhasznaloID){
        $felhasznalo = Felhasznalo::find($felhasznaloID);
        $validator = Validator::make($felhasznalo->all(),[
            'vezeteknev' => 'required',
            'keresztnev' => 'required',
            'email' => 'required',
            'jelszo' => 'required'
        ]);
        if(is_null($felhasznalo)){
            return response()->json(['message' => 'Felhasznalo nem talalhato'], 404);
        }
        $felhasznalo->update($request->all());
        return response($felhasznalo,200);
    }
    public function deleteFelhasznalo($felhasznaloID){
        $felhasznalo = Felhasznalo::find($felhasznaloID);
        if(is_null($felhasznalo)){
            return response()->json(['message' => 'Felhasznalo nem talalhato'], 404);
        }
        $felhasznalo->delete();
        return response()->json(null,204);
    }

    
}
