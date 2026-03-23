<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreJobApplicationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation()
    {
        $this->merge([
            'status_id' => $this->status,
            'priority_id' => $this->priority
        ]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'jobtitle' => ['string', 'required'],
            'jobtitlelink' => ['string', 'url', 'nullable'],
            'company' => ['string', 'required'],
            'status_id' => ['required', 'exists:statuses,id'],
            'priority_id' => ['required', 'exists:priorities,id'],
            'date_applied' => ['required', 'date'],
            'last_contact' => ['required', 'date'],
            'has_interviewed' => ['required', 'boolean'],
            'has_referal' => ['required', 'boolean'],
            'main_contact_name' => ['nullable', 'string'],
            'main_contact_email' => ['nullable', 'email'],
            'main_contact_phone' => ['nullable', 'string'],
            'location' => ['required', 'string'],
            'salary_range' => ['nullable', 'string'],
            'heard_about' => ['nullable', 'string'],
            'rating' => ['nullable' => 'decimal:0,5'],
            'notes' => ['nullable', 'string']
        ];
    }
}
