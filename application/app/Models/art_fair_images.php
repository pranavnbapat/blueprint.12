<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class art_fair_images extends Model {
    protected $table = 'art_fair_images';
    protected $primaryKey = 'id';
    protected $keyType = 'int';
    public $incrementing = true;
}
