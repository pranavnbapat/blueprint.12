<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class homepage extends Model {
    protected $table = 'homepage';
    protected $primaryKey = 'id';
    protected $keyType = 'mediumint';
    public $incrementing = true;
}
