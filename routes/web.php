<?php
use Illuminate\Support\Facades\Auth;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    if(Auth::guest())
        return view('welcome');
    else
        return view('home');
});

Auth::routes();
Route::get('/logout', '\App\Http\Controllers\Auth\LoginController@logout'); 

Route::get('/home', 'HomeController@index')->name('home');
Route::get('/search/friends', function(){
    return view('search.friends');
});

# AJAX
Route::post("/user/data/getdata", "UserController@getDataForJS");
Route::post("/user/friends/get", "UserFriendsController@index");

Route::post('/pusher/chatkit/quicktoken/save', 'QuickTokenController@store');