<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class menu_master extends Model {
    protected $table = 'menu_master';
    protected $primaryKey = 'id';
    protected $keyType = 'tinyint';
    public $incrementing = true;
}
