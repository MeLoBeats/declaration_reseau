<?php

namespace Database\Factories;

use App\PortRequestStatus;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PortRequest>
 */
class PortRequestFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'fqdn' => $this->faker->domainName(),
            'ip_address' => $this->faker->ipv4(),
            'exposed' => $this->faker->boolean(),
            'vlan' => $this->faker->optional()->numerify('VLAN-###'),
            'description' => $this->faker->optional()->sentence(),
            'status' => PortRequestStatus::Pending,
            'requester' => $this->faker->userName(),
            'approver' => $this->faker->optional()->userName(),
        ];
    }
}
