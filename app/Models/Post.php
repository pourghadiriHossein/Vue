<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Post extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'title',
        'description',
        'up_vote_count',
        'location'
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function votes() {
        return $this->hasMany(UpVote::class);
    }

    public function media() {
        return $this->morphToMany(Media::class, 'model', 'model_has_media');
    }
}
