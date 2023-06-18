<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Laravel\Passport\Client;

class OauthClinetSeeder extends Seeder
{
    public function run(): void
    {
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
    }
}
