<?php
/**
 * Created by PhpStorm.
 * User: lakroubassi.n
 * Date: 28/10/2016
 * Time: 11:35
 */

$app->get('/url','getUrl');
function getUrl() {
    global $db;
    $rows = $db->selectComplex("select id_url, description_url , link_url from gestion_url ");
    echoResponse(200, $rows);
};

$app->get('/urlUser/:id_user','getUrlUser');
function getUrlUser($id_user) {
    global $db;
    $rows = $db->selectComplex("select id_url from gestion_user_url
                                where id_user = $id_user");
    echoResponse(200, $rows);
};

$app->put('/urlUser/:id_user', 'putUrlUser');
function putUrlUser($id_user){
    global $app, $db, $rows;

    $data = json_decode($app->request()->getBody());

    foreach($data->urlDataOrigin as $key => $value){
        $value->id_user = $id_user;
        $rows['urlDataOrigin'][$key] = $db->delete('gestion_user_url',$value);
    }

    foreach($data->urlDataSelected as $key => $value){
        $value->id_user = $id_user;
        $rows['urlDataSelected'][$key] = $db->insert('gestion_user_url',$value, array());
    }

//    $rows = $db->delete(gestion_user_url, )
    echoResponse(200, $rows);

};