<?php

use Illuminate\Database\Seeder;

class RoomsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table("rooms")->insert([
            'room_id' => "prv_u_uid:1-uid:2",
            'room_type' => "one-to-one",
        ]);

        DB::table("rooms")->insert([
            'room_id' => "prv_u_uid:1-uid:7",
            'room_type' => "one-to-one",
        ]);

        DB::table("rooms")->insert([
            'room_id' => "prv_u_uid:2-uid:6",
            'room_type' => "one-to-one",
        ]);
    }
}
