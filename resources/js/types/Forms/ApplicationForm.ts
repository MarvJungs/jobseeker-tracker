type ApplicationForm = {
    jobtitle: string,
    jobtitlelink?: string,
    company: string,
    status?: JobStatus,
    priority?: JobPriority,
    date_applied: string,
    last_contact: string,
    has_interviewed: boolean,
    has_referal: boolean,
    main_contact_name?: string,
    main_contact_email?: string,
    main_contact_phone?: string,
    location: string,
    salary_range?: string,
    heard_about?: string,
    rating?: number,
    notes?: string
}