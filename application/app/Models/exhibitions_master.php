<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class exhibitions_master extends Model {
    protected $table = 'exhibitions_master';
    protected $primaryKey = 'id';
    protected $keyType = 'int';
    public $incrementing = true;
}
