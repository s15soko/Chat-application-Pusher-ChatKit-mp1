<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function roomsMember($userID)
    {
        $roomsMember = DB::table('rooms_members')
            ->join('rooms', 'rooms.id', 'rooms_members.room_id')
            ->where([["user_id", $userID]])
            ->get();
        return $roomsMember;
    }

    public function getDataForJS()
    {
        $userID = Auth::id();
        $avatar = DB::table('users')->select(['avatar'])->where(['id' => $userID])->first();   

        $data['id'] = $userID;     
        $data['avatar'] = $avatar;
        $data['rooms'] = $this->roomsMember($userID);
        return ($data);
    }
}