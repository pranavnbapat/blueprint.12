@component('mail::message')

    Here is your new password: {{ $new_password }}
    <br />Please change your password after logging in.
    <br />Thank you.

    {{ config('app.name') }}
@endcomponent
