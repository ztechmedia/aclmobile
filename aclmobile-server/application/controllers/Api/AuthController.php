<?php
defined('BASEPATH') or exit('No direct script access allowed');

require APPPATH . '/libraries/CreatorJWT.php';
require APPPATH . '/controllers/Resources/ShipmentResources.php';

class AuthController extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model('BasicModel', 'BM');
        $this->BM->myConstruct('master');
        $this->jwt = new CreatorJWT();
        $this->resources = new ShipmentResources();
    }

    /*
        $request = ['phone', 'password']
    */
    public function login()
    {
        $request = fileGetContent();
        $user = $this->BM->getWhere('users_rider', ['phone' => $request->phone])->row();

        if(!$user) {
            response(['error' => 'No telpon belum terdaftar'], 404);
        }

        if (!password_verify($request->password, $user->password)) {
            response(['error' => 'Password tidak cocok'], 400);
        }
        
        $rider = $this->BM->getWhere('kurir', ['phone' => $user->phone])->row();
        $tokenData = $this->resources->Rider($rider);
        $jwtToken = $this->jwt->GenerateToken($tokenData);
        response([
            'token' => $jwtToken,
            'user' => $tokenData,
        ]);
    }

    public function me()
    {
        $receivedToken = $this->input->request_headers('Authorization');

        if(!array_key_exists("Authorization", $receivedToken)) {
            response(["status" => false, "message" => "Token bermasalah"], 400);
        }
        
        try {
            $jwtData = $this->jwt->DecodeToken($receivedToken['Token']);
            response($jwtData);
        } catch (Exception $e) {
            response([
                'status' => false,
                'message' => $e->getMessage(),
            ], 400);
            exit;
        }
    }

    /*
        $request = ['phone']
    */
    public function checkPhone()
    {
        $request = fileGetContent();
        $rider = $this->BM->getWhere('kurir', ['Phone' => $request->phone])->row();
        if (!$rider) {
            response(['error' => 'Nomor telpon tidak ditemukan'], 404);
        }

        response(['rider' => $this->resources->Rider($rider)]);
    }

    /*
        $request = ['phone']
    */
    public function createDriverPassword()
    {
        $request = fileGetContent();
        $user = $this->BM->getWhere('users_rider', ['phone' => $request->phone])->row();

        if($user) response(['error' => 'Nomor telpon sudah terdaftar'], 400);

        $data = [
            'phone' => $request->phone,
            'password' => password_hash('123456', PASSWORD_BCRYPT)
        ];

        $user = $this->BM->create('users_rider', $data);
        response([
            'message' => 'Akun driver berhasil dibuat, Password: 123456',
            'success' => true
        ], 200);
    }
}