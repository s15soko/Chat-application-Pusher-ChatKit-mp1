<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UsersFriends extends Model
{
    public $timestamps = false;

    public function friend()
    {
        return $this->belongsTo("App\User");
    }
}
