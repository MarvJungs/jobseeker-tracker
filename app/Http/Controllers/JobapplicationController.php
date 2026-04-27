<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreJobApplicationRequest;
use App\Models\Jobapplication;
use App\Models\Priority;
use App\Models\Status;
use Illuminate\Http\Request;
use Illuminate\Foundation\Application;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

class JobapplicationController extends Controller
{
    public function welcome()
    {
        $canLogin = Route::has('login');
        $canRegister = Route::has('register');
        $laravelVersion = Application::VERSION;
        $phpVersion = PHP_VERSION;
        return Inertia::render('Welcome', compact('canLogin', 'canRegister', 'laravelVersion', 'phpVersion'));
    }

    public function dashboard()
    {
        $status = Status::with('jobapplications')->get()
            ->map(
                fn(Status $status) =>
                [
                    'id' => $status->id,
                    'value' => $status->jobApplications->count(),
                    'label' => $status->name
                ]
            );
        $jobs = Jobapplication::all();
        return Inertia::render('Dashboard', compact('jobs', 'status'));
    }

    public function index(Request $request)
    {
        $jobs = $request->user()->jobapplications->load('priority', 'status');
        return Inertia::render('Jobs/Index', compact('jobs'));
    }

    public function create()
    {
        $statuses = Status::all();
        $priorities = Priority::all();
        return Inertia::render('Jobs/Form', compact('statuses', 'priorities'));
    }

    public function store(StoreJobApplicationRequest $request)
    {
        Jobapplication::create($request->validated());
        return redirect(route('dashboard'));
    }

    public function edit(Jobapplication $job)
    {
        $job = $job->load(['priority', 'status']);
        $statuses = Status::all();
        $priorities = Priority::all();
        return Inertia::render('Jobs/Form', compact('job', 'statuses', 'priorities'));
    }

    public function update(StoreJobApplicationRequest $request, Jobapplication $job)
    {
        $job->update($request->validated());
        return redirect(route('dashboard'));
    }

    public function destroy(Jobapplication $job)
    {
        $job->delete();
        return redirect(route('jobs'));
    }

    public function import()
    {
        return Inertia::render('Jobs/Import');
    }

    public function addJobsFromImport(Request $request)
    {
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
                    'status_id' => Status::firstWhere(['name' => $items[2]])->get('id'),
                    'priority_id' => Priority::firstWhere(['value' => substr($items[3], 0, 1)])->get('id'),
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
            return redirect(route('dashboard'));
        }
    }
}
