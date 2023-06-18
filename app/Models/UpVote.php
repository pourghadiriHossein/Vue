<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UpVote extends Model
{
    public $incrementing = false;

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function post() {
        return $this->belongsTo(Post::class);
    }

    protected static function boot()
    {
        parent::boot();
        UpVote::created(function(UpVote $upVote) {
            $post = $upVote->post;
            $post->increment('up_vote_count', 1);
            $post->save();
        });
        UpVote::deleted(function(UpVote $upVote) {
            $post = $upVote->post;
            $post->decrement('up_vote_count', 1);
            $post->save();
        });
    }
}
