<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class about extends Model {
    protected $table = 'about';
    protected $primaryKey = 'id';
    protected $keyType = 'tinyint';
    public $incrementing = true;
}
