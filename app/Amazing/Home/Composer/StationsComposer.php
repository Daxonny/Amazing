<?php
namespace App\Amazing\Home\Composer;

use Illuminate\View\View;

class StationsComposer {
    public function compose(View $view) {
        $data = json_decode(file_get_contents('stations.json'));
        //dd($data);

        $view->with('datas', $data);
    }
}

