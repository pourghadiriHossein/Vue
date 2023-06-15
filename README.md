## <a href="https://laravel.com/docs/9.x/passport">Set Laravel Passport For Project</a>
- ### Installation
```bash
composer require laravel/passport
```
- ### if "composer require laravel/passport" didn't work, remove "composer.lock" then try it
- ### Migrate Table
```bash
php artisan migrate
```
- ### Command For Create the Encryption Keys
```bash
php artisan passport:install
```
- ### Add AUTH_WEB_CLIENT_ID and AUTH_WEB_CLIENT_SECRET in .env file
```bash
AUTH_WEB_CLIENT_ID=
AUTH_WEB_CLIENT_SECRET=
```
- ### Add HasApiTokens to User Model, use Laravel\Sanctum\HasApiTokens change to
```bash
use Laravel\Passport\HasApiTokens;
```

- ### Update Guard Part in config/auth.php
```bash
'guards' => [
    'web' => [
        'driver' => 'session',
        'provider' => 'users',
    ],
 
    'api' => [
        'driver' => 'passport',
        'provider' => 'users',
    ],
],
```

- ### Passport::loadKeysFrom in App\Providers\AuthServiceProvider
```bash
use Laravel\Passport\Passport;

public function boot()
{
    $this->registerPolicies();
 
    Passport::loadKeysFrom(__DIR__.'/../secrets/oauth');
}
```
- ### Create secrets Folder in App Directory then Create oauth Folder in secrets Folder

- ### Loading Keys
```bash
php artisan passport:keys
```

- ### Config Customization
```bash
php artisan vendor:publish --tag=passport-config
```

- ### Migration Customization
```bash
php artisan vendor:publish --tag=passport-migrations
```
