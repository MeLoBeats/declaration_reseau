<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('port_requests', function (Blueprint $table) {
            $table->id();
            $table->string('fqdn');
            $table->ipAddress('ip_address');
            $table->boolean('exposed')->default(false);
            $table->string('vlan')->nullable();
            $table->string('description')->nullable();
            $table->string('status')->default('pending');
            $table->string('requester');
            $table->string('approver')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('port_requests');
    }
};
