<?php

namespace App\Http\Controllers;

use App\Models\Location;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class LocationController extends Controller
{
    // Prikaz svih lokacija
    public function index()
    {
        $locations = Location::all();
        return response()->json($locations, 200);
    }

    // Prikaz jedne lokacije
    public function show($id)
    {
        $location = Location::findOrFail($id);
        return response()->json($location, 200);
    }

    // Kreiranje nove lokacije
    public function store(Request $request)
    {
        // Validacija unetih podataka
        $validator = Validator::make($request->all(), [
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Kreiranje lokacije
        $location = Location::create([
            'latitude' => $request->latitude,
            'longitude' => $request->longitude,
            'user_id' => Auth::id(), // Koristi ID ulogovanog korisnika
        ]);

        return response()->json($location, 201);
    }

    // Ažuriranje postojeće lokacije
    public function update(Request $request, $id)
    {
        // Pronalaženje lokacije
        $location = Location::findOrFail($id);

        // Validacija podataka
        $validator = Validator::make($request->all(), [
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Ažuriranje lokacije
        $location->update($request->all());

        return response()->json($location, 200);
    }

    // Brisanje lokacije
    public function destroy($id)
    {
        $location = Location::findOrFail($id);
        $location->delete();

        return response()->json(['message' => 'Location deleted successfully'], 200);
    }
}
