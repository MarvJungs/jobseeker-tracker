import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import JobsTable from '@/Components/Tables/Jobs';

export default function Index({jobs}: {jobs: Job[]}) {
    return (
        <AuthenticatedLayout header="Dashboard">
            <Head title="Dashboard" />
            <h1>Jobs</h1>
            <div>
                <a href={route('job.create')}>Add Job</a>
            </div>
            <div className="table-responsive">
                <JobsTable jobs={jobs} />
            </div>

        </AuthenticatedLayout>
    );
}
