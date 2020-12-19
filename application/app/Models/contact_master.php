<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class contact_master extends Model {
    protected $table = 'contact_master';
    protected $primaryKey = 'id';
    protected $keyType = 'tinyint';
    public $incrementing = true;
}
