<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class RoomsMembersController extends Controller
{
    /**
     * Check if user belong to room
     * 
     * @param int $roomID
     * @param int $userID
     * 
     * @return bool
     */
    public static function belongTo($roomID, $userID = null): bool
    {
        if($userID == null)
            $userID = Auth::id();

        return (bool)DB::table('rooms_members')
            ->select(['id'])
            ->where([['user_id', $userID], ['room_id', $roomID]])
            ->first();
    }

    /**
     * Get user rooms
     * 
     * @param int $userID
     */
    public static function roomsMember($userID)
    {
        $roomsMember = DB::table('rooms_members')
            ->join('rooms', 'rooms.id', 'rooms_members.room_id')
            ->where([["user_id", $userID]])
            ->get();
        return $roomsMember;
    }
}
