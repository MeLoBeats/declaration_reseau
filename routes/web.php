<?php

use App\Http\Controllers\User\PortRequestController;
use App\Models\PortRequest;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [PortRequestController::class, 'index'])->name('user.requests.index');
