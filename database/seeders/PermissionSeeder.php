<?php

namespace Database\Seeders;

use App\Enum\Permissions;
use App\Enum\Roles;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionSeeder extends Seeder
{
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
}
