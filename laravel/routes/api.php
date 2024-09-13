<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DeliveryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\StoreController;
use App\Http\Controllers\LocationController;
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


Route::get('/deliveries/{id}', [DeliveryController::class, 'show']); // Prikaz jedne dostave

// Zaštita PUT, POST, DELETE ruta middleware-om auth:sanctum
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/deliveries', [DeliveryController::class, 'index']); // Prikaz svih dostava ulogovanog korisnika
    Route::post('/deliveries', [DeliveryController::class, 'store']); // Kreiranje nove dostave
    Route::put('/deliveries/{id}', [DeliveryController::class, 'update']); // Ažuriranje dostave
    Route::delete('/deliveries/{id}', [DeliveryController::class, 'destroy']); // Brisanje dostave

    Route::post('/locations', [LocationController::class, 'store']); // Kreiranje nove lokacije
    Route::put('/locations/{id}', [LocationController::class, 'update']); // Ažuriranje lokacije
    Route::delete('/locations/{id}', [LocationController::class, 'destroy']); // Brisanje lokacije

    Route::post('/products', [ProductController::class, 'store']); // Kreiranje novog proizvoda
    Route::put('/products/{id}', [ProductController::class, 'update']); // Ažuriranje proizvoda
    Route::delete('/products/{id}', [ProductController::class, 'destroy']); // Brisanje proizvoda

    Route::post('/stores', [StoreController::class, 'store']); // Kreiranje nove prodavnice
    Route::put('/stores/{id}', [StoreController::class, 'update']); // Ažuriranje prodavnice
    Route::delete('/stores/{id}', [StoreController::class, 'destroy']); // Brisanje prodavnice

    Route::post('/logout', [AuthController::class, 'logout']); // Odjava korisnika

    Route::get('/products', [ProductController::class, 'index']); // Prikaz svih proizvoda ulogovane prodavnice
});

// Rute za pretragu i prikaz bez zaštite
Route::get('/locations', [LocationController::class, 'index']); // Prikaz svih lokacija
Route::get('/locations/{id}', [LocationController::class, 'show']); // Prikaz jedne lokacije
Route::get('/products/all', [ProductController::class, 'allProducts']); // Ruta za sve proizvode bez paginacije

Route::get('/products/{id}', [ProductController::class, 'show']); // Prikaz jednog proizvoda
Route::get('/stores', [StoreController::class, 'index']); // Prikaz svih prodavnica
Route::get('/stores/{id}', [StoreController::class, 'show']); // Prikaz jedne prodavnice

// Rute za autentifikaciju korisnika
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
