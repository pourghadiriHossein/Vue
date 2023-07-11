# Develop Server Side, Write Necessary Function in Controller

## In server/Http/Controllers, Update Controller.php File
- ### Add Paginated Success Response Function
```bash
function paginatedSuccessResponse($data, $name) {
    return response()->json(
        [
            'status' => 'success',
            $name => $data->items(),
            'meta' => [
                'pagination' => [
                    $name => [
                        'last_item' => $data->lastItem(),
                        'first_item' => $data->firstItem(),
                        'last_page' => $data->lastPage(),
                        'per_page' => $data->perPage(),
                        'current_page' => $data->currentPage(),
                        'total' => $data->total()
                    ]
                ]
            ]
        ]
    );
}
```
- ### Add Success Response Function
```bash
function successResponse($data = [], $code = 200) {
    return response()->json(
        array_merge([
            'message' => 'Your Request Successed',
        ], $data),
        $code
    );
}
```
- ### Add Fail Response Function
```bash
function failResponse($data = [], $code = 504) {
    return response()->json(
        array_merge([
            'message' => 'Your Request Failed',
        ], $data),
        $code
    );
}
```
- ### Add Delete Media Function
```bash
function deleteMedia($media) {
    if($media) {
        foreach ($media as $file) {
            File::delete($file->url);
            $file->delete();
        }
    }
    return back();
}
```
- ### Add Store Post Media Function
```bash
function storePostMedia($file, $model_id , $user_id) {
    $post = Post::where('id', $model_id)->with('media')->first();
    if (isset($post->media)) {
        $this->deleteMedia($post->media);
    }
    $name = Carbon::now()->getTimestamp().'.'.$file->extension();
    $file->storePubliclyAs('public/media/', $name);
    $media = new Media([
        'size' => $file->getSize(),
        'mime_type' => $file->getMimeType(),
        'url' => 'storage/media/'.$name
    ]);
    $media->user()->associate($user_id);
    $media->save();

    $post = Post::find($model_id);
    $post->media()->sync($media, [ 'create_at' => Carbon::now() ]);
    $post->save();
    return back();
}
```
- ### Add Store User Avatar Function
```bash
function storeUserAvatar($file, $model_id) {
    $user = User::where('id', $model_id)->with('media')->first();
    if (isset($user->media)) {
        $this->deleteMedia($user->media);
    }
    $name = Carbon::now()->getTimestamp().'.'.$file->extension();
    $file->storePubliclyAs('public/media/', $name);
    $media = new Media([
        'size' => $file->getSize(),
        'mime_type' => $file->getMimeType(),
        'url' => 'storage/media/'.$name
    ]);
    $media->user()->associate($model_id);
    $media->save();

    $user = User::find($model_id);
    $user->media()->sync($media, [ 'create_at' => Carbon::now()]);
    $user->save();
    return back();
}
```

