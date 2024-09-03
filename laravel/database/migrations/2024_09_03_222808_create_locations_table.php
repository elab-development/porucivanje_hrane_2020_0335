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
        Schema::create('locations', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id'); // ID korisnika (prodavnica, dostavljač ili kupac)
            $table->decimal('latitude', 10, 7); // Geografska širina
            $table->decimal('longitude', 10, 7); // Geografska dužina
            $table->timestamps();

            // Definisanje spoljnog ključa za 'user_id'
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Vraća migracije unazad.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('locations');
    }
};
