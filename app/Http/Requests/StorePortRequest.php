<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StorePortRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'fqdn' => ['required', 'string', 'max:255'],
            'ip_address' => ['required', 'ip'],
            'exposed' => ['boolean'],
            'vlan' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'requester' => ['required', 'string', 'max:255'],
            'approver' => ['nullable', 'string', 'max:255'],
            'ports' => ['required', 'array', 'min:1'],
            'ports.*.port' => ['required', 'string', 'max:10'],
            'ports.*.protocol' => ['required', Rule::in(['TCP', 'UDP'])],
        ];
    }

    public function messages(): array
    {
        return [
            'ports.*.port.required' => 'Le port est obligatoire pour chaque entrée.',
            'ports.*.protocol.required' => 'Le protocole est obligatoire pour chaque port.',
            'ports.*.protocol.in' => 'Le protocole doit être TCP ou UDP.',
        ];
    }
}
