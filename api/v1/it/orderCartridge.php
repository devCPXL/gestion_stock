<?php
/**
 * Created by PhpStorm.
 * User: lakroubassi.n
 * Date: 2/09/2016
 * Time: 16:11
 */

// =========== stocksMaterials ============================================ //
$app->get('/orderCartridge','getOrderCartridge');
function getOrderCartridge() {
    global $db;
    $rows = $db->selectComplex("
        SELECT goc.* , cag.nom as fName, cag.prenom as lName,
                gar.id_article, gar.nom as name_article, gar.code_barre, gar.description_f as description_article, gar.mark, gar.type_article,
                cc.label_F as name_service
        FROM gestion_order_cartridge goc
        LEFT JOIN cpas_agents cag ON goc.id_agent = cag.id_agent
        LEFT JOIN gestion_stock cst ON cst.id_stock = goc.id_stock
        LEFT JOIN gestion_article gar ON gar.id_article = cst.id_article
        LEFT JOIN cpas_services cc ON cc.id_ser = goc.id_service
        ORDER BY goc.date_created DESC
    ");

    echoResponse(200, $rows);
};

// =========== stocksMaterials ============================================ //

$app->get('/stocksCartridges/:id_location/:id_stock','getStocksCartridges');
function getStocksCartridges($id_location, $id_article) {
    global $db;
    $rows = $db->selectComplex("
        SELECT gs.id_stock, gs.id_article as gs_id_article, gs.id_location, gs.quantite_current, gs.stock_alert, gs.stock_min, gs.type_stock, gs.status,
        ga.id_article, ga.nom, ga.code_barre, ga.description_f, ga.id_family, ga.mark, ga.vat, ga.unite, ga.price, ga.type_article
        FROM gestion_stock gs
            LEFT JOIN gestion_article ga
                ON ga.id_article = gs.id_article
        WHERE ga.id_service = 17
        AND gs.type_stock = 'MATERIAL'
        AND gs.id_location = $id_location
        AND ga.id_family = 46
        AND ga.type_article like '%$id_article%'
    ");

    echoResponse(200, $rows);
};
