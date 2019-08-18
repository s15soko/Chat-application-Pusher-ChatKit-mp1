<?php

use Illuminate\Database\Seeder;

class RoomsMembersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // 1
        DB::table("rooms_members")->insert([
            'user_id' => "1",
            'room_id' => "1",
        ]);
        DB::table("rooms_members")->insert([
            'user_id' => "2",
            'room_id' => "1",
        ]);
        // 2
        DB::table("rooms_members")->insert([
            'user_id' => "1",
            'room_id' => "2",
        ]);
        DB::table("rooms_members")->insert([
            'user_id' => "7",
            'room_id' => "2",
        ]);
        // 3
        DB::table("rooms_members")->insert([
            'user_id' => "2",
            'room_id' => "3",
        ]);
        DB::table("rooms_members")->insert([
            'user_id' => "6",
            'room_id' => "3",
        ]);
    }
}
