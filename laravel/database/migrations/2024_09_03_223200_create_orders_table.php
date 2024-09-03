<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Pokreće migracije.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('customer_id'); // ID kupca
            $table->unsignedBigInteger('store_id'); // ID prodavnice
            $table->string('status'); // Status porudžbine (npr. 'pending', 'accepted', 'in_delivery', 'completed')
            $table->decimal('total_price', 8, 2); // Ukupna cena porudžbine
            $table->timestamps();

            // Definisanje spoljnog ključa za 'customer_id'
            $table->foreign('customer_id')->references('id')->on('users')->onDelete('cascade');
            // Definisanje spoljnog ključa za 'store_id'
            $table->foreign('store_id')->references('id')->on('users')->onDelete('cascade');
        });

        // Kreiranje pivot tabele za mnogostruku relaciju između 'orders' i 'products'
        Schema::create('order_product', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('order_id');
            $table->unsignedBigInteger('product_id');
            $table->integer('quantity'); // Količina proizvoda u porudžbini
            $table->timestamps();

            // Definisanje spoljnog ključa za 'order_id'
            $table->foreign('order_id')->references('id')->on('orders')->onDelete('cascade');
            // Definisanje spoljnog ključa za 'product_id'
            $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
        });
    }

    /**
     * Vraća migracije unazad.
     *
     * @return void
     */
    public function down()
    {
        // Brisanje pivot tabele pre brisanja tabele 'orders'
        Schema::dropIfExists('order_product');
        Schema::dropIfExists('orders');
    }
};
