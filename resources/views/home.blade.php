@extends('layouts.app')
<script src="{{ asset('js/app.js') }}" defer></script>    
@section('content')

    <div id="friendsSidebar">
        <div id="sidebarHeader"></div>
        <div id="friends"></div>
    </div>

    <div id="chatContent">    
        <div id="chatWindow">

            <div id="chatTop">
                <div id='roomData'>
                    <picture>
                        <img/>
                    </picture>
                    <div class='content'>
                        <div class='top'><span></span></div>
                        <div class='bottom'><span></span></div>
                    </div>
                </div>
            </div>

            <div id="chatMessages">
                <div id='messages'></div>
            </div>

            <div id="chatBottomInputsContainer">
                <div id="panel">
                    <div id="chatEmojisContainer">
                        <button id='chatEmojiFace'><i class="far fa-grin-alt"></i></button>
                        <div id='emojisContainer'></div>
                    </div>
                    <textarea id="chatMessageTextarea" type="message" placeholder="Type a message..."></textarea>
                </div>
                <button id="chatSubmit" class="btn btn-primary btn-sm"><i class="fas fa-paper-plane"></i></button>
            </div>
            
        </div>
    </div>

@endsection