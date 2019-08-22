<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\RoomsMembersController;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Get data for js
     */
    public function getDataForJS()
    {
        $userID = Auth::id();
        $userData = DB::table('users')->select(['avatar', 'name'])->where(['id' => $userID])->first();   

        $data['id'] = $userID;     
        $data['avatar'] = $userData->avatar;
        $data['name'] = $userData->name;
        $data['rooms'] = RoomsMembersController::roomsMember($userID);
        return ($data);
    }
}
