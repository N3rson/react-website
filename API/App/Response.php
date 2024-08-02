<?php

namespace App;

/**
 * Response Class
 *
 * This class is designed to manage HTTP responses for the API. It sets necessary headers and outputs 
 * data in JSON format. The constructor automatically calls a method to set the common headers for 
 * JSON content type and CORS (Cross-Origin Resource Sharing) permissions.
 * 
 * @author Karol Fryc W21030911
 */
class Response 
{

    public function __construct() {		
        $this->outputHeaders();

        if (Request::method() == "OPTIONS") {
            exit();
        }
    }

    private function outputHeaders() {
        header('Content-Type: application/json');
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE');
        header('Access-Control-Allow-Headers: Authorization');
    }
    public function outputJSON($data) {
        if(empty($data)){
            http_response_code(204);
        }
        echo json_encode($data);
    }
}