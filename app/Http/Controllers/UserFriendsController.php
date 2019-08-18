<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\UsersFriends;

use Illuminate\Support\Facades\DB;

class UserFriendsController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
    
     /**
     * Get user friends
     */
    public function index()
    {
        try {
            $user = Auth::id();

            $friends = DB::table('users_friends')
                    ->select('users.id', 'name', 'avatar', 'lastTimeTalk')
                    ->join('users', 'users.id', 'users_friends.friend_id')
                    ->where([["user_id", $user]])
                    ->get();

            return $friends;
        } catch (\Throwable $th) {
            return [];
        }
    }

    // /**
    //  * @param int $friendID
    //  * @param int $user / default null - then get from Auth
    //  * 
    //  * @return object (null or friend data)
    //  */
    // public static function checkIfInFriendsList($friendID, $user = null)
    // {
    //     if($user == null)
    //         $user = Auth::id();

    //     $result = DB::table('user_friends')
    //         ->where([["user_id", $user], ["friend_id", $friendID]])
    //         ->orWhere([["user_id", $friendID], ["friend_id", $user]])
    //         ->first();
    //     return $result;
    //}

    public function addFriend()
    {
        
    } 
}
