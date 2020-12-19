<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class exhibition_images extends Model {
    protected $table = 'exhibition_images';
    protected $primaryKey = 'id';
    protected $keyType = 'int';
    public $incrementing = true;
}
