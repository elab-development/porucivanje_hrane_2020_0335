<?php

namespace App\Http\Controllers;

use App\Models\Delivery;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class OrderController extends Controller
{
    // Kreiranje nove porudžbine i dostave u jednoj transakciji
    public function store(Request $request)
    {
        // Validacija unetih podataka
        $validator = Validator::make($request->all(), [
            'store_id' => 'required|exists:users,id',
            'products' => 'required|array',
            'products.*.product_id' => 'required|exists:products,id',
            'products.*.quantity' => 'required|integer|min:1',
            'estimated_time' => 'required|date_format:Y-m-d H:i:s',
            'total_price' => 'required|numeric|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Početak transakcije
        DB::beginTransaction();

        try {
            // Kreiranje nove porudžbine
            $order = Order::create([
                'customer_id' => Auth::id(), // Ulogovani korisnik kao kupac
                'store_id' => $request->store_id,
                'status' => 'pending',
                'total_price' => $request->total_price,
            ]);

            // Dodavanje proizvoda u pivot tabelu
            foreach ($request->products as $product) {
                DB::table('order_product')->insert([
                    'order_id' => $order->id,
                    'product_id' => $product['product_id'],
                    'quantity' => $product['quantity'],
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }

            // Kreiranje povezane dostave, dostavljač uvek ID 1
            Delivery::create([
                'order_id' => $order->id,
                'delivery_person_id' => 1, // Automatski postavljen ID dostavljača
                'estimated_time' => $request->estimated_time,
                'status' => 'assigned',
            ]);

            // Zatvaranje transakcije
            DB::commit();

            return response()->json(['message' => 'Order and delivery created successfully'], 201);

        } catch (\Exception $e) {
            // Vraćanje transakcije unazad u slučaju greške
            DB::rollBack();
            return response()->json(['error' => 'Failed to create order and delivery'], 500);
        }
    }
}
