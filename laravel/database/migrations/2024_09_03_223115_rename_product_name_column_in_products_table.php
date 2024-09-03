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
            $table->renameColumn('product_name', 'name'); // Preimenovanje kolone 'product_name' u 'name'
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
            $table->renameColumn('name', 'product_name'); // Vraćanje starog imena
        });
    }
};
