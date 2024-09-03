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
        Schema::create('deliveries', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('order_id'); // ID porudžbine
            $table->unsignedBigInteger('delivery_person_id'); // ID dostavljača
            $table->time('estimated_time'); // Procenjeno vreme dostave
            $table->string('status'); // Status dostave (npr. 'assigned', 'in_transit', 'delivered')
            $table->timestamps();

            // Definisanje spoljnog ključa za 'order_id'
            $table->foreign('order_id')->references('id')->on('orders')->onDelete('cascade');
            // Definisanje spoljnog ključa za 'delivery_person_id'
            $table->foreign('delivery_person_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Vraća migracije unazad.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('deliveries');
    }
};
