<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Extensions\DatabaseSessionHandler;
use Illuminate\Support\Facades\Session;

class SessionServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        Session::extend('database', function($app){
            return new DatabaseSessionHandler;
        });
    }
}
