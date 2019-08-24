<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ config('app.name', 'Chat') }}</title>
    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">
    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <link rel='stylesheet' href='https://use.fontawesome.com/releases/v5.7.0/css/all.css'
        integrity='sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ' crossorigin='anonymous'>
</head>
<body>
    <div id="app">

        <nav id='appHeader'>
            <div class="box">

               <div class='logo'>
                    <a class="navbar-brand" href="{{ url('/') }}">
                        Chat
                    </a>
                    <button id="test">TEST</button>
               </div>

               <div class='navigation'>

                <nav class="navbar navbar-expand-lg navbar-light bg-light" style='padding: 0;'>
                  
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                      
                      <ul class="navbar-nav ml-auto">
                        <li class="nav-item" style='display: flex; align-items: center; padding: 0 12px; 0 5px'>
                            <a href={{url('/search/friends')}}>
                                <i class="fas fa-search"></i>
                            </a>
                        </li>

                        <li class="nav-item" style='display: flex; align-items: center; padding: 0 12px; 0 5px'>
                            <a href="#">
                                <i class="fas fa-user-friends"></i>
                            </a>
                        </li>
                        <li class="nav-item dropdown">
                          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="fas fa-cog" style='color: #3490dc;'></i>
                          </a>
                          <div class="dropdown-menu" aria-labelledby="navbarDropdown" style='left: -80px;'>
                            <a class="dropdown-item" href="#">Settings</a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href={{url('/logout')}}>Logout</a>
                          </div>
                        </li>
                      </ul>

                    </div>

                  </nav>
                
               </div>

            </div>
        </nav>

        <div id="content">
            @yield('content')
        </div>
        
    </div>
</body>
</html>
