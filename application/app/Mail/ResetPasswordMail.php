<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Http\Request;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ResetPasswordMail extends Mailable {
    use Queueable, SerializesModels;

    private $new_password;

    public function __construct(Request $request) {
        $this->new_password = $request->new_password;
    }

    public function build() {
        return $this->markdown('emails.reset_password')->with(['new_password' => $this->new_password]);
    }
}
