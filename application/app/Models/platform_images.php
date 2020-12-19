<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class platform_images extends Model {
    protected $table = 'platform_images';
    protected $primaryKey = 'id';
    protected $keyType = 'int';
    public $incrementing = true;
}
