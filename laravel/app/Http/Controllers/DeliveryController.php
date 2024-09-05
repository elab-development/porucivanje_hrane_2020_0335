<?php

namespace App\Http\Controllers;

use App\Models\Delivery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class DeliveryController extends Controller
{
    // Prikaz svih dostava
    public function index()
    {
        $deliveries = Delivery::all();
        return response()->json($deliveries, 200);
    }

    // Prikaz jedne dostave
    public function show($id)
    {
        $delivery = Delivery::findOrFail($id);
        return response()->json($delivery, 200);
    }

    // Kreiranje nove dostave
    public function store(Request $request)
    {
        // Validacija unetih podataka
        $validator = Validator::make($request->all(), [
            'order_id' => 'required|exists:orders,id',
            'delivery_person_id' => 'required|exists:users,id',
            'estimated_time' => 'required|date_format:Y-m-d H:i:s',
            'status' => 'required|string|in:assigned,in_transit,delivered',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Kreiranje dostave
        $delivery = Delivery::create([
            'order_id' => $request->order_id,
            'delivery_person_id' => $request->delivery_person_id,
            'estimated_time' => $request->estimated_time,
            'status' => $request->status,
        ]);

        return response()->json($delivery, 201);
    }

    // Ažuriranje postojeće dostave
    public function update(Request $request, $id)
    {
        // Pronalaženje dostave
        $delivery = Delivery::findOrFail($id);

        // Validacija podataka
        $validator = Validator::make($request->all(), [
            'order_id' => 'required|exists:orders,id',
            'delivery_person_id' => 'required|exists:users,id',
            'estimated_time' => 'required|date_format:Y-m-d H:i:s',
            'status' => 'required|string|in:assigned,in_transit,delivered',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Ažuriranje dostave
        $delivery->update($request->all());

        return response()->json($delivery, 200);
    }

    // Brisanje dostave
    public function destroy($id)
    {
        $delivery = Delivery::findOrFail($id);
        $delivery->delete();

        return response()->json(['message' => 'Delivery deleted successfully'], 200);
    }
}
