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
        Schema::table('products', function (Blueprint $table) {
            // Dodavanje spoljnog ključa za 'store_id'
            $table->foreign('store_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Vraća migracije unazad.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropForeign(['store_id']); // Uklanjanje spoljnog ključa
        });
    }
};
