<?php

use App\Http\Controllers\ProfileController;
use App\Http\Requests\StoreJobApplicationRequest;
use App\Models\Jobapplication;
use App\Models\Priority;
use App\Models\Status;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    $status = Status::with('jobapplications')->get()
        ->map(function (Status $status) {
            return [
                'id' => $status->id,
                'value' => $status->jobApplications->count(),
                'label' => $status->name
            ];
        });
    $jobs = Jobapplication::all();
    return Inertia::render('Dashboard', ['status' => $status, 'jobs' => $jobs]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/jobs', function () {
    return Inertia::render('Jobs/Index', ['jobs' => Jobapplication::with(['priority', 'status'])->get()]);
})->middleware(['auth', 'verified'])->name('jobs');

Route::get('/jobs/create', function () {
    return Inertia::render('Jobs/Form', ['statuses' => Status::all(), 'priorities' => Priority::all()]);
})->middleware(['auth', 'verified'])->name('job.create');

Route::get('jobs/{job}/edit', function (Jobapplication $job) {
    return Inertia::render('Jobs/Form', [
        'job' => $job->load(['priority', 'status']),
        'statuses' => Status::all(),
        'priorities' => Priority::all()
        ]
    );
})->middleware(['auth', 'verified'])->name('job.edit');

Route::get('/jobs/import', function () {
    return Inertia::render('Jobs/Import');
})->middleware(['auth', 'verified']);

Route::post('/jobs/import', function (Request $request) {
    $file = $request->file('file')[0];
    $handle = fopen($file->getRealPath(), 'r');
    if ($handle) {
        $skip = true;
        while (($line = fgets($handle)) !== false) {
            if ($skip) {
                $skip = false;
                continue;
            }
            $items = explode(',', $line);
            $payload = [
                'jobtitle' => $items[0],
                'jobtitlelink' => null,
                'company' => $items[1],
                'status_id' => Status::where(['name' => $items[2]])->get()->pluck('id')->first(),
                'priority_id' => Priority::where(['value' => substr($items[3], 0, 1)])->get()->pluck('id')->first(),
                'date_applied' => $items[4],
                'last_contact' => $items[5],
                'has_interviewed' => $items[7] == 'Yes' ? true : false,
                'has_referal' => $items[8] == 'Yes' ? true : false,
                'main_contact_name' => strlen($items[9]) > 0 ? $items[9] : null,
                'main_contact_email' => strlen($items[10]) > 0 ? $items[10] : null,
                'main_contact_phone' => null,
                'location' => $items[11],
                'salary_range' => strlen($items[12]) > 0 ? $items[12] : null,
                'heard_about' => strlen($items[13]) > 0 ? $items[13] : null,
                'rating' => strlen($items[14]) > 0 ? (int) $items[14] : null,
                'notes' => strlen($items[15]) > 0 ? $items[15] : null

            ];
            Jobapplication::create($payload);
        }
        return response(['code' => 200, 'message' => 'Jobs have been imported']);
    }
});

Route::post('/jobs/create', function (StoreJobApplicationRequest $request) {
    $job = Jobapplication::create($request->validated());
    return redirect(route('dashboard'));
});

Route::post('/jobs/{job}/edit', function (StoreJobApplicationRequest $request, Jobapplication $job) {
    $job->update($request->validated());
    return redirect(route('dashboard'));
})->name('job.update');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
