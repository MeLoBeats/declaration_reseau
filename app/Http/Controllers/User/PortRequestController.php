<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePortRequest;
use App\Http\Resources\User\PortRequestResource;
use App\Models\PortRequest;
use App\Models\PortRequestPort;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PortRequestController extends Controller
{
    /**
     * Liste des demandes de l'utilisateur connecté.
     */
    public function index()
    {
        $requests = PortRequest::with('ports')
            ->latest()
            ->paginate(10);

        $collection = PortRequestResource::collection($requests);
        dd($collection);
        return Inertia::render('User/Requests/Index', [
            'requests' => PortRequestResource::collection($requests),
        ]);
    }

    /**
     * Affiche le formulaire de création.
     */
    public function create()
    {
        return Inertia::render('User/Requests/Create');
    }

    /**
     * Enregistre une nouvelle demande.
     */
    public function store(StorePortRequest $request)
    {
        $data = $request->validated();

        $portRequest = PortRequest::create([
            'fqdn' => $data['fqdn'],
            'ip_address' => $data['ip_address'],
            'exposed' => $data['exposed'],
            'vlan' => $data['vlan'] ?? null,
            'description' => $data['description'] ?? null,
            'requester' => Auth::user()->username,
        ]);

        $ports = collect($data['ports'])->map(fn($port) => new PortRequestPort($port));
        $portRequest->ports()->saveMany($ports);

        return redirect()->route('user.requests.index')
            ->with('success', 'Demande enregistrée avec succès.');
    }

    /**
     * Affiche les détails d'une demande.
     */
    public function show(PortRequest $portRequest)
    {
        if ($portRequest->requester !== Auth::user()->username) {
            abort(403);
        }

        $portRequest->load('ports');

        return Inertia::render('User/Requests/Show', [
            'request' => $portRequest,
        ]);
    }
}
