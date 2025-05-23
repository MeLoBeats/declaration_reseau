<?php

namespace Database\Factories;

use App\Models\PortRequest;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PortRequestPort>
 */
class PortRequestPortFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'port' => $this->faker->randomElement(['80', '443', '22', '8080']),
            'protocol' => $this->faker->randomElement(['TCP', 'UDP']),
        ];
    }
}
