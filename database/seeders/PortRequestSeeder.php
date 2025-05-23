<?php

namespace Database\Seeders;

use App\Models\PortRequest;
use App\Models\PortRequestPort;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PortRequestSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $portRequests = PortRequest::factory()->count(50)->create();

        foreach ($portRequests as $portRequest) {
            $ports = PortRequestPort::factory()
                ->count(rand(1, 5))
                ->make()
                ->each(function ($port) use ($portRequest) {
                    $port->port_request_id = $portRequest->id;
                });

            $portRequest->ports()->saveMany($ports);
        }
    }
}
