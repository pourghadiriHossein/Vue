<?php

namespace App\Http\Controllers;

use App\Enum\Roles;
use App\Http\Requests\CreatePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Models\Post;
use App\Models\UpVote;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class PostController extends Controller
{
//dashboard
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
//my post
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
//all posts
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
}
