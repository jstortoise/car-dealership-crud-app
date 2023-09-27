<?php

namespace Tests\Feature;

use App\Models\Manufacturer;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class CarTest extends TestCase
{
    use DatabaseTransactions;
    /**
     * A basic feature test example.
     */
    public function test_success_car_list(): void
    {
        $response = $this->get('/api/cars');

        $response->assertStatus(200);
    }

    public function test_success_store_car(): void
    {
        $manufacturer = Manufacturer::factory()->create();

        $response = $this->post('/api/cars', [
            'name' => 'Test Car',
            'description' => 'This is the test description.',
            'manufacturer_id' => $manufacturer->id,
        ]);

        $response->assertStatus(201);
    }

    public function test_fail_store_car(): void
    {
        $response = $this->post('/api/cars', [
            'name' => 'Test Car',
            'description' => 'This is the test description.',
        ]);

        $response->assertInvalid();
    }
}
