# Write Models Relation in server side

## Models
- ### User
```bash
use HasApiTokens, Notifiable, HasRoles;

protected $guard_name = "api";

protected $fillable = [
    'name',
    'email',
    'password',
];

protected $hidden = [
    'password',
    'remember_token',
];

protected $casts = [
    'email_verified_at' => 'datetime',
];

public function posts() {
    return $this->hasMany(Post::class);
}

public function upVotes() {
    return $this->hasMany(UpVote::class);
}

public function media() {
    return $this->morphToMany(Media::class, 'model', 'model_has_media');
}
```
- ### Post
```bash
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
```
- ### UpVote
```bash
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
```
- ### Media
```bash
protected $fillable = ['size', 'mime_type', 'url'];

public function user() {
    return $this->belongsTo(User::class);
}
```

