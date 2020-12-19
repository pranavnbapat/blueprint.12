<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class admin_menu_master extends Model {
    protected $table = 'admin_menu_master';
    protected $primaryKey = 'id';
    protected $keyType = 'tinyint';
    public $incrementing = true;
}
