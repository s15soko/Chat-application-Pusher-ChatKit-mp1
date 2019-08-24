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
                                ON `uf`.`friend_id` = u.id
                                
                        LEFT JOIN
                            (SELECT * from friends_invitations WHERE `user_id` = $userID OR invited_user_id = $userID) AS `fi`
                                ON `u`.`id` = (CASE 
                                                   WHEN fi.user_id = $userID
                                                   THEN `fi`.invited_user_id
                                                   ELSE `fi`.`user_id`
                                           END)
                            
                    WHERE NOT `u`.`id` = $userID AND `u`.`name` LIKE :name;", 
                        [
                         ":name" => "%$name%"
                        ]);  

            return $friends;
        } catch (\Throwable $th) {
            return [];
        } 
    }

    /**
     * Get all invitations requests for user
     */
    public function getInvitations()
    {
        $userID = Auth::id();

        try {
            $invitation = DB::select(
                "SELECT `u`.`id`, `u`.`name`, `u`.`avatar`,
                        `fi`.`sended`
                
                    FROM `friends_invitations` AS `fi`

                        INNER JOIN `users` as `u` 
                            ON `u`.`id` = `fi`.`user_id`
                            
                        WHERE `fi`.`invited_user_id` = $userID");  

            return $invitation;
        } catch (\Throwable $th) {
            return [];
        }
    }
}
