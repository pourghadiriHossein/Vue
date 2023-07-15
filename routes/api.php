<?php

use App\Enum\Permissions;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('register', [UserController::class, 'register']);

Route::Group([
    'middleware' => ['auth:api']
], function () {

    Route::get('user/profile', [UserController::class, 'profile'])->middleware(['can:'.Permissions::VIEW_MY_PROFILE]);
    Route::post('update-my-profile/{user}', [UserController::class, 'updateMyProfile'])->middleware(['can:'.Permissions::UPDATE_MY_ACCOUNT]);

    Route::get('all-posts-for-dashboard', [PostController::class, 'allPostsForDashboard'])->middleware(['can:'.Permissions::VIEW_ANY_POST]);
    Route::get('posts/{post}/like', [PostController::class, 'likePost'])->middleware(['can:'.Permissions::LIKE_ANY_POST]);

    Route::get('my-posts', [PostController::class, 'myPosts'])->middleware(['can:'.Permissions::VIEW_ANY_POST]);
    Route::post('create-post', [PostController::class, 'createPost'])->middleware(['can:'.Permissions::CREATE_NEW_POST]);
    Route::post('update-my-post/{post}', [PostController::class, 'updateMyPost'])->middleware(['can:'.Permissions::UPDATE_MY_POST]);
    Route::get('delete-my-post/{post}', [PostController::class, 'deleteMyPost'])->middleware(['can:'.Permissions::DELETE_MY_POST]);

    Route::get('all-posts-for-admin', [PostController::class, 'allPostsForAdmin'])->middleware(['can:'.Permissions::VIEW_ANY_POST]);
    Route::post('update-post-by-admin/{post}', [PostController::class, 'updatePostByAdmin'])->middleware(['can:'.Permissions::UPDATE_ANY_POST]);
    Route::get('delete-post-by-admin/{post}', [PostController::class, 'deletePostByAdmin'])->middleware(['can:'.Permissions::DELETE_ANY_POST]);

    Route::get('all-users', [UserController::class, 'allUsers'])->middleware(['can:'.Permissions::VIEW_ANY_ACCOUNT]);
    Route::post('create-user-by-admin', [UserController::class, 'createUserByAdmin'])->middleware(['can:'.Permissions::CREATE_ANY_ACCOUNT]);
    Route::post('update-user-by-admin/{user}', [UserController::class, 'updateUserByAdmin'])->middleware(['can:'.Permissions::UPDATE_ANY_ACCOUNT]);
    Route::get('delete-user-by-admin/{user}', [UserController::class, 'deleteUserByAdmin'])->middleware(['can:'.Permissions::DELETE_ANY_ACCOUNT]);

});
