<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use App\Http\Resources\UserResource;

class StoreController extends Controller
{
    // Prikaz svih prodavnica
    public function index()
    {
        $stores = User::where('role', 'store')->get();
        return $stores;
    }

    // Prikaz jedne prodavnice
    public function show($id)
    {
        $store = User::where('role', 'store')->findOrFail($id);
        return  $store;
    }

    // Kreiranje nove prodavnice
    public function store(Request $request)
    {
        // Validacija unetih podataka
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'store_name' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'opening_hours' => 'required|string|max:255',
            'description' => 'nullable|string',
            'contact_number' => 'required|string|max:15',
            'logo_url' => 'nullable|url',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Kreiranje korisnika sa ulogom prodavnica
        $store = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'store', // Postavljanje uloge kao 'store'
            'store_name' => $request->store_name,
            'address' => $request->address,
            'opening_hours' => $request->opening_hours,
            'description' => $request->description,
            'contact_number' => $request->contact_number,
            'logo_url' => $request->logo_url,
        ]);

        return  $store;
    }

    // Ažuriranje podataka prodavnice
    public function update(Request $request, $id)
    {
        // Pronalaženje prodavnice
        $store = User::where('role', 'store')->findOrFail($id);

        // Validacija podataka
        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|string|email|max:255|unique:users,email,' . $store->id,
            'password' => 'sometimes|string|min:8|confirmed',
            'store_name' => 'sometimes|string|max:255',
            'address' => 'sometimes|string|max:255',
            'opening_hours' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'contact_number' => 'sometimes|string|max:15',
            'logo_url' => 'nullable|url',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Ažuriranje podataka prodavnice
        $store->update($request->except('password'));

        if ($request->has('password')) {
            $store->password = Hash::make($request->password);
            $store->save();
        }

        return  $store;
    }

    // Brisanje prodavnice
    public function destroy($id)
    {
        $store = User::where('role', 'store')->findOrFail($id);
        $store->delete();

        return response()->json(['message' => 'Store deleted successfully'], 200);
    }
}
