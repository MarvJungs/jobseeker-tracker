import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';

type JobStatusPieData = {
    id: number,
    value: number,
    label: string
}


export default function Dashboard({status, jobs}: {status: JobStatusPieData[], jobs: Job[]}) {
    const lineChartData = [...jobs]
        .sort((a, b) => new Date(a.date_applied).getTime() - new Date(b.date_applied).getTime())
        .map((job, index) => ({
            date: new Date(job.date_applied),
            applications: index + 1
        }));
        
    return (
        <AuthenticatedLayout header="Dashboard">
            <Head title="Dashboard" />
            <h1>Dashboard</h1>
            <div className='row'>
                <div className='col'>
                    <h2>Job Applications By Status</h2>
                    <PieChart 
                        series={[
                            {
                                data: status
                            },
                        ]}
                        width={200}
                        height={200}
                        />
                </div>

                <div className='col'>
                    <h2>Sent Job Applications Over Time</h2>
                    <LineChart
                        xAxis={[{dataKey: 'date', scaleType: 'time'},]}
                        yAxis={[{width: 50}]}
                        dataset={lineChartData}
                        series={[{dataKey: 'applications', label: 'Applications'}]}
                        height={300}
                        />
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
