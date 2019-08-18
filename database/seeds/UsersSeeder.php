<?php

use Illuminate\Database\Seeder;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table("users")->insert([
            'name' => "John",
            'email' => "john".'@gmail.com',
            'avatar' => "https://images.pexels.com/photos/769772/pexels-photo-769772.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            'password' => bcrypt('qweqwe'),
        ]);

        DB::table("users")->insert([
            'name' => "Tom",
            'email' => "tom".'@gmail.com',
            'avatar' => "https://images.pexels.com/photos/2778211/pexels-photo-2778211.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            'password' => bcrypt('qweqwe'),
        ]);

        DB::table("users")->insert([
            'name' => "Jerry",
            'email' => "jerry".'@gmail.com',
            'avatar' => "https://images.pexels.com/photos/2097475/pexels-photo-2097475.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            'password' => bcrypt('qweqwe'),
        ]);

        DB::table("users")->insert([
            'name' => "Adam",
            'email' => "adam".'@gmail.com',
            'avatar' => "https://images.pexels.com/photos/2762098/pexels-photo-2762098.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            'password' => bcrypt('qweqwe'),
        ]);

        DB::table("users")->insert([
            'name' => "Alice",
            'email' => "alice".'@gmail.com',
            'avatar' => "https://images.pexels.com/photos/2767922/pexels-photo-2767922.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            'password' => bcrypt('qweqwe'),
        ]);

        DB::table("users")->insert([
            'name' => "Patricia",
            'email' => "patricia".'@gmail.com',
            'avatar' => "https://images.pexels.com/photos/2776582/pexels-photo-2776582.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            'password' => bcrypt('qweqwe'),
        ]);

        DB::table("users")->insert([
            'name' => "Charlotte",
            'email' => "charlotte".'@gmail.com',
            'avatar' => "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            'password' => bcrypt('qweqwe'),
        ]);

        DB::table("users")->insert([
            'name' => "Diana",
            'email' => "diana".'@gmail.com',
            'avatar' => "https://images.pexels.com/photos/1988681/pexels-photo-1988681.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            'password' => bcrypt('qweqwe'),
        ]);

        DB::table("users")->insert([
            'name' => "Eva",
            'email' => "eva".'@gmail.com',
            'avatar' => "https://images.pexels.com/photos/638700/pexels-photo-638700.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            'password' => bcrypt('qweqwe'),
        ]);
    }
}
