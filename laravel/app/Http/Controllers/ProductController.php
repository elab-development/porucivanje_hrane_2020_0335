<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class ProductController extends Controller
{
    // Prikaz svih proizvoda
    public function index()
    {
        $products = Product::all();
        return response()->json($products, 200);
    }
    // Prikaz svih proizvoda bez paginacije (ako je potrebno)
    public function allProducts()
    {
        $products = Product::all();
        return response()->json($products, 200);
    }
    // Prikaz jednog proizvoda
    public function show($id)
    {
        $product = Product::findOrFail($id);
        return response()->json($product, 200);
    }

    // Kreiranje novog proizvoda
    public function store(Request $request)
    {
        // Validacija unetih podataka
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Kreiranje proizvoda
        $product = Product::create([
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'store_id' => Auth::id(), // Koristi ID ulogovanog korisnika
        ]);

        return response()->json($product, 201);
    }

    // Ažuriranje postojećeg proizvoda
    public function update(Request $request, $id)
    {
        // Pronalaženje proizvoda
        $product = Product::findOrFail($id);

        // Validacija podataka
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Ažuriranje podataka o proizvodu
        $product->update($request->all());

        return response()->json($product, 200);
    }

    // Brisanje proizvoda
    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();

        return response()->json(['message' => 'Product deleted successfully'], 200);
    }
}
