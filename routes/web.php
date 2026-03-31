<?php

use App\Http\Controllers\JobapplicationController;
use App\Http\Controllers\ProfileController;
use App\Models\Jobapplication;
use Illuminate\Support\Facades\Route;

Route::get('/', [JobapplicationController::class, 'welcome']);
Route::middleware('auth')->group(
    function () {
        Route::middleware('verified')->group(
            function () {
                Route::get('/dashboard', [JobapplicationController::class, 'dashboard'])->name('dashboard');
                Route::get('/jobs', [JobapplicationController::class, 'index'])->name('jobs');
                Route::get('/jobs/create', [JobapplicationController::class, 'create'])->name('job.create');
                Route::get('/jobs/{job}/edit', [Jobapplication::class, 'edit'])->name('job.edit');
                Route::get('/jobs/import', [JobapplicationController::class, 'import'])->name('jobs.import');
                Route::post('/jobs/import', [JobapplicationController::class, 'addJobsFromImport'])->name('jobs.addFromImport');
                Route::post('/jobs/create', [JobapplicationController::class, 'store'])->name('job-store');
                Route::post('/jobs/{job}/edit', [JobapplicationController::class, 'update'])->name('job.update');
            }
        );
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    }
);

require __DIR__ . '/auth.php';
