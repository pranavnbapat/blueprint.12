<?php

//use App\Mail\ForgotPasswordMail;
//use Illuminate\Support\Facades\Mail;

Route::get('/', 'frontend\HomeC@index');
Route::get('about', 'frontend\AboutC@index');
Route::get('contact', 'frontend\ContactC@index');
Route::post('contact/submit', 'frontend\ContactC@submit');
Route::get('artists', 'frontend\ArtistsC@index');
Route::get('artists/{artist_name}', 'frontend\ArtistsC@artist_info');
Route::get('artists/{artist_name}/viewing-room', 'frontend\ArtistsC@viewing_room');
Route::get('exhibitions', 'frontend\ExhibitionsC@index');
Route::get('exhibitions/{year}', 'frontend\ExhibitionsC@index');
Route::get('exhibitions/{year}/{exhibition}', 'frontend\ExhibitionsC@index');
Route::get('art-fairs', 'frontend\ArtFairsC@index');
Route::get('art-fairs/{year}', 'frontend\ArtFairsC@index');
Route::get('art-fairs/{year}/{art_fair}', 'frontend\ArtFairsC@index');
Route::get('platform', 'frontend\PlatformC@index');
Route::get('platform/{artist_name}', 'frontend\PlatformC@index');
//Route::get('platform/{platform_name}', 'frontend\PlatformC@index');

Auth::routes();

Route::get('logout', '\App\Http\Controllers\Auth\LoginController@logout');

Route::prefix('admin')->group(function () {
    Route::group(['middleware' => ['auth']], function () {
        Route::get('my-profile', 'admin\MyProfileC@index');
        Route::post('my-profile/change-password', 'admin\MyProfileC@change_password');
        Route::post('my-profile/change-profile-photo', 'admin\MyProfileC@change_profile_photo');

        Route::get('dashboard', 'admin\DashboardC@index');

        Route::get('about', 'admin\AboutC@index');
        Route::get('about/{id}', 'admin\AboutC@index');
        Route::post('about/insert', 'admin\AboutC@insert');
        Route::post('about/update', 'admin\AboutC@insert');

        Route::get('homepage', 'admin\HomepageC@index');
        Route::get('homepage/{id}', 'admin\HomepageC@index');
        Route::post('homepage/insert', 'admin\HomepageC@insert');
        Route::post('homepage/update', 'admin\HomepageC@insert');

        Route::get('seo', 'admin\SEOC@index');
        Route::get('seo/{id}', 'admin\SEOC@index');
        Route::post('seo/insert', 'admin\SEOC@insert');
        Route::post('seo/update', 'admin\SEOC@insert');

        Route::get('artists', 'admin\ArtistsC@index');
        Route::get('artists/{id}', 'admin\ArtistsC@index');
        Route::post('artists/insert', 'admin\ArtistsC@insert');
        Route::post('artists/update', 'admin\ArtistsC@insert');
        Route::get('artists/upload-images/{id}', 'admin\ArtistsC@upload_images');
        Route::post('artists/upload-images', 'admin\ArtistsC@upload_images');
        Route::get('artists/upload-images/update/{id}', 'admin\ArtistsC@upload_images_update');
        Route::post('artists/upload-images/update', 'admin\ArtistsC@upload_images_update');
        Route::post('artists/delete-artist-image', 'admin\ArtistsC@delete_images');
        Route::post('artists/upload-images/viewing-room', 'admin\ArtistsC@viewing_room');

        Route::get('exhibitions', 'admin\ExhibitionsC@index');
        Route::get('exhibitions/{id}', 'admin\ExhibitionsC@index');
        Route::post('exhibitions/insert', 'admin\ExhibitionsC@insert');
        Route::post('exhibitions/update', 'admin\ExhibitionsC@insert');
        Route::get('exhibitions/upload-images/{id}', 'admin\ExhibitionsC@upload_images');
        Route::post('exhibitions/upload-images', 'admin\ExhibitionsC@upload_images');
        Route::get('exhibitions/upload-images/update/{id}', 'admin\ExhibitionsC@upload_images_update');
        Route::post('exhibitions/upload-images/update', 'admin\ExhibitionsC@upload_images_update');
        Route::post('exhibitions/delete-exhibition-image', 'admin\ExhibitionsC@delete_images');

        Route::get('art-fairs', 'admin\ArtFairsC@index');
        Route::get('art-fairs/{id}', 'admin\ArtFairsC@index');
        Route::post('art-fairs/insert', 'admin\ArtFairsC@insert');
        Route::post('art-fairs/update', 'admin\ArtFairsC@insert');
        Route::get('art-fairs/upload-images/{id}', 'admin\ArtFairsC@upload_images');
        Route::post('art-fairs/upload-images', 'admin\ArtFairsC@upload_images');
        Route::get('art-fairs/upload-images/update/{id}', 'admin\ArtFairsC@upload_images_update');
        Route::post('art-fairs/upload-images/update', 'admin\ArtFairsC@upload_images_update');
        Route::post('art-fairs/delete-art-fair-image', 'admin\ArtFairsC@delete_images');

        Route::get('platform', 'admin\PlatformC@index');
        Route::get('platform/{id}', 'admin\PlatformC@index');
        Route::post('platform/insert', 'admin\PlatformC@insert');
        Route::post('platform/update', 'admin\PlatformC@insert');
        Route::get('platform/upload-images/{id}', 'admin\PlatformC@upload_images');
        Route::post('platform/upload-images', 'admin\PlatformC@upload_images');
        Route::get('platform/upload-images/update/{id}', 'admin\PlatformC@upload_images_update');
        Route::post('platform/upload-images/update', 'admin\PlatformC@upload_images_update');
        Route::post('platform/delete-platform-image', 'admin\PlatformC@delete_images');

        Route::get('contact', 'admin\ContactC@index');
        Route::get('contact/{id}', 'admin\ContactC@index');
        Route::post('contact/insert', 'admin\ContactC@insert');
        Route::post('contact/update', 'admin\ContactC@insert');

        Route::post('change_status', 'admin\AjaxC@change_status');
        Route::post('delete', 'admin\AjaxC@delete');
    });
});

Route::get('/forgot-password', 'admin\PasswordC@forgot_password');
Route::post('/forgot-password', 'admin\PasswordC@forgot_password');
Route::get('/reset-password/{token}', 'admin\PasswordC@reset_password');
