<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('port_request_ports', function (Blueprint $table) {
            $table->id();
            $table->foreignId('port_request_id')->constrained()->onDelete('cascade');
            $table->string('port');
            $table->string('protocol');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('port_request_ports');
    }
};
