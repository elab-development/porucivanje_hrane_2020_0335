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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('product_name'); // Pogrešno imenovana kolona, umesto 'name'
            $table->text('description');
            $table->decimal('price', 8, 2);
            $table->unsignedBigInteger('store_id'); // ID prodavnice, ali bez spoljnog ključa
            $table->string('napomena')->nullable(); // Kolona napomena
            $table->timestamps();
        });
    }

    /**
     * Vraća migracije unazad.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
};
