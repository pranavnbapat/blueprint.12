<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class year_master extends Model {
    protected $table = 'year_master';
    protected $primaryKey = 'id';
    protected $keyType = 'tinyint';
    public $incrementing = true;
}
