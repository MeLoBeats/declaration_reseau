<?php

namespace App\Models;

use App\PortRequestStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class PortRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'fqdn',
        'ip_address',
        'exposed',
        'vlan',
        'description',
        'status',
        'requester',
        'approver',
    ];

    protected $casts = [
        'status' => PortRequestStatus::class,
    ];

    public function ports()
    {
        return $this->hasMany(PortRequestPort::class);
    }
}
