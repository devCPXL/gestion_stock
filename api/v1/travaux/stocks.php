<?php
/**
 * Created by PhpStorm.
 * User: lakroubassi.n
 * Date: 3/08/2015
 * Time: 13:37
 */


// =========== stocksMaterials ============================================ //
$app->get('/stocksMaterials/:id_service/:id_location','getStocksMaterials');
function getStocksMaterials($id_service, $id_location) {
    global $db;
    $constant = 'constant';
    $rows = $db->selectComplex("
        SELECT gs.id_stock, gs.id_location, gs.id_article as gs_id_article, gs.quantite_current,
        gs.stock_alert, gs.stock_min, gs.type_stock, gs.status , ga.id_article, ga.nom, ga.code_barre,
        ga.description_f, ga.id_family, ga.mark, ga.vat, ga.unite, ga.price, ga.type_article,
        gl.description_f as name_location, gf.description as name_family, ga.name_supplier
        FROM gestion_stock gs
            LEFT JOIN (
            SELECT gestion_article.*, gestion_Suppliers.name as name_supplier FROM gestion_article
				LEFT JOIN gestion_stock
					on gestion_article.id_article = gestion_stock.id_article
				LEFT JOIN gestion_Suppliers
					on gestion_Suppliers.id_supplier = gestion_stock.id_location
				where gestion_stock.type_stock = 'SUPPLIER'
				AND gestion_article.id_service = $id_service
            )ga
                ON ga.id_article = gs.id_article
            LEFT JOIN gestion_location gl
                ON gl.id_location = gs.id_location
            LEFT JOIN gestion_family gf
                ON gf.id_family = ga.id_family
        WHERE ga.id_service = $id_service
            AND gs.type_stock = 'MATERIAL'
            AND gs.id_location = $id_location
    ");

    echoResponse(200, $rows);
};


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


// === Get Movements Stock TRAVAUX ===================================================== //

$app->get('/movementsStock/:id_stock', 'getMovementsStock');
function getMovementsStock($id)
{
    global $db;
    $condition = array('from_id_stock' => $id);
    $rows = $db->selectComplex("
        SELECT
            gsm.id_mvt,
            gsm.from_id_stock,
            gsm.to_id_stock,
            gsm.further_information,
            DATE_FORMAT(gsm.dt_creation,'%d-%m-%Y %H:%i ')  as dt_creation,
            DATE_FORMAT(gsm.date_mvt,'%d %M %Y')            as date_mvt,
            gsm.type_mvt,
            gsm.quantite,

            g_location.description_f   as nameStock_from ,
            g_location_t.description_f   as nameStock_to ,
            g_sup.name,
            g_location_s.description_f  as nameStock_to_s

		FROM gestion_stock_mvt_x gsm

            left join gestion_stock gs_f            on gs_f.id_stock = gsm.from_id_stock  and gsm.type_mvt = 'INTERNAL'
            left join gestion_location g_location   on g_location.id_location = gs_f.id_location

            left join gestion_stock gs_t            on gs_t.id_stock = gsm.to_id_stock    and gsm.type_mvt = 'INTERNAL'
            left join gestion_location g_location_t on g_location_t.id_location = gs_t.id_location

            left join gestion_stock gss             on gss.id_stock = gsm.from_id_stock   and gsm.type_mvt = 'DELIVERY'
            left join gestion_Suppliers g_sup       on g_sup.id_supplier = gss.id_location

            left join gestion_stock gs_ts           on gs_ts.id_stock = gsm.to_id_stock   and gsm.type_mvt = 'DELIVERY'
            left join gestion_location g_location_s on g_location_s.id_location = gs_ts.id_location

        WHERE gsm.from_id_stock = $id
        OR gsm.to_id_stock = $id
        Order By gsm.dt_creation ASC
    ");
    echoResponse(200, $rows);
};

// === Get Last Movements Stock TRAVAUX ===================================================== //
$app->get('/lastMvtStockTravaux/:id_service', 'getLastMvtStockTravaux');
function getLastMvtStockTravaux($id_service)
{
    global $db;

    $rows = $db->selectComplex("
        SELECT
            gsm.id_mvt,
            gsm.from_id_stock,
            gsm.to_id_stock,
            gsm.further_information,
            DATE_FORMAT(gsm.dt_creation,'%d-%m-%Y %H:%i ')  as dt_creation,
            DATE_FORMAT(gsm.date_mvt,'%d %M %Y')            as date_mvt,
            gsm.type_mvt,
            gsm.quantite,

            g_location.description_f   as nameStock_from ,
            g_location_t.description_f   as nameStock_to,
            ga.nom as name_article,
            ga.code_barre as reference_article

		FROM gestion_stock_mvt_x gsm

            left join gestion_stock gs_f            on gs_f.id_stock = gsm.from_id_stock  and gsm.type_mvt = 'INTERNAL'
            left join gestion_location g_location   on g_location.id_location = gs_f.id_location

            left join gestion_stock gs_t            on gs_t.id_stock = gsm.to_id_stock    and gsm.type_mvt = 'INTERNAL'
            left join gestion_location g_location_t on g_location_t.id_location = gs_t.id_location

            LEFT JOIN gestion_article ga            on ga.id_article = gs_f.id_article

        WHERE gs_f.type_stock = 'MATERIAL'
        AND gs_f.id_service = $id_service
        Order By gsm.dt_creation DESC
        LIMIT 100
    ");
    echoResponse(200, $rows);
};

// ====== Get Suppliers Mouvements ====================================== //
$app->get('/movementSupplier/:id_service/:id_stock', 'getMovementSupplier');
function getMovementSupplier($id_service, $id_stock)
{
    global $db;
    $rows = $db->selectComplex("
    SELECT  gsm.id_mvt,	gsm.from_id_stock,	gsm.to_id_stock,
        DATE_FORMAT(gsm.dt_creation,'%d-%m-%Y %H:%i ') as dt_creation,
        DATE_FORMAT(gsm.date_mvt,'%d %M %Y') as date_mvt,
        DATE_FORMAT(gsm.date_order,'%d %M %Y') as date_order,
        gsm.type_mvt,
        gsm.quantite,
        TRUNCATE(gsm.price,2) as price,
        gsm.purchase_order,
        gsm.pack_carton,
        gsm.further_information,
        ga.nom as nom_article,
        gsup.name as name_supplier
        FROM gestion_stock_mvt_x gsm
        -- retrive name article
        LEFT JOIN gestion_stock gs on gs.id_stock = gsm.to_id_stock
        LEFT JOIN gestion_article ga on ga.id_article = gs.id_article
        -- retrive name Suppliers
        LEFT JOIN gestion_stock gss on gss.id_stock = gsm.from_id_stock
        LEFT JOIN gestion_Suppliers gsup on gsup.id_supplier = gss.id_location
        WHERE gsm.type_mvt = 'DELIVERY'
        AND gsm.to_id_stock = $id_stock
        AND gs.id_service = $id_service
        ORDER BY gsm.date_mvt DESC"
    );
    echoResponse(200, $rows);
}
