<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class contact_leads extends Model {
    protected $table = 'contact_leads';
    protected $primaryKey = 'id';
    protected $keyType = 'int';
    public $incrementing = true;
}
