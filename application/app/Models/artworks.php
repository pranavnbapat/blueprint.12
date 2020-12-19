<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class artworks extends Model {
    protected $table = 'artworks';
    protected $primaryKey = 'id';
    protected $keyType = 'int';
    public $incrementing = true;
}
