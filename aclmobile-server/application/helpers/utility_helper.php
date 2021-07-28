<?php

function toJson($data)
{
    echo json_encode($data);
    die();
}

function response($data, $statusCode = 200)
{
    header('Content-Type:application/json');
    http_response_code($statusCode);
    echo json_encode($data);
    die();
}

function fileGetContent()
{
    $json = file_get_contents("php://input");
    $obj = json_decode($json);
    return $obj;
}

function getPost()
{
    $ci = &get_instance();
    $posts = $ci->input->post();
    $form = [];
    foreach ($posts as $post => $value) {
        $form[$post] = $value;
    }
    return $form;
}

function statusList($segment) {
    $status = [
        'all' => [],
        'attemp' => ['ATTEMP DELIVERY'],
        'failed' => ['FAILED DELIVERY'],
        'canceled' => ['CANCELED'],
        'finish' => ['DOCUMENT RECEIVED'],
    ];
    return $status[$segment];
}

function toMonth($m)
{
    $m = intval($m);
    $month = [
        "1" => "Januari",
        "2" => "Februari",
        "3" => "Maret",
        "4" => "April",
        "5" => "Mei",
        "6" => "Juni",
        "7" => "Juli",
        "8" => "Agustus",
        "9" => "September",
        "10" => "Oktober",
        "11" => "November",
        "12" => "Desember",
    ];

    return $month[$m];
}

function indoDayname($number)
{
    $days = [
        "Mon" => "Senin",
        "Tue" => "Selasa",
        "Wed" => "Rabu",
        "Thu" => "Kamis",
        "Fri" => "Jumat",
        "Sat" => "Sabtu",
        "Sun" => "Minggu",
    ];
    return $days[$number];
}

function toIndoDate($date)
{
    $date = explode("-", $date);
    $month = toMonth($date[1]);
    return $date[2] . " " . $month . " " . $date[0];
}

function toIndoDatetime($date)
{
    $dayName = indoDayname(date("D", strtotime($date)));
    $date = explode("-", $date);
    $month = toMonth($date[1]);
    return $dayName . ", " . $date[2] . " " . $month . " " . $date[0];
}

function revDate($date)
{
    $date = explode("-", $date);
    return "$date[2]-$date[1]-$date[0]";
}

function asset($url)
{
    return base_url("assets/$url");
}

function dd($var)
{
    echo "<pre>";
    var_dump($var);
    die();
    echo "</pre>";
}