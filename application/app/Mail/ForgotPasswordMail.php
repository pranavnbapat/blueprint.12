<?php

namespace App\Mail;

use Illuminate\Http\Request;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ForgotPasswordMail extends Mailable {
    use Queueable, SerializesModels;

    private $reset_token;

    public function __construct(Request $request) {
        $this->reset_token = $request->reset_password_token;
    }

    public function build() {
        return $this->markdown('emails.forgot_password')->with(['token' => $this->reset_token]);
    }
}
