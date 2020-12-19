@component('mail::message')

    Please click <a href="{{url('/reset-password/'.$token)}}">here</a> to reset your password. New password will be emailed to this address.<br />
    <br />Thank you,

{{ config('app.name') }}
@endcomponent
