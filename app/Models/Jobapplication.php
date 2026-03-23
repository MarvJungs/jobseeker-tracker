<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Jobapplication extends Model
{
    protected $fillable = [
        'jobtitle',
        'jobtitlelink',
        'company',
        'status_id',
        'priority_id',
        'date_applied',
        'last_contact',
        'has_interviewed',
        'has_referal',
        'main_contact_name',
        'main_contact_email',
        'main_contact_phone',
        'location',
        'salary_range',
        'heard_about',
        'rating',
        'notes'
    ];

    public function priority(): BelongsTo {
        return $this->belongsTo(Priority::class);
    }
    public function status(): BelongsTo {
        return $this->belongsTo(Status::class);
    }
}
