<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class platform_master extends Model {
    protected $table = 'platform_master';
    protected $primaryKey = 'id';
    protected $keyType = 'int';
    public $incrementing = true;
}
