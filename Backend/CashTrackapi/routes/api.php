<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FelhasznaloController;
use App\Http\Controllers\JovedelemController;
use App\Http\Controllers\JovedelemKategoriaController;
use App\Http\Controllers\KiadasController;
use App\Http\Controllers\KiadasKategoria;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

//Felhasználó Route-ok
Route::get('/felhasznalok',[FelhasznaloController::class,'index']);
Route::get('/felhasznalok/{felhasznaloID}', [FelhasznaloController::class, 'getFelhasznaloById']);
Route::get('/felhasznalok/email/{email}', [FelhasznaloController::class, 'getFelhasznaloByEmail']);
Route::post('/felhasznalok',[FelhasznaloController::class, 'addFelhasznalo']);
Route::put('/felhasznalok/{felhasznaloID}', [FelhasznaloController::class, 'updateFelhasznalo']);
Route::delete('/felhasznalok/{felhasznaloID}', [FelhasznaloController::class, 'deleteFelhasznalo']);

//LOGIN Auth




//Jövedelem Route-ok
Route::get('/jovedelmek/felhasznalo/{felhasznaloID}',[JovedelemController::class,'showByUser']);
Route::post('/jovedelmek',[JovedelemController::class,'store']);
Route::get('/jovedelmek/{jovedelemID}',[JovedelemController::class, 'show']);
Route::delete('/jovedelmek/{jovedelemID}',[JovedelemController::class,'destroy']);


//Kiadás Kategóriák Route-ok
Route::get('/kiadaskategoriak',[KiadasKategoria::class,'index']);


//Jövedelem Kategóriák Route-ok
Route::get('/jovedelemkategoriak',[JovedelemKategoriaController::class,'index']);



//Kiadások Route-ok
Route::get('/kiadasok',[KiadasController::class,'index']);
Route::post('/kiadasok',[KiadasController::class,'store']);
Route::get('/kiadasok/{kiadasID}',[KiadasController::class, 'show']);
Route::get('/kiadasok/felhasznalo/{felhasznaloID}',[KiadasController::class,'showByUser']);
Route::put('/kiadasok/{kiadasID}',[KiadasController::class,'update']);
Route::delete('/kiadasok/{kiadasID}',[KiadasController::class,'destroy']);




