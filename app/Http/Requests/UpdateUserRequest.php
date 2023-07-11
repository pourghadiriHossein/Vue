<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class UpdateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
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
    }
}
