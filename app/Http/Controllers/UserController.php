<?php

namespace App\Http\Controllers;

use App\Enum\Roles;
use App\Http\Requests\CreateUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
//create user
    public function register(CreateUserRequest $request) {
        $check = User::where('email',$request->input('email'))->first();
        if($check)
            return $this->failResponse([
                'errors' => ['error' => ['This E-Mail Already Exist']],
            ]);
        $data = $request->safe(['name', 'email', 'password']);
        $user = new User([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);
        $user->save();
        $user->assignRole(Role::findByName(Roles::USER, 'api'));
        if ($request->file('avatar'))
            $this->storeUserAvatar($request->file('avatar'), $user->id);

        if($user) {
            return $this->successResponse([
                'errors' => ['error' => ['User Created']],
            ]);
        }
        return $this->failResponse();
    }
//user profile
    public function profile() {
        $user = User::where('id', Auth::id())->with('roles')->with('media')->first();
        if($user) {
            return $this->successResponse([
                'user' => $user,
                'message' => 'profile',
            ]);
        }else
            return $this->failResponse();
    }
    public function updateMyProfile(UpdateUserRequest $request, User $user) {
        if ($user->id !== Auth::id()) {
            return $this->failResponse([], 403);
        }
        if($request->input('password')) {
            $data = $request->safe(['name', 'email', 'password']);
            $user->update([
                'name' => $data['name'],
                'email' => $data['email'],
                'password' => Hash::make($data['password']),
            ]);
        }else {
            $data = $request->safe(['name', 'email']);
            if ($request->input('email') == Auth::user()->email) {
                $user->update(['name' => $data['name']]);
            } else {
                if (User::where('email', $request->input('email'))->first()) {
                    return $this->failResponse([
                        'errors' => ['error' => ['This E-Mail Already Exist']],
                    ]);
                } else {
                        $user->update([
                        'name' => $data['name'],
                        'email' => $data['email'],
                    ]);
                }
            }
        }
        if ($request->file('avatar'))
            $this->storeUserAvatar($request->file('avatar'), $user->id);
        return $this->successResponse([
            'errors' => ['error' => ['User Updated']],
        ]);
    }
//all users
    public function allUsers() {
        if (Auth::user()->getRoleNames()[0] !== Roles::ADMIN) {
            return $this->failResponse([], 403);
        }
        $query = User::query()
        ->select([
            'id',
            'name',
            'email' ])
        ->orderBy('id', 'desc')
        ->with('roles');

        $users = $query->paginate(5);
        return $this->paginatedSuccessResponse($users, 'users');
    }
    public function createUserByAdmin(CreateUserRequest $request) {
        if (Auth::user()->getRoleNames()[0] !== Roles::ADMIN) {
            return $this->failResponse([], 403);
        }
        $check = User::where('email',$request->input('email'))->first();
        if($check)
            return $this->failResponse([
                'errors' => ['error' => ['This E-Mail Already Exist']],
            ]);
        $data = $request->safe(['name', 'email', 'password']);
        $user = new User([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);
        $user->save();
        if  ($request->input('role') === 'admin'){
            $user->assignRole(Role::findByName(Roles::ADMIN, 'api'));
        }
        elseif ($request->input('role') === 'user'){
            $user->assignRole(Role::findByName(Roles::USER, 'api'));
        }
        else {
            $user->assignRole(Role::findByName(Roles::USER, 'api'));
        }
        if ($request->file('avatar'))
            $this->storeUserAvatar($request->file('avatar'), $user->id);
        if($user) {
            return $this->successResponse([
                'errors' => ['error' => ['User Created']],
            ]);
        }
        return $this->failResponse();
    }
    public function updateUserByAdmin(UpdateUserRequest $request, User $user)
    {
        if (Auth::user()->getRoleNames()[0] !== Roles::ADMIN) {
            return $this->failResponse([], 403);
        }
        $check = User::where('email',$request->input('email'))->whereNot('email',$user->email)->first();
        if($check)
            return $this->failResponse([
                'errors' => ['error' => ['This E-Mail Already Exist']],
            ]);
        $data = $request->safe(['name', 'email', 'password']);
        if($request->input('password')){
            $user -> update([
                'name' => $data['name'],
                'email' => $data['email'],
                'password' => Hash::make($data['password']),
            ]);
        }else {
            $user -> update([
                'name' => $data['name'],
                'email' => $data['email'],
            ]);
        }
        DB::table('model_has_roles')->where('model_id',$user->id)->delete();
        if  ($request->input('role') === 'admin'){
            $user->assignRole(Role::findByName(Roles::ADMIN, 'api'));
        }
        elseif ($request->input('role') === 'user'){
            $user->assignRole(Role::findByName(Roles::USER, 'api'));
        }
        else {
            $user->assignRole(Role::findByName(Roles::USER, 'api'));
        }
        if ($request->file('avatar'))
            $this->storeUserAvatar($request->file('avatar'), $user->id);
        if($user) {
            return $this->successResponse([
                'errors' => ['error' => ['User Updated']],
            ]);
        }
        return $this->failResponse();
    }
    public function deleteUserByAdmin(User $user)
    {
        if (Auth::user()->getRoleNames()[0] !== Roles::ADMIN) {
            return $this->failResponse([], 403);
        }
        if (isset(($user->media)))
            $this->deleteMedia($user->media);
        if($user->delete()) {
            return $this->successResponse([
                'errors' => ['error' => ['User Deleted']],
            ]);
        }
        return $this->failResponse();
    }
}
