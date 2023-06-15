## <a href="https://spatie.be/docs/laravel-permission/v5/installation-laravel">Install Spatie Laravel Permission</a>
- ### Install Spatie
```bash
composer require spatie/laravel-permission
```
- ### Add To providers Array in config\app.php File
```bash
Spatie\Permission\PermissionServiceProvider::class,
```
- ### Create Migartions
```bash
php artisan vendor:publish --provider="Spatie\Permission\PermissionServiceProvider"
```
- ### Clear Config
```bash
php artisan config:clear
```
- ### Add to User Use
```bash
HasRoles
```
- ### Add use HasRoles Directory
```bash
use Spatie\Permission\Traits\HasRoles;
```


