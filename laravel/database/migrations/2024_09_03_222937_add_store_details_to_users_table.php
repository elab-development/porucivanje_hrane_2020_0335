<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            // Dodavanje novih kolona za uloge korisnika i prodavnice
        
            $table->string('store_name')->nullable(); // Naziv prodavnice
            $table->string('address')->nullable(); // Adresa prodavnice
            $table->string('opening_hours')->nullable(); // Radno vreme
            $table->text('description')->nullable(); // Opis prodavnice
            $table->string('contact_number')->nullable(); // Kontakt broj prodavnice
            $table->string('logo_url')->nullable(); // URL logoa prodavnice
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            // Uklanjanje kolona prilikom rollback-a
           
            $table->dropColumn('store_name');
            $table->dropColumn('address');
            $table->dropColumn('opening_hours');
            $table->dropColumn('description');
            $table->dropColumn('contact_number');
            $table->dropColumn('logo_url');
        });
    }
};
