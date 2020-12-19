<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class password_resets extends Model {
    protected $table = 'password_resets';
    protected $primaryKey = 'id';
    protected $keyType = 'int';
    public $incrementing = true;
}
