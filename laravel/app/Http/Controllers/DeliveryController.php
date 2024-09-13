<?php

namespace App\Http\Controllers;

use App\Models\Delivery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class DeliveryController extends Controller
{
 // Prikaz svih dostava
 public function index()
 {
     // Get the logged-in user
     $user = Auth::user();
 
     // Fetch deliveries where the user is the customer in the related order
     $deliveries = DB::table('deliveries')
         ->join('orders', 'deliveries.order_id', '=', 'orders.id')
         ->join('users as delivery_person', 'deliveries.delivery_person_id', '=', 'delivery_person.id')
         ->join('users as store', 'orders.store_id', '=', 'store.id')  
         ->where('orders.customer_id', $user->id)
         ->select(
             'deliveries.id as delivery_id',
             'orders.id as order_id',
             'orders.total_price',
             'store.name as store_name',  
             'delivery_person.name as delivery_person_name',  
             'deliveries.estimated_time',
             'deliveries.status'
         )
         ->get();
 
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
