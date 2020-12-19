<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class seo_master extends Model {
    protected $table = 'seo_master';
    protected $primaryKey = 'id';
    protected $keyType = 'tinyint';
    public $incrementing = true;
}
