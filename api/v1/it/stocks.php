<?php
/**
 * Created by PhpStorm.
 * User: lakroubassi.n
 * Date: 11/10/2016
 * Time: 16:05
 */

// =========== stocksMaterials ============================================ //
$app->get('/printers','getPrinters');
function getPrinters() {
    global $db;
    $constant = 'constant';
    $rows = $db->selectComplex("
        SELECT ga.id_article, ga.nom, ga.code_barre, ga.description_f, ga.id_family, ga.mark, ga.vat, ga.unite, gf.code,
        gf.description as name_family, gs.id_stock, gs.id_location, gs.id_article as gs_id_article, gs.quantite_current,
        gs.stock_alert, gs.stock_min, gs.type_stock, gs.status, gl.description_f as name_location
        FROM gestion_stock gs
        LEFT JOIN gestion_article ga
            ON ga.id_article = gs.id_article AND gs.type_stock = 'TOOL'
        LEFT JOIN gestion_family gf
            ON gf.id_family = ga.id_family
        LEFT JOIN gestion_location gl
            ON gl.id_location = gs.id_location
        WHERE ga.id_service = 17
        AND ga.id_family in (48,49)
        AND gl.id_location = 90
        ORDER BY ga.nom
    ");

    echoResponse(200, $rows);
};