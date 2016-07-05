<?php
/**
 * Created by PhpStorm.
 * User: lakroubassi.n
 * Date: 23/06/2015
 * Time: 16:15
 */

// === Batiments ================================================================================= //

$app->get('/batiments', 'getBatiments');
function getBatiments(){
    global $db;
    $rows = $db->select("gestion_batiment","id_batiment, nom, description_f,
                                            DATE_FORMAT(dt_update,'%d-%m-%Y %H:%i') as dt_update,
                                            DATE_FORMAT(dt_creation,'%d-%m-%Y %H:%i') as dt_creation",array());
    echoResponse(200, $rows);
};

$app->post('/batiments', 'postBatiments');
function postBatiments(){
    global $app;
    $data = json_decode($app->request()->getBody());
    $mandatory = array();
    global $db;
    $rows = $db->insert("gestion_batiment", $data, $mandatory);
    if($rows["status"]=="success"){
        $rows["message"] = "Batiment added successfully.";
        $rows["dt_creation"] = date("d-m-Y H:i");
    }
    echoResponse(200, $rows);
};

$app->put('/batiments/:id', 'putBatiments');
function putBatiments($id){
    global $app;
    $data = json_decode($app->request()->getBody());
    unset($data->save);
    unset($data->dt_creation);

    $condition = array('id_batiment'=>$id);
    $mandatory = array();
    global $db;
    $rows = $db->update("gestion_batiment", $data, $condition, $mandatory);
    if($rows["status"]=="success"){
        $rows["message"] = "Batiment information updated successfully.";
    }
    echoResponse(200, $rows);
};