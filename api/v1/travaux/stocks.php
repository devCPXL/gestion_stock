<?php
/**
 * Created by PhpStorm.
 * User: lakroubassi.n
 * Date: 3/08/2015
 * Time: 13:37
 */


// =========== stocksMaterials ============================================ //
$app->get('/stocksMaterials/:id_location','getStocksMaterials');
function getStocksMaterials($id_location) {
    global $db;
    $constant = 'constant';
    $rows = $db->selectComplex("
        SELECT gs.id_stock, gs.id_location, gs.id_article as gs_id_article, gs.quantite_current,
        gs.stock_alert, gs.stock_min, gs.type_stock, gs.status , ga.id_article, ga.nom, ga.code_barre,
        ga.description_f, ga.id_family, ga.mark, ga.vat, ga.unite, CONCAT(ga.price, ' €') as price, ga.type_article,
        gl.description_f as name_location, gf.description as name_family, ga.name_supplier
        FROM gestion_stock gs
            LEFT JOIN (
            SELECT gestion_article.*, gestion_Suppliers.name as name_supplier FROM gestion_article
				LEFT JOIN gestion_stock
					on gestion_article.id_article = gestion_stock.id_article
				LEFT JOIN gestion_Suppliers
					on gestion_Suppliers.id_supplier = gestion_stock.id_location
				where gestion_stock.type_stock = 'SUPPLIER'
				AND gestion_article.id_service = {$constant('TRAVAUX_SERVICE')}
            )ga
                ON ga.id_article = gs.id_article
            LEFT JOIN gestion_location gl
                ON gl.id_location = gs.id_location
            LEFT JOIN gestion_family gf
                ON gf.id_family = ga.id_family
        WHERE ga.id_service = {$constant('TRAVAUX_SERVICE')}
            AND gs.type_stock = 'MATERIAL'
            AND gs.id_location = $id_location
    ");

    echoResponse(200, $rows);
};

/** TODO : add column in gestion_stock 'id_supplier' */


// =========== Stock Materials for Location ============================================== //

//$app->get('/stocksMaterials/:id_location','getStocksMaterials');
//function getStocksMaterials($id_location) {
//    global $db;
//    $constant = 'constant';
//    $rows = $db->selectComplex("
//        SELECT gs.id_stock, gs.id_location, gs.id_article as gs_id_article, gs.quantite_current,
//        gs.stock_alert, gs.stock_min, gs.type_stock, gs.status , ga.id_article, ga.nom, ga.code_barre,
//        ga.description_f, ga.id_family, ga.mark, ga.vat, ga.unite, CONCAT(ga.price, ' €') as price, ga.type_article,
//        gl.description_f as name_location, gf.description as name_family
//        FROM gestion_stock gs
//            LEFT JOIN gestion_article ga
//                ON ga.id_article = gs.id_article
//            LEFT JOIN gestion_location gl
//                ON gl.id_location = gs.id_location
//            LEFT JOIN gestion_family gf
//                ON gf.id_family = ga.id_family
//        WHERE ga.id_service = {$constant('TRAVAUX_SERVICE')}
//            AND gs.type_stock = 'MATERIAL'
//            AND gs.id_location = $id_location
//    ");
//
//    echoResponse(200, $rows);
//};



