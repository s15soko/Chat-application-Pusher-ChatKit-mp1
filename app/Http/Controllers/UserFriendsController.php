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
     * 
     * @return array
     */
    public function userFriends()
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

    /**
     * Search friends by name
     */
    public function searchByName(Request $request)
    {
        $name = $request['name'];  
        $userID = Auth::id();     

        // Get friend by name
        // + get data if current logged user invited someone to friends
        // + get data if someone invited current user
        try {       
            $friends = DB::select(
                "SELECT DISTINCT `u`.`id`, `u`.`name`, `u`.`avatar`,
                        `uf`.`added`,
                        `fi`.`sended`, `fi`.`invited_user_id`
                    FROM `users` AS `u`
                        
                        LEFT JOIN 
                            (SELECT * from users_friends WHERE `user_id` = $userID) AS `uf`
                                ON `uf`.`user_id` = u.id
                                
                        LEFT JOIN
                            (SELECT * from friends_invitations WHERE `user_id` = $userID OR invited_user_id = $userID) AS `fi`
                                ON `u`.`id` = (CASE 
                                                   WHEN fi.user_id = $userID
                                                   THEN `fi`.invited_user_id
                                                   ELSE `fi`.`user_id`
                                           END)
                            
                    WHERE NOT `u`.`id` = $userID AND `u`.`name` LIKE :name;", 
                        [
                         ":name" => $name
                        ]);  

            return $friends;
        } catch (\Throwable $th) {
            return [];
        } 
    }

    // /**
    //  * Check if friend is in user friends list
    //  * 
    //  * @param int $friendID
    //  * @param int $user 
    //  * 
    //  * @return bool
    //  */
    // public static function checkIfInFriendsList($friendID, $user = null): bool
    // {
    //     if($user == null)
    //         $user = Auth::id();

    //     return (bool)DB::table('user_friends')
    //         ->where([["user_id", $user], ["friend_id", $friendID]])
    //         ->orWhere([["user_id", $friendID], ["friend_id", $user]])
    //         ->first();
    // }
}
