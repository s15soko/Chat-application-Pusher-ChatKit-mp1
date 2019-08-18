<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class QuickTokenController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function store(Request $request)
    {
        $userID = Auth::id();
        $token = $request['token'];

        DB::table('quick_token')
            ->updateOrInsert(
                ['user_id' => $userID],
                ['token' => $token]
            );
    }
}
