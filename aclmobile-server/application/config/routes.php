<?php
defined('BASEPATH') OR exit('No direct script access allowed');

$route['default_controller'] = '';
$route['404_override'] = '';
$route['translate_uri_dashes'] = FALSE;

/*
    Auth Route
*/
$route['api/v1/auth/login'] = 'Api/AuthController/login';
$route['api/v1/auth/me'] = 'Api/AuthController/me';
$route['api/v1/auth/check-phone'] = 'Api/AuthController/checkPhone';
$route['api/v1/auth/create-driver-password'] = 'Api/AuthController/createDriverPassword';

/*
    Shipment Route
*/
$route['api/v1/shipment/rider-performance'] = 'Api/ShipmentController/riderPerformance';
$route['api/v1/shipment/outgoings'] = 'Api/ShipmentController/getOutgoings';
$route['api/v1/shipment/by-date'] = 'Api/ShipmentController/getShipmentByDate';
$route['api/v1/shipment/by-month'] = 'Api/ShipmentController/getShipmentByMonth';
$route['api/v1/shipment/by-awb'] = 'Api/ShipmentController/getShipmentByAwb';
$route['api/v1/shipment/change-status'] = 'Api/ShipmentController/changeShipmentStatus';
$route['api/v1/shipment/change-status-with-reason'] = 'Api/ShipmentController/changeShipmentStatusWithReason';
$route['api/v1/shipment/upload-document'] = 'Api/ShipmentController/uploadDocument';