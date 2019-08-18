@extends('layouts.app')
<script src="{{ asset('js/app.js') }}" defer></script>    
@section('content')

    <div id="friendsSidebar">
        <div id="sidebarHeader">
            <button id='test'>test</button>
        </div>
        <div id="friends">

        </div>
    </div>

    <div id="chatContent">    
        <div id="chatWindow">

            <div id="chatMessages">
                <div id='messages'></div>
            </div>

            <div id="chatBottomInputsContainer">
                <textarea id="chatMessageTextarea" type="message" placeholder="Type a message..."></textarea>
                <input id="chatSubmit" class="btn btn-primary btn-sm" type="submit" value="Send">
            </div>
            
        </div>
    </div>

@endsection