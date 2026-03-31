import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import Layout from '@/Layouts/Layout';
import { Form, useForm, usePage } from "@inertiajs/react";

export default function JobForm({ job, priorities, statuses }: { job?: Job, priorities: JobPriority[], statuses: JobStatus[] }) {
    const { data, setData } = useForm<ApplicationForm>({
        jobtitle: job?.jobtitle ?? '',
        jobtitlelink: job?.jobtitlelink ?? '',
        company: job?.company ?? '',
        status: job?.status,
        priority: job?.priority,
        date_applied: job?.date_applied ?? '',
        last_contact: job?.last_contact ?? '',
        has_interviewed: job?.has_interviewed ?? false,
        has_referal: job?.has_referal ?? false,
        main_contact_name: job?.main_contact_name ?? '',
        main_contact_email: job?.main_contact_email ?? '',
        main_contact_phone: job?.main_contact_phone ?? '',
        location: job?.location ?? '',
        salary_range: job?.salary_range ?? '',
        heard_about: job?.heard_about ?? '',
        rating: job?.rating ?? 0,
        notes: job?.notes ?? ''
    });

    const { errors } = usePage().props;

    return (
        <Layout>
            <h1>{job === undefined ? "Create" : "Edit"} Job</h1>
            <Form method="post">
                <div className="row mb-3">
                    <div className="col">
                        <InputLabel htmlFor="jobtitle" className="form-label" value="Jobtitle" />
                        <TextInput type="text" className={"form-control " + (errors.jobtitle && "is-invalid")} name="jobtitle" onChange={(e => setData('jobtitle', e.target.value))} value={data.jobtitle} />
                        {errors.jobtitle && <InputError message={errors.jobtitle} />}
                    </div>
                    <div className="col">
                        <InputLabel htmlFor="jobtitlelink" className="form-label" value="Link to Job" />
                        <TextInput type="url" className={"form-control " + (errors.jobtitlelink && "is-invalid")} name="jobtitlelink" onChange={(e) => setData("jobtitlelink", e.target.value)} value={data.jobtitlelink} />
                        {errors.jobtitlelink && <InputError message={errors.jobtitlelink} />}
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col">
                        <InputLabel htmlFor="company" className="form-label" value="Company" />
                        <TextInput type="text" className={"form-control " + (errors.company && "is-invalid")} name="company" onChange={(e) => setData("company", e.target.value)} value={data.company} />
                        {errors.company && <InputError message={errors.company} />}
                    </div>
                    <div className="col">
                        <InputLabel htmlFor="location" className="form-label" value="Location" />
                        <TextInput type="text" className={"form-control " + (errors.location && "is-invalid")} name="location" onChange={(e) => setData("location", e.target.value)} value={data.location} />
                        {errors.location && <InputError message={errors.location} />}
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col">
                        <InputLabel htmlFor="status" className="form-label" value="Status" />
                        <SelectInput<JobStatus> options={statuses} className={errors.status && "is-invalid"} value={data.status} onChange={(status) => setData("status", status)} getOptionValue={(status) => status.id} getOptionLabel={(status) => status.name} name="status" />
                        {errors.status && <InputError message={errors.status} />}
                    </div>
                    <div className="col">
                        <InputLabel htmlFor="priority" className="form-label" value="Priority" />
                        <SelectInput<JobPriority> options={priorities} className={errors.priority && "is-invalid"} value={data.priority} onChange={(priority) => setData("priority", priority)} getOptionValue={(priority) => priority.id} getOptionLabel={(priority) => `${priority.value} - ${priority.name}`} name="priority" />
                        {errors.priority && <InputError message={errors.priority} />}
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col">
                        <InputLabel htmlFor="date_applied" className="form-label" value="Date Applied At" />
                        <TextInput type="date" className={"form-control " + (errors.date_applied && "is-invalid")} name="date_applied" onChange={(e) => setData("date_applied", e.target.value)} value={data.date_applied} />
                        {errors.date_applied && <InputError message={errors.date_applied} />}
                    </div>
                    <div className="col">
                        <InputLabel htmlFor="last_contact" className="form-label" value="Last Contact At" />
                        <TextInput type="date" className={"form-control " + (errors.last_applied && "is-invalid")} name="last_contact" onChange={(e) => setData("last_contact", e.target.value)} value={data.last_contact} />
                        {errors.last_contact && <InputError message={errors.last_contact} />}
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col">
                        <div className="form-check">
                            <Checkbox name="has_interviewed" className="form-check-input" value={0} checked hidden />
                            <Checkbox name="has_interviewed" className={"form-check-input " + (errors.has_interviewed && "is-invalid")} value={1} onChange={(e) => setData("has_interviewed", e.target.checked)} />
                            <InputLabel htmlFor="has_interviewed" className="form-check-label" value="Has Interviewed?" />
                            {errors.has_interviewed && <InputError message={errors.has_interviewed} />}
                        </div>
                        <div className="form-check">
                            <Checkbox name="has_referal" className="form-check-input" value={0} checked hidden />
                            <Checkbox name="has_referal" className={"form-check-input " + (errors.has_referal && "is-invalid")} value={1} onChange={(e) => setData("has_referal", e.target.checked)} />
                            <InputLabel htmlFor="has_referal" className="form-check-label" value="Has Referal?" />
                            {errors.has_referal && <InputError message={errors.has_referal} />}
                        </div>
                    </div>
                    <div className="col">
                        <InputLabel htmlFor="main_contact_name" className="form-label" value="Main Contact Name" />
                        <TextInput type="text" className={"form-control " + (errors.main_contact_name && "is-invalid")} name="main_contact_name" onChange={(e) => setData("main_contact_name", e.target.value)} value={data.main_contact_name} />
                        {errors.main_contact_name && <InputError message={errors.main_contact_name} />}
                    </div>
                    <div className="col">
                        <InputLabel htmlFor="main_contact_email" className="form-label" value="Main Contact Email" />
                        <TextInput type="email" className={"form-control " + (errors.main_contact_name && "is-invalid")}  name="main_contact_email" onChange={(e) => setData("main_contact_email", e.target.value)} value={data.main_contact_email} />
                        {errors.main_contact_email && <InputError message={errors.main_contact_email} />}
                    </div>
                    <div className="col">
                        <InputLabel htmlFor="main_contact_phone" className="form-label" value="Main Contact Phone" />
                        <TextInput type="tel" className={"form-control " + (errors.main_contact_phone && "is-invalid")} name="main_contact_phone" onChange={(e) => setData("main_contact_phone", e.target.value)} value={data.main_contact_phone} />
                        {errors.main_contact_phone && <InputError message={errors.main_contact_phone} />}
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col">
                        <InputLabel htmlFor="salary_range" className="form-label" value="Salary Range" />
                        <TextInput type="text" className={"form-control " + (errors.salary_range && "is-invalid")} name="salary_range" onChange={(e) => setData("salary_range", e.target.value)} value={data.salary_range} />
                        {errors.salary_range && <InputError message={errors.salary_range} />}
                    </div>
                    <div className="col">
                        <InputLabel htmlFor="heard_about" className="form-label" value="How Did I Hear About This Position?" />
                        <TextInput type="text" className={"form-control " + (errors.heard_about && "is-invalid")} name="heard_about" onChange={(e) => setData("heard_about", e.target.value)} value={data.heard_about} />
                        {errors.heard_about && <InputError message={errors.heard_about} />}
                    </div>
                    <div className="col">
                        <InputLabel htmlFor="rating" className="form-label" value="Rating" />
                        <TextInput type="number" min={0} max={5} className={"form-control " + (errors.rating && "is-invalid")} name="rating" onChange={(e) => setData("rating", Number.parseInt(e.target.value))} value={data.rating} />
                        {errors.rating && <InputError message={errors.rating} />}
                    </div>
                    <div className="row mb-3">
                        <div className="col">
                            <InputLabel htmlFor="notes" className="form-label" value="Notes" />
                            <textarea className={"form-control " + (errors.notes && "is-invalid")} rows={5} name="notes" onChange={(e) => setData("notes", e.target.value)}>
                                {data.notes}
                            </textarea>
                            {errors.notes && <InputError message={errors.notes} />}
                        </div>
                    </div>
                </div>
                <button className="btn btn-primary" type="submit">Submit</button>
            </Form>
        </Layout>
    )
}