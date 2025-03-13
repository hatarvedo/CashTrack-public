<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('jovedelmek', function (Blueprint $table) {
            $table->id('jovedelemID');
            $table->foreignId('felhasznaloID')->references('felhasznaloID')->on('felhasznalok');
            $table->integer('bevetelHUF');
            $table->date('bevetelDatum')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->foreignId('kategoriaID')->references('kategoriaID')->on('jovedelemKategoriak');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jovedelmek');
    }
};
