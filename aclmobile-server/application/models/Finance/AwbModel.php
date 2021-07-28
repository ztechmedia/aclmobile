<?php
defined('BASEPATH') or exit('No direct script access allowed');

class AwbModel extends CI_Model
{
    public function __construct()
    {
        parent::__construct();
        $this->db = $this->load->database('finance', true);
        $this->wms = $this->load->database('wms', true);
    }

    public function getShipmentByDate($request, $status = [])
    {
        $date = date('Y-m-d', strtotime($request->date));
        $startIndex = ($request->page - 1) * 10;

        if($request->page == 1) {
        //Query for total filtered awb
        $this->db->where('Rider', $request->rider);
        $this->db->where('AWB_Date', $date);
        if(count($status) !== 0) $this->db->where_in('AWB_Status', $status);
        $total = $this->db->count_all_results('awb'); 
        
        $endIndex = $request->page * 10;
        $next = $endIndex < $total ? true : false;
        } else {
            $total = $request->total;
        }

        //Query to get list of awb
        $this->db->select('ID, AWB_No, Location, Account_Name, Origin, Destination, Consignee_Name, 
                            Transport, Type_Transport, AWB_Status, AWB_Date');
        $this->db->from('awb');
        $this->db->where('Rider', $request->rider);
        $this->db->where('AWB_Date', $date);
        if(count($status) !== 0) $this->db->where_in('AWB_Status', $status);
        $this->db->limit(10, $startIndex);
        $list = $this->db->get()->result();

        return [
            'total' => $total,
            'total_awb' => count($list),
            'next' => $next,
            'list' => $list
        ];
    }

    public function getShipmentByMonth($request, $status = [])
    {
        $startIndex = ($request->page - 1) * 10;
        
        if($request->page == 1) {
            //Query for total filtered awb
            $this->db->where('Rider', $request->rider);
            $this->db->where('YEAR(AWB_Date)', $request->year);
            $this->db->where('MONTH(AWB_Date)', $request->month);
            if(count($status) !== 0) $this->db->where_in('AWB_Status', $status);
            $total = $this->db->count_all_results('awb'); 
        } else {
            $total = $request->total;
        }
        
        $endIndex = $request->page * 10;
        $next = $endIndex < $total ? $request->page + 1 : false;

        //Query to get list of awb
        $this->db->select('ID, AWB_No, Location, Account_Name, Origin, Destination, Consignee_Name, 
                            Transport, Type_Transport, AWB_Status, AWB_Date');
        $this->db->from('awb');
        $this->db->where('Rider', $request->rider);
        $this->db->where('YEAR(AWB_Date)', $request->year);
        $this->db->where('MONTH(AWB_Date)', $request->month);
        if(count($status) !== 0) $this->db->where_in('AWB_Status', $status);
        $this->db->limit(10, $startIndex);
        $list = $this->db->get()->result();

        return [
            'total' => $total,
            'total_awb' => count($list),
            'next' => $next,
            'list' => $list
        ];
    }

    public function getOutgoings($awbNumber)
    {
        return $this->wms
            ->select('ID, Task_ID, Customer_Name, Consignee_Name, Destination, Consignee_Addr, 
                        Container_Police_No, Outgoing_Date, Status_Delivery, AWB_Reasons, 
                        Foto_AWB, Status_Delivery, LatLong')
            ->from('outgoing')
            ->where('AWB_No', $awbNumber)
            ->get()
            ->result();
    }

    public function getTotalShipmentByStatus($rider, $status = [])
    {
        $this->db->where('Rider', $rider);
        $this->db->where_in('AWB_Status', $status);
        return $this->db->count_all_results('awb');
    }
}
