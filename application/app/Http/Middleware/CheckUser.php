<?php

namespace App\Http\Middleware;

use Closure,
    App\Models\user_master;

class CheckUser
{
    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if(user_master::where('email', '=', $request->email)->exists()):
            //user found
        else:
            //throw user out
        endif;
        return $next($request);
    }
}
