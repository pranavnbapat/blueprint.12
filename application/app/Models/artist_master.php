<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class artist_master extends Model {
    protected $table = 'artist_master';
    protected $primaryKey = 'id';
    protected $keyType = 'int';
    public $incrementing = true;
}
