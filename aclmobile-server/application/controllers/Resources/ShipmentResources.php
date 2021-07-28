<?php
defined('BASEPATH') or exit('No direct script access allowed');

class ShipmentResources
{
    public static function Rider($rider)
    {
        return [
            'Rider_ID' => $rider->Rider_ID,
            'Rider_Name' => $rider->Rider_Name,
            'Phone' => $rider->Phone,
            'Status' => $rider->Status,
            'Type_SIM' => $rider->Type_SIM,
            'Status_Karyawan' => $rider->Status_Karyawan,
        ];
    }

    public static function Awb($awb)
    {
        return [
            'ID' => $awb->ID,
            'AWB_No' => $awb->AWB_No,
            'Location' => $awb->Location,
            'Account_Name' => $awb->Account_Name,
            'Origin' => $awb->Origin,
            'Destination' => $awb->Destination,
            'Consignee_Name' => $awb->Consignee_Name,
            'Transport' => $awb->Transport,
            'Type_Transport' => $awb->Type_Transport,
            'AWB_Status' => $awb->AWB_Status,
            'AWB_Status_History' => $awb->AWB_Status_History ? unserialize($awb->AWB_Status_History) : false,
            'AWB_Date' => revDate($awb->AWB_Date)
        ];
    }

    public static function AwbAdvance($awb)
    {
        return [
            'ID' => $awb->ID,
            'AWB_No' => $awb->AWB_No,
            "Account_ID" => $awb->Account_ID,
            "Location" => $awb->Location,
            'Account_Name' => $awb->Account_Name,
            'Origin' => $awb->Origin,
            'Destination' => $awb->Destination,
            'Sender_Name' => $awb->Sender_Name,
            'Sender_Address' => $awb->Sender_Address,
            'Sender_Phone' => $awb->Sender_Phone,
            'Pickup_From' => $awb->Pickup_From,
            'Pickup_Address' => $awb->Pickup_Address,
            'Pickup_PIC' => $awb->Pickup_PIC,
            'Pickup_Phone' => $awb->Pickup_Phone,
            'Consignee_Name' => $awb->Consignee_Name,
            'Consignee_Addr' => $awb->Consignee_Addr,
            'Consignee_Phone' => $awb->Consignee_Phone,
            'Product_Services' => $awb->Product_Services,
            'Transport' => $awb->Transport,
            'Type_Services' => $awb->Type_Services,
            'Type_Transport' => $awb->Type_Transport,
            'typeload' => $awb->typeload,
            'Kilo' => $awb->Kilo,
            'Koli' => $awb->Koli,
            'AWB_Status' => $awb->AWB_Status,
            'AWB_Status_History' => $awb->AWB_Status_History ? array_reverse(unserialize($awb->AWB_Status_History)) : false,
            'AWB_Date' => revDate($awb->AWB_Date),
        ];
    }

    public static function AwbCollections($awbs)
    {
        $shipments = array();
        foreach ($awbs as $awb) {
            $shipments[] = [
                'ID' => $awb->ID,
                'AWB_No' => $awb->AWB_No,
                'Location' => $awb->Location,
                'Account_Name' => $awb->Account_Name,
                'Origin' => $awb->Origin,
                'Destination' => $awb->Destination,
                'Consignee_Name' => $awb->Consignee_Name,
                'Transport' => $awb->Transport,
                'Type_Transport' => $awb->Type_Transport,
                'AWB_Status' => $awb->AWB_Status,
                'AWB_Date' => revDate($awb->AWB_Date)
            ];
        }

        return $shipments;
    }

    public static function Outgoing($outgoing)
    {
        return [
            'ID' => $outgoing->ID,
            'Task_ID' => $outgoing->Task_ID,
            'Customer_Name' => $outgoing->Customer_Name,
            'Consignee_Name' => $outgoing->Consignee_Name,
            'Destination' => $outgoing->Destination,
            'Consignee_Addr' => $outgoing->Consignee_Addr,
            'Container_Police_No' => $outgoing->Container_Police_No,
            'Outgoing_Date' => $outgoing->Outgoing_Date,
            'Status_Delivery' => $outgoing->Status_Delivery,
            'LatLong' => $outgoing->LatLong,
            'AWB_Reasons' => $outgoing->AWB_Reasons,
            'Foto_AWB' => $outgoing->Foto_AWB,
        ];
    }

    public function OutgoingCollections($outgoings)
    {
        $do = [];
        foreach ($outgoings as $outgoing) {
            $do[] = [
                'ID' => $outgoing->ID,
                'Task_ID' => $outgoing->Task_ID,
                'Customer_Name' => $outgoing->Customer_Name,
                'Consignee_Name' => $outgoing->Consignee_Name,
                'Destination' => $outgoing->Destination,
                'Consignee_Addr' => $outgoing->Consignee_Addr,
                'Container_Police_No' => $outgoing->Container_Police_No,
                'Outgoing_Date' => $outgoing->Outgoing_Date,
                'Status_Delivery' => $outgoing->Status_Delivery,
                'LatLong' => $outgoing->LatLong,
                'AWB_Reasons' => $outgoing->AWB_Reasons,
                'Foto_AWB' => $outgoing->Foto_AWB,
            ];
        }

        return $do;
    }
}
