import Layout from '@/Layouts/Layout';
import { Head } from '@inertiajs/react';
import JobsTable from '@/Components/Tables/Jobs';

export default function Index({jobs}: {jobs: Job[]}) {
    return (
        <Layout>
            <Head title="Jobs" />
            <h1>Jobs</h1>
            <div className="table-responsive">
                <JobsTable jobs={jobs} />
            </div>
        </Layout>
    );
}
