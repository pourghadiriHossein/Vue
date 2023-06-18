# Create Primary data in server side

## Create Enum Folder in app Folder
- ### Create Permissions.php File
```bash
<?php

namespace App\Enum;

final class Permissions {
    public const VIEW_MY_PROFILE = 'view my profile';
    public const UPDATE_MY_ACCOUNT = 'update my account';

    public const VIEW_ANY_POST = 'view any post';
    public const LIKE_ANY_POST = 'like any post';

    public const CREATE_NEW_POST = 'create new post';
    public const UPDATE_MY_POST = 'update my post';
    public const DELETE_MY_POST = 'delete my post';

    public const UPDATE_ANY_POST = 'update any post';
    public const DELETE_ANY_POST = 'delete any post';

    public const VIEW_ANY_ACCOUNT = 'view any account';
    public const CREATE_ANY_ACCOUNT = 'create any account';
    public const UPDATE_ANY_ACCOUNT = 'update any account';
    public const DELETE_ANY_ACCOUNT = 'delete any account';
}
```
- ### Create Roles.php File
```bash
<?php

namespace App\Enum;

final class Roles {
    public const ADMIN = 'admin';
    public const USER = 'user';
}
```

## Seeder Part
- ### OauthClinetSeeder Command
```bash
php artisan make:seeder OauthClinetSeeder
```
- ### OauthClinetSeeder run function
```bash
Client::create([
    'name' => 'Web Client',
    'id' => env('AUTH_WEB_CLIENT_ID',1),
    'secret' => env('AUTH_WEB_CLIENT_SECRET'),
    'redirect' => 'localhost:8000',
    'provider' => 'users',
    'personal_access_client' => 0,
    'password_client' => 1,
    'revoked' => 0,
]);
```
- ### PermissionSeeder Command
```bash
php artisan make:seeder PermissionSeeder
```
- ### PermissionSeeder run function
```bash
public function run(): void
{
    $admin = Role::create(['name' => Roles::ADMIN, 'guard_name' => 'api']);
    $user = Role::create(['name' => Roles::USER, 'guard_name' => 'api']);

    Permission::create(['name' => Permissions::VIEW_MY_PROFILE, 'guard_name' => 'api']);
    Permission::create(['name' => Permissions::UPDATE_MY_ACCOUNT, 'guard_name' => 'api']);

    Permission::create(['name' => Permissions::VIEW_ANY_POST, 'guard_name' => 'api']);
    Permission::create(['name' => Permissions::LIKE_ANY_POST, 'guard_name' => 'api']);

    Permission::create(['name' => Permissions::CREATE_NEW_POST, 'guard_name' => 'api']);
    Permission::create(['name' => Permissions::UPDATE_MY_POST, 'guard_name' => 'api']);
    Permission::create(['name' => Permissions::DELETE_MY_POST, 'guard_name' => 'api']);

    Permission::create(['name' => Permissions::UPDATE_ANY_POST, 'guard_name' => 'api']);
    Permission::create(['name' => Permissions::DELETE_ANY_POST, 'guard_name' => 'api']);

    Permission::create(['name' => Permissions::VIEW_ANY_ACCOUNT, 'guard_name' => 'api']);
    Permission::create(['name' => Permissions::CREATE_ANY_ACCOUNT, 'guard_name' => 'api']);
    Permission::create(['name' => Permissions::UPDATE_ANY_ACCOUNT, 'guard_name' => 'api']);
    Permission::create(['name' => Permissions::DELETE_ANY_ACCOUNT, 'guard_name' => 'api']);

    $admin->givePermissionTo(Permissions::VIEW_MY_PROFILE);
    $admin->givePermissionTo(Permissions::UPDATE_MY_ACCOUNT);

    $admin->givePermissionTo(Permissions::VIEW_ANY_POST);
    $admin->givePermissionTo(Permissions::LIKE_ANY_POST);

    $admin->givePermissionTo(Permissions::CREATE_NEW_POST);
    $admin->givePermissionTo(Permissions::UPDATE_MY_POST);
    $admin->givePermissionTo(Permissions::DELETE_MY_POST);

    $admin->givePermissionTo(Permissions::UPDATE_ANY_POST);
    $admin->givePermissionTo(Permissions::DELETE_ANY_POST);

    $admin->givePermissionTo(Permissions::VIEW_ANY_ACCOUNT);
    $admin->givePermissionTo(Permissions::CREATE_ANY_ACCOUNT);
    $admin->givePermissionTo(Permissions::UPDATE_ANY_ACCOUNT);
    $admin->givePermissionTo(Permissions::DELETE_ANY_ACCOUNT);

    $user->givePermissionTo(Permissions::VIEW_MY_PROFILE);
    $user->givePermissionTo(Permissions::UPDATE_MY_ACCOUNT);

    $user->givePermissionTo(Permissions::VIEW_ANY_POST);
    $user->givePermissionTo(Permissions::LIKE_ANY_POST);

    $user->givePermissionTo(Permissions::CREATE_NEW_POST);
    $user->givePermissionTo(Permissions::UPDATE_MY_POST);
    $user->givePermissionTo(Permissions::DELETE_MY_POST);
}
```
- ### UserSeeder Command
```bash
php artisan make:seeder UserSeeder
```
- ### UserSeeder run function
```bash
$user = User::create([
    'name' => 'حسین پورقدیری',
    'email' => 'hossein.654321@yahoo.com',
    'password' => Hash::make('123456')
]);
$user->assignRole(Role::findByName(Roles::ADMIN, 'api'));
```
- ### Update DatabaseSeeder File
```bash
$this->call([
    OauthClinetSeeder::class,
    PermissionSeeder::class,
    UserSeeder::class,
]);
```
## Update config/cors.php file
```bash
'paths' => ['api/*', 'sanctum/csrf-cookie', 'oauth/token'],

'allowed_methods' => ['*'],

'allowed_origins' => ['*'],

'allowed_origins_patterns' => [],

'allowed_headers' => ['*'],

'exposed_headers' => [],

'max_age' => 0,

'supports_credentials' => true,
```
