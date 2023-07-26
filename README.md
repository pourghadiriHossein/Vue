# Develop Server Side, Write User and Post API

## Create CreatePostRequest File
- ### Command
```bash
php artisan make:request CreatePostRequest
```
- ### authorize
```bash
public function authorize(): bool
{
    return true;
}
```
- ### rules
```bash
return [
    'title' => 'required|max:250',
    'description' => 'required|max:10000',
    'image' => 'image',
    'latitude' => 'required|numeric|min:-90|max:90',
    'longitude' => 'required|numeric|min:-180|max:180',
];
```
## Create CreateUserRequest File
- ### Command
```bash
php artisan make:request CreateUserRequest
```
- ### authorize
```bash
public function authorize(): bool
{
    return true;
}
```
- ### rules
```bash
return [
    'name' => 'required|min:3|max:100',
    'email' => 'required|email',
    'password' => ['required', 'max:100',
    Password::min(4)->letters()->mixedCase()->numbers()->symbols()->uncompromised()],
    'avatar' => 'required',
];
```
## Create UpdatePostRequest File
- ### Command
```bash
php artisan make:request UpdatePostRequest
```
- ### authorize
```bash
public function authorize(): bool
{
    return true;
}
```
- ### rules
```bash
if ($this->file('image')){
    return [
        'title' => 'required|max:250',
        'description' => 'required|max:10000',
        'image' => 'image',
        'latitude' => 'required|numeric|min:-90|max:90',
        'longitude' => 'required|numeric|min:-180|max:180',
    ];
}else{
    return [
        'title' => 'required|max:250',
        'description' => 'required|max:10000',
        'latitude' => 'required|numeric|min:-90|max:90',
        'longitude' => 'required|numeric|min:-180|max:180',
    ];
}
```
## Create UpdateUserRequest File
- ### Command
```bash
php artisan make:request UpdateUserRequest
```
- ### authorize
```bash
public function authorize(): bool
{
    return true;
}
```
- ### rules
```bash
if ($this->input('password')){
    if ($this->file('avatar')){
        return [
            'name' => 'required|min:3|max:100',
            'email' => 'required|email',
            'password' => ['required', 'max:100',
            Password::min(4)->letters()->mixedCase()->numbers()->symbols()->uncompromised()],
            'avatar' => 'required',
        ];
    }else{
        return [
            'name' => 'required|min:3|max:100',
            'email' => 'required|email',
            'password' => ['required', 'max:100',
            Password::min(4)->letters()->mixedCase()->numbers()->symbols()->uncompromised()],
        ];
    }

}else{
    if ($this->file('avatar')){
        return [
            'name' => 'required|min:3|max:100',
            'email' => 'required|email',
            'avatar' => 'required',
        ];
    }else{
        return [
            'name' => 'required|min:3|max:100',
            'email' => 'required|email',
        ];
    }
}
```
## Post Controller
- ### Create PostController Command
```bash
php artisan make:controller PostController
```
- ### Write All Posts For Dashboard Function
```bash
public function allPostsForDashboard()
{
    if (Auth::guest()) {
        return $this->failResponse([], 403);
    }
    $query = Post::query()
    ->select([
        'id',
        'user_id',
        'title',
        'description',
        'up_vote_count',
        DB::raw('ST_X(location::geometry) AS latitude'),
        DB::raw('ST_Y(location::geometry) AS longitude')
        ])
    ->with('media')
    ->with('user')
    ->orderBy('up_vote_count', 'desc');

    $posts = $query->paginate()->all();
    return $posts;
}
```
- ### Write Like Post Function
```bash
public function likePost(Post $post) {
    if (Auth::guest()) {
        return $this->failResponse([], 403);
    }
    $upVote = UpVote::where('user_id', Auth::id())
        ->where('post_id', $post->id)
        ->first();
    if($upVote) {
        $upVote->delete();
        return $this->successResponse(['message' => 'Post like removed', 'vote' => -1]);
    }else {
        $upVote = new UpVote();
        $upVote->user()->associate(Auth::id());
        $upVote->post()->associate($post->id);
        $upVote->save();
        return $this->successResponse(['message' => 'Post like added', 'vote' => 1]);
    }
}
```
- ### Write My Posts Function
```bash
public function myPosts()
{
    if (Auth::guest()) {
        return $this->failResponse([], 403);
    }
    $query = Post::query()
    ->select([
        'id',
        'title',
        'description',
        'up_vote_count',
        DB::raw('ST_X(location::geometry) AS latitude'),
        DB::raw('ST_Y(location::geometry) AS longitude')
        ])
    ->with('media')
    ->orderBy('id', 'desc')
    ->where('user_id', '=', Auth::id());

    $posts = $query->paginate(5);
    return $this->paginatedSuccessResponse($posts, 'posts');
}
```
- ### Write Create Post Function
```bash
public function createPost(CreatePostRequest $request)
{
    if (Auth::guest()) {
        return $this->failResponse([], 403);
    }
    $data = $request->safe(['title', 'description', 'latitude', 'longitude']);
    $post = new Post([
        'title' => $data['title'],
        'description' => $data['description'],
        'location' => DB::raw("ST_GeomFromText('Point(".$data['latitude']." ".$data['longitude'].")', 4326)")
    ]);
    $post->user()->associate(Auth::id());
    $post->save();
    $this->storePostMedia($request->file('image'), $post->id, Auth::id());
    if($post) {
        return $this->successResponse([
            'errors' => ['error' => ['Post Created']],
        ]);
    }
    return $this->failResponse();
}
```
- ### Write Update My Post Function
```bash
public function updateMyPost(UpdatePostRequest $request, Post $post)
{
    if (Auth::guest()) {
        return $this->failResponse([], 403);
    }
    if ($post->user->id !== Auth::id()) {
        return $this->failResponse([], 403);
    }
    $data = $request->safe(['title', 'description', 'latitude', 'longitude']);
    $post->update([
        'title' => $data['title'],
        'description' => $data['description'],
        'location' => DB::raw("ST_GeomFromText('Point(".$data['latitude']." ".$data['longitude'].")', 4326)")
    ]);
    if($request->file('image')) {
        $this->storePostMedia($request->file('image'), $post->id, Auth::id());
    }
    return $this->successResponse([
        'errors' => ['error' => ['Post Updated']],
    ]);
}
```
- ### Write Delete My Post Function
```bash
public function deleteMyPost(Post $post)
{
    if (Auth::guest()) {
        return $this->failResponse([], 403);
    }
    if ($post->user->id !== Auth::id()) {
        return $this->failResponse([], 403);
    }
    if ($post->media)
        $this->deleteMedia($post->media);
    if($post->delete()) {
        return $this->successResponse([
            'errors' => ['error' => ['Post Deleted']],
        ]);
    }
    return $this->failResponse();
}
```
- ### Write All Posts For Admin Function
```bash
public function allPostsForAdmin() {
    if (Auth::guest()) {
        return $this->failResponse([], 403);
    }
    if (Auth::user()->getRoleNames()[0] !== Roles::ADMIN) {
        return $this->failResponse([], 403);
    }
    $query = Post::query()
    ->select([
        'id',
        'user_id',
        'title',
        'description',
        DB::raw('ST_X(location::geometry) AS latitude'),
        DB::raw('ST_Y(location::geometry) AS longitude')
        ])
        ->with('media')
        ->orderBy('id', 'desc')
        ->with('user');

    $posts = $query->paginate(5);
    return $this->paginatedSuccessResponse($posts, 'posts');
}
```
- ### Write Update Post By Admin Function
```bash
public function updatePostByAdmin(UpdatePostRequest $request, Post $post)
{
    if (Auth::guest()) {
        return $this->failResponse([], 403);
    }
    if (Auth::user()->getRoleNames()[0] !== Roles::ADMIN) {
        return $this->failResponse([], 403);
    }
    $data = $request->safe(['title', 'description', 'latitude', 'longitude']);
    $post->update([
        'title' => $data['title'],
        'description' => $data['description'],
        'location' => DB::raw("ST_GeomFromText('Point(".$data['latitude']." ".$data['longitude'].")', 4326)")
    ]);
    if($request->file('image')) {
        $this->storePostMedia($request->file('image'), $post->id, $post->user_id);
    }
    return $this->successResponse([
        'errors' => ['error' => ['Post Updated']],
    ]);
}
```
- ### Write Delete Post By Admin Function
```bash
public function deletePostByAdmin(Post $post)
{
    if (Auth::guest()) {
        return $this->failResponse([], 403);
    }
    if (Auth::user()->getRoleNames()[0] !== Roles::ADMIN) {
        return $this->failResponse([], 403);
    }
    if ($post->media)
        $this->deleteMedia($post->media);
    if($post->delete()) {
        return $this->successResponse([
            'errors' => ['error' => ['Post Deleted']],
        ]);
    }
    return $this->failResponse();
}
```
## User Controller
- ### Create UserController Command
```bash
php artisan make:controller UserController
```
- ### Write Register Function
```bash
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
```
- ### Write Profile Function
```bash
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
```
- ### Write Update My Profile Function
```bash
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
```
- ### Write All Users Function
```bash
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
```
- ### Write Create User By Admin Function
```bash
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
```
- ### Write Update User By Admin Function
```bash
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
```
- ### Write Delete User By Admin
```bash
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
```
## In routes, Update api.php File
```bash
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
```

