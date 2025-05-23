<?php

use App\Models\PortRequest;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    dd(PortRequest::with('ports')->limit(10)->get());
});
