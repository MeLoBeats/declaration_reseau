<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PortRequestPort extends Model
{
    use HasFactory;

    protected $fillable = [
        'port_request_id',
        'port',
        'protocol',
    ];

    public function request()
    {
        return $this->belongsTo(PortRequest::class, 'port_request_id');
    }
}
