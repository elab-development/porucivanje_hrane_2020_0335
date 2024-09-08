<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Delivery;
use App\Models\Location;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]);

        User::create([
            'name' => 'Store User',
            'email' => 'store@example.com',
            'password' => Hash::make('password'),
            'role' => 'store',
            'store_name' => 'My Store',
            'address' => '123 Main St',
            'opening_hours' => '9:00 - 18:00',
            'contact_number' => '123456789',
            'description' => 'Local store',
        ]);

        // Kreiranje dve lokacije
        Location::create([
            'user_id' => 1, // Admin User
            'latitude' => 45.2671,
            'longitude' => 19.8335,
        ]);

        Location::create([
            'user_id' => 2, // Store User
            'latitude' => 44.7866,
            'longitude' => 20.4489,
        ]);

         // Kreiranje dva proizvoda
         Product::create([
            'name' => 'Product 1',
            'description' => 'Description of product 1',
            'price' => 10.99,
            'store_id' => 2, // Store User
        ]);

        Product::create([
            'name' => 'Product 2',
            'description' => 'Description of product 2',
            'price' => 15.99,
            'store_id' => 2, // Store User
        ]);
        // Kreiranje dve porudžbine
        Order::create([
            'customer_id' => 1, // Admin User
            'store_id' => 2, // Store User
            'status' => 'pending',
            'total_price' => 25.99,
        ]);

        Order::create([
            'customer_id' => 1, // Admin User
            'store_id' => 2, // Store User
            'status' => 'completed',
            'total_price' => 15.99,
        ]);

        // Kreiranje dve dostave
        Delivery::create([
            'order_id' => 1, // Prva porudžbina
            'delivery_person_id' => 1, // Admin User
            'estimated_time' => '12:00:00',
            'status' => 'in_transit',
        ]);

        Delivery::create([
            'order_id' => 2, // Druga porudžbina
            'delivery_person_id' => 1, // Admin User
            'estimated_time' => '14:00:00',
            'status' => 'delivered',
        ]);
    }
}
