<?php

namespace Database\Seeders;

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
        // Kreiranje Admin korisnika
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]);

        // Kreiranje Store korisnika
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

        // Kreiranje običnog User-a (regularan korisnik)
        User::create([
            'name' => 'Regular User',
            'email' => 'user@example.com',
            'password' => Hash::make('password'),
            'role' => 'user', // Ova vrednost ukazuje da nije admin ni store
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

        // Kreiranje pet proizvoda (vrste hrane)
        Product::create([
            'name' => 'Pizza',
            'description' => 'Delicious cheese pizza with tomato sauce',
            'price' => 8.99,
            'store_id' => 2, // Store User
        ]);

        Product::create([
            'name' => 'Hamburger',
            'description' => 'Classic beef hamburger with lettuce and tomato',
            'price' => 5.99,
            'store_id' => 2, // Store User
        ]);

        Product::create([
            'name' => 'Sushi',
            'description' => 'Fresh sushi with salmon and avocado',
            'price' => 12.99,
            'store_id' => 2, // Store User
        ]);

        Product::create([
            'name' => 'Pasta',
            'description' => 'Pasta with creamy Alfredo sauce',
            'price' => 9.99,
            'store_id' => 2, // Store User
        ]);

        Product::create([
            'name' => 'Caesar Salad',
            'description' => 'Fresh Caesar salad with croutons and parmesan cheese',
            'price' => 6.99,
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
