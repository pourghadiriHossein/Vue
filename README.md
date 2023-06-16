# Design Database and Migrations for server side
## Create All Object With Detail for Migration and Model

- ### User
| id  | name | email | password |
| - | - | - | - |
| int-pk  | str-100 | str-UNI | str |

- ### Post
| id  | user_id | title | description | location | up_vote_count |
| - | - | - | - | - | - |
| int-pk  | int-fk | str-250 | text | point | int-UN |

- ### Up Vote
| id  | user_id | post_id |
| - | - | - |
| int-pk  | int-fk | int-fk |

- ### Media
| id  | user_id | size | mime_type | url |
| - | - | - | - | - |
| int-pk  | int-fk | int-UN | text | text |

- ### Model has Media
| id  | model_id | model_type | media_id |
| - | - | - | - |
| int-pk  | int-fk | text | int-fk |

## Models and Migrations
- ### command for create Post
```bash
php artisan make:model -m Post
```
- ### posts migration
```bash
Schema::create('posts', function (Blueprint $table) {
    $table->id();
    $table->unsignedBigInteger('user_id');
    $table->string('title', 250);
    $table->text('description')->nullable();
    $table->point('location')->nullable();
    $table->unsignedInteger('up_vote_count')->default(0);
    $table->timestamps();
    $table->softDeletes();

    $table->foreign('user_id')
        ->references('id')
        ->on('users');
});
```
- ### command for create UpVote
```bash
php artisan make:model -m UpVote
```
- ### up_votes migration
```bash
Schema::create('up_votes', function (Blueprint $table) {
    $table->id();
    $table->unsignedBigInteger('user_id');
    $table->unsignedBigInteger('post_id');
    $table->timestamps();

    $table->unique(['user_id', 'post_id']);
    $table->foreign('user_id')
        ->references('id')
        ->on('users');
    $table->foreign('post_id')
        ->references('id')
        ->on('posts');
});
```
- ### command for create Media
```bash
php artisan make:model -m Media
```
- ### media migration
```bash
Schema::create('media', function (Blueprint $table) {
    $table->id();
    $table->unsignedBigInteger('user_id');
    $table->unsignedInteger('size')->default(0);
    $table->text('mime_type')->nullable();
    $table->text('url')->nullable();
    $table->timestamps();

    $table->foreign('user_id')
        ->references('id')
        ->on('users');
});
```
- ### command for create model_has_media
```bash
php artisan make:migration create_model_has_media_table
```
- ### model_has_media migration
```bash
Schema::create('model_has_media', function (Blueprint $table) {
    $table->id();
    $table->unsignedBigInteger('model_id');
    $table->text('model_type');
    $table->unsignedBigInteger('media_id');
    $table->timestamps();
});
```

