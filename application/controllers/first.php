<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class First extends CI_Controller {

    public function index()
    {
 $this->load->view('hello_view');
    }


    function about($id)
    {
        $data['name'] = "Виктор";
        $data['surname'] = "Доценко";
        $data['age'] = "24"; //Возраст
    $this->load->view('about_view', $data);
        if ($id = 1)
        {
            echo 'Параметр';
        }
    }
}