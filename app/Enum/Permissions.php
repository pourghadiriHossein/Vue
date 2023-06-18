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
