<?php

namespace Database\Seeders;

use App\Models\Status;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StatusesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Status::insert(['name' => 'To Apply']);
        Status::insert(['name' => 'Applied']);
        Status::insert(['name' => 'In Progress']);
        Status::insert(['name' => 'No Go']);
        Status::insert(['name' => 'To Consider']);
        Status::insert(['name' => 'Refer a Friend']);
        Status::insert(['name' => 'Rejected']);
        Status::insert(['name' => 'Ghosted']);
        Status::insert(['name' => 'Recruiter Interview']);
        Status::insert(['name' => 'First Interview']);
        Status::insert(['name' => 'Second Interview']);
        Status::insert(['name' => 'Third Interview']);
        Status::insert(['name' => 'Take Home Challenge']);
        Status::insert(['name' => 'Final Interview']);
        Status::insert(['name' => 'Offer Accepted']);
        Status::insert(['name' => 'Offer Declined']);
    }
}
