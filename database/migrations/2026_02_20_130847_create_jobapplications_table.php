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
        Schema::create('jobapplications', function (Blueprint $table) {
            $table->id();
            $table->string('jobtitle');
            $table->string('jobtitlelink')->nullable();
            $table->string('company');
            $table->foreignId('status_id')->constrained();
            $table->foreignId('priority_id')->constrained();
            $table->date('date_applied');
            $table->date('last_contact');
            $table->boolean('has_interviewed');
            $table->boolean('has_referal');
            $table->string('main_contact_name')->nullable();
            $table->string('main_contact_email')->nullable();
            $table->string('main_contact_phone')->nullable();
            $table->string('location');
            $table->string('salary_range')->nullable();
            $table->string('heard_about')->nullable();
            $table->decimal('rating')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jobapplications');
    }
};
