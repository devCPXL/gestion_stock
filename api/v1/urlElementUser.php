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