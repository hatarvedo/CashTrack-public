<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('felhasznalok', function (Blueprint $table) {
            $table->id('felhasznaloID');
            $table->string('vezeteknev');
            $table->string('keresztnev');
            $table->string('email');
            $table->string('jelszo');
            $table->string('profilkepUrl')->default("https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('felhasznalok');
    }
};
