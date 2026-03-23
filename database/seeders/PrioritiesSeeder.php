<?php

namespace Database\Seeders;

use App\Models\Priority;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PrioritiesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Priority::insert(['name' => 'High', 'value' => 1]);
        Priority::insert(['name' => 'Medium', 'value' => 2]);
        Priority::insert(['name' => 'Low', 'value' => 3]);
    }
}
