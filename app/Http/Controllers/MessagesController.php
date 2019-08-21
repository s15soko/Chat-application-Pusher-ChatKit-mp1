<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MessagesController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function getMessages(Request $request)
    {
        $userID = Auth::id();
        $roomID = $request['roomID'];

        // check if belong to this room
        // ...

        $messages = DB::table("private_messages")
            ->join('users', 'users.id', "=", "private_messages.user_id")
            ->select(['avatar', 'private_messages.created_at', 'user_id', 'content', 'private_messages.id'])
            ->where(["private_messages.room_id" => $roomID])
            ->orderBy('private_messages.created_at', 'asc')
            ->take(120)
            ->get();

        return $messages;
    }
}
