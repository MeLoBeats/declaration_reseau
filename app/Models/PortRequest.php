<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class PortRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'fqdn',
        'ip_address',
        'exposed',
        'vlan',
        'description',
        'status',
        'requester',
        'approver',
    ];

    public function ports()
    {
        return $this->hasMany(PortRequestPort::class);
    }
}
