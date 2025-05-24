<?php

namespace App\Http\Resources\User;

use App\Http\Resources\PortRequestPortResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PortRequestResource extends JsonResource
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'fqdn' => $this->fqdn,
            'ip_address' => $this->ip_address,
            'exposed' => $this->exposed,
            'vlan' => $this->vlan,
            'description' => $this->description,
            'status' => $this->status,
            'status_label' => $this->status_enum?->label(), // si tu as un enum cast
            'requester' => $this->requester,
            'approver' => $this->approver,
            'created_at' => $this->created_at->toIso8601String(),
            'updated_at' => $this->updated_at->toIso8601String(),
            'ports' => PortRequestPortResource::collection($this->whenLoaded('ports')),
        ];
    }
}
