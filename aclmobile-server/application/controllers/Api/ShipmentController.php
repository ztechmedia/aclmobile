<?php
defined('BASEPATH') or exit('No direct script access allowed');

require APPPATH . '/libraries/CreatorJWT.php';
require APPPATH . '/controllers/Resources/ShipmentResources.php';

class ShipmentController extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        //Model
        $this->load->model('Finance/AwbModel', 'AWB');
        $this->load->model('BasicModel', 'FBM');
        $this->FBM->myConstruct('finance');
        $this->load->model('BasicModel', 'WBM');
        $this->WBM->myConstruct('wms');

        //Check For Token
        $this->jwt = new CreatorJWT();
        $this->jwt->checkToken($this->input->request_headers('authorization'));

        $this->resources = new ShipmentResources();
    }

    /*
    $request = ['awbNumber']
     */
    public function getShipmentByAwb()
    {
        $request = fileGetContent();
        $shipment = $this->FBM->getWhere("awb", ['AWB_No' => $request->awbNumber])->row();

        if (!$shipment) {
            response([
                'error' => 'No Awb tidak terdaftar',
            ], 404);
        }

        response([
            'shipment' => $this->resources->AwbAdvance($shipment),
        ]);
    }

    /*
    $request = ['rider', 'date', 'status']
     */
    public function getShipmentByDate()
    {
        $request = fileGetContent();
        $shipments = $this->AWB->getShipmentByDate($request, statusList($request->status));
        $awb = count($shipments['list']) > 0 ? $this->resources->AwbCollections($shipments['list']) : [];
        response([
            'total' => $shipments['total'],
            'total_awb' => $shipments['total_awb'],
            'next' => $shipments['next'],
            'shipments' => $awb,
        ]);
    }

    /*
    $request = ['rider', 'status', 'year', 'month']
     */
    public function getShipmentByMonth()
    {
        $request = fileGetContent();
        $shipments = $this->AWB->getShipmentByMonth($request, statusList($request->status));
        $awb = count($shipments['list']) > 0 ? $this->resources->AwbCollections($shipments['list']) : [];
        response([
            'total' => $shipments['total'],
            'total_awb' => $shipments['total_awb'],
            'next' => $shipments['next'],
            'shipments' => $awb,
        ]);
    }

    /*
    $request = ['rider', 'status', 'year', 'month']
     */
    public function getOutgoings()
    {
        $request = fileGetContent();
        $outgoings = $this->AWB->getOutgoings($request->awbNumber);
        $lists = count($outgoings) > 0 ? $outgoings : [];
        response([
            'outgoings' => $this->resources->OutgoingCollections($lists),
        ]);
    }

    /*
    $request = ['id', 'status']
     */
    public function changeShipmentStatus()
    {
        $request = fileGetContent();
        $data = [
            'AWB_Status' => $request->status,
        ];

        $awb = $this->FBM->update('awb', 'AWB_No', $request->awbNumber, $data);
        response([
            'awb' => $this->resources->Awb($awb),
        ]);
    }

    /*
    $request = ['id', 'status', 'reason]
     */
    public function changeShipmentStatusWithReason()
    {
        $request = fileGetContent();
        $awbNumber = $request->awbNumber;
        $taskId = $request->taskId;
        $status = $request->status;
        $reason = $request->reason;
        $rider = $request->rider;

        $awb = $this->FBM->getWhere('awb', ['AWB_No' => $awbNumber])->row();
        $history = $awb->AWB_Status_History;
        if (!$history) {
            $history[] = [
                'Task_ID' => $taskId,
                'AWB_Status' => $status,
                'Reason' => $reason,
                'Change_On' => toIndoDatetime(date('Y-m-d')),
                'Change_By' => $rider,
            ];
        } else {
            $history = unserialize($history);
            array_push($history, [
                'Task_ID' => $taskId,
                'AWB_Status' => $status,
                'Reason' => $reason,
                'Change_On' => toIndoDatetime(date('Y-m-d')),
                'Change_By' => $rider,
            ]);
        }

        $awbData = [ 'AWB_Status_History' => serialize($history) ];
        $outgoingData = [ 'AWB_Reasons' => $reason ];

        $awb = $this->FBM->update('awb', 'AWB_No', $awbNumber, $awbData);
        $outgoing = $this->WBM->update('outgoing', 'Task_ID', $taskId, $outgoingData);
        
        response([
            'awb' => $this->resources->AwbAdvance($awb),
            'outgoing' => $this->resources->Outgoing($outgoing),
        ]);
    }

    /*
    $request = ['id']
    $file = Selected File
     */
    public function uploadDocument()
    {
        $request = getPost();
        $file = $_FILES['photo']['name'];
        if ($file) {
            $imgFileName = $this->uploadImage($request['id'], $file);
            if ($imgFileName) {
                $data = [
                    'Foto_AWB' => $imgFileName,
                    'Status_Delivery' => 'DELIVERY',
                    'LatLong' => $request['location'],
                    "AWB_Reasons" => '',
                ];

                $outgoing = $this->WBM->updateById('outgoing', $request['id'], $data);

                $checkAll = $this->WBM->getLimit('outgoing', 
                    [
                        'AWB_No' => $outgoing->AWB_No, 
                        'Status_Delivery !=' => 'DELIVERY'
                    ], 1)->row();

                if(!$checkAll) {
                    $awb['AWB_Status'] = 'RECEIVED';
                    $this->FBM->update('awb', 'AWB_No', $outgoing->AWB_No, $awb);
                }

                response([
                    'outgoing' => $this->resources->Outgoing($outgoing),
                ]);
            }
        }
    }

    public function uploadImage($id, $file)
    {
        //IMG
        $fileExt = pathinfo($file, PATHINFO_EXTENSION);
        $config['upload_path'] = './assets/shipments/images';
        $config['allowed_types'] = 'jpg|jpeg|png|ico';
        $config['overwrite'] = true;
        $config['file_name'] = $id . '.' . $fileExt;
        $this->load->library('upload', $config);

        if (!$this->upload->do_upload("photo")) {
            response(['errors' => $this->upload->display_errors()]);
        } else {
            $uploadImg = $this->upload->data();
            $this->resizeImage($uploadImg['file_name']);
            return $uploadImg['file_name'];
        }
    }

    public function resizeImage($filename)
    {
        $source_path = $_SERVER['DOCUMENT_ROOT'] . '/assets/shipments/images/' . $filename;
        $target_path = $_SERVER['DOCUMENT_ROOT'] . '/assets/shipments/thumbnails/';
        $config_manip = array(
            'image_library' => 'gd2',
            'source_image' => $source_path,
            'new_image' => $target_path,
            'maintain_ratio' => true,
            'create_thumb' => true,
            'overwrite' => true,
            'thumb_marker' => '_thumb',
            'width' => 150,
            'height' => 150,
        );

        $this->load->library('image_lib', $config_manip);
        if (!$this->image_lib->resize()) {
            response(['errors' => $this->image_lib->display_errors()]);
        }

        $this->image_lib->clear();
    }

    public function riderPerformance()
    {
        $request = fileGetContent();
        $data = [
            'Shipment_Finish' => $this->AWB->getTotalShipmentByStatus($request->rider, statusList('finish')),
            'Shipment_Canceled' => $this->AWB->getTotalShipmentByStatus($request->rider, statusList('canceled')),
            'Shipment_Failed' => $this->AWB->getTotalShipmentByStatus($request->rider, statusList('failed')),
        ];
        response(['performance' => $data]);
    }
}
