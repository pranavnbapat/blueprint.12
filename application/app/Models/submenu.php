<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class submenu extends Model {
    protected $table = 'submenu';
    protected $primaryKey = 'id';
    protected $keyType = 'tinyint';
    public $incrementing = true;
}
