import { Link } from "@inertiajs/react";

export default function JobsTable({jobs}: {jobs: Job[]}) {
    return (
        <table className='table table-bordered table-hover text-nowrap'>
            <thead>
                <tr>
                    <th>Job Title</th>
                    <th>Company</th>
                    <th>Status</th>
                    <th>Priority</th>
                    <th>Date Applied</th>
                    <th>Last Content</th>
                    <th>Days Since Last Contact</th>
                    <th>Interviewed?</th>
                    <th>Referral?</th>
                    <th>Main Contact Person</th>
                    <th>Main Contact Email</th>
                    <th>Main Contact Phonenumber</th>
                    <th>Location</th>
                    <th>Salary Range</th>
                    <th>How did I hear about the role?</th>
                    <th>Rating</th>
                    <th>Notes</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {jobs.map((job) => (
                    <tr key={job.id}>
                        <td><a href={job.jobtitlelink} target="_blank">{job.jobtitle}</a></td>
                        <td>{job.company}</td>
                        <td>{job.status.name}</td>
                        <td>{job.priority.value} - {job.priority.name}</td>
                        <td>{job.date_applied}</td>
                        <td>{job.last_contact}</td>
                        <td>{Math.floor((Date.now() - new Date(job.last_contact).getTime()) / (1000 * 60 * 60 * 24))}</td>
                        <td>{job.has_interviewed}</td>
                        <td>{job.has_referal}</td>
                        <td>{job.main_contact_name}</td>
                        <td>{job.main_contact_email}</td>
                        <td>{job.main_contact_phone}</td>
                        <td>{job.location}</td>
                        <td>{job.salary_range}</td>
                        <td>{job.heard_about}</td>
                        <td>{job.rating}</td>
                        <td>{job.notes}</td>
                        <td className="d-flex gap-2">
                            <Link href={route('job.edit', {job: job})} as={'button'} className="btn btn-secondary">Edit</Link>
                            <Link href={route('job.destroy', {job: job})} method="delete" as={'button'} className="btn btn-danger">Delete</Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}