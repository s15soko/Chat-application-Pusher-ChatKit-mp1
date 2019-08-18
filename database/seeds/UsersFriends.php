<?php

use Illuminate\Database\Seeder;

class UsersFriends extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {   
        // 1
        DB::table("users_friends")->insert([
            'user_id' => "2",
            'friend_id' => "1",
        ]);

        DB::table("users_friends")->insert([
            'user_id' => "1",
            'friend_id' => "2",
        ]);

        // 2
        DB::table("users_friends")->insert([
            'user_id' => "1",
            'friend_id' => "7",
        ]);

        DB::table("users_friends")->insert([
            'user_id' => "7",
            'friend_id' => "1",
        ]);
        // 3
        DB::table("users_friends")->insert([
            'user_id' => "2",
            'friend_id' => "6",
        ]);

        DB::table("users_friends")->insert([
            'user_id' => "6",
            'friend_id' => "2",
        ]);
    }
}
