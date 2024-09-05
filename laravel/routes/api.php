<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\StoreController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/





Route::get('/products', [ProductController::class, 'index']); // Prikaz svih proizvoda
Route::get('/products/{id}', [ProductController::class, 'show']); // Prikaz jednog proizvoda
Route::post('/products', [ProductController::class, 'store'])->middleware('auth:sanctum'); // Kreiranje novog proizvoda
Route::put('/products/{id}', [ProductController::class, 'update'])->middleware('auth:sanctum'); // Ažuriranje proizvoda
Route::delete('/products/{id}', [ProductController::class, 'destroy'])->middleware('auth:sanctum'); // Brisanje proizvoda

Route::get('/stores', [StoreController::class, 'index']); // Prikaz svih prodavnica
Route::get('/stores/{id}', [StoreController::class, 'show']); // Prikaz jedne prodavnice
Route::post('/stores', [StoreController::class, 'store']); // Kreiranje nove prodavnice
Route::put('/stores/{id}', [StoreController::class, 'update']); // Ažuriranje prodavnice
Route::delete('/stores/{id}', [StoreController::class, 'destroy']); // Brisanje prodavnice

// Rute za autentifikaciju korisnika
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
