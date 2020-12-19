<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class artist_transaction extends Model {
    protected $table = 'artist_transaction';
    protected $primaryKey = 'id';
    protected $keyType = 'int';
    public $incrementing = true;
}
