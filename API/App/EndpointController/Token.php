<?php

namespace App\EndpointController;
use \App\REQUEST as REQUEST;
use \App\ClientError as ClientError;
/**
 * Issue Token to Authenticated Users
 *
 * This class will check a username and password against those held in the 
 * database. Where authentication is successful it will return a JWT.
 *
 * @author Karol Fryc W21030911
 */
class Token extends Endpoint
{

    private $sql = "SELECT id, password FROM account WHERE email = :email";
    private $sqlParams = [];

    public function __construct() {
 
        switch(REQUEST::method()) 
        {
            case 'GET':
            case 'POST':
                $this->checkAllowedParams();
                $dbConn = new \App\Database(USER_DATABASE);
                
                if (!isset($_SERVER['PHP_AUTH_USER']) || !isset($_SERVER['PHP_AUTH_PW'])) {
                    throw new ClientError(401);
                }
                if (empty(trim($_SERVER['PHP_AUTH_USER'])) || empty(trim($_SERVER['PHP_AUTH_PW']))) {
                    throw new ClientError(401);
                }
                
                $this->sqlParams[":email"] = $_SERVER['PHP_AUTH_USER'];
                $data = $dbConn->executeSQL($this->sql, $this->sqlParams);

                if (count($data) != 1) {
                    throw new ClientError(401);
                }

                if (!password_verify($_SERVER['PHP_AUTH_PW'], $data[0]['password'])) {
                    throw new ClientError(401);
                }

                $token = $this->generateJWT($data[0]['id']);        
                $data = ['token' => $token];

                parent::__construct($data);
                break;
            default:
                throw new ClientError(405);
                break;
        }
    }
    private function generateJWT($id) { 

        $secretKey = SECRET;
        $iat = time();
        $exp = strtotime('+30 minutes', $iat);
        $iss = $_SERVER['HTTP_HOST'];
        $payload = [
            'id' => $id,
            'iat' => $iat,
            'exp' => $exp,
            'iss' => $iss
        ];
            
        $jwt = \Firebase\JWT\JWT::encode($payload, $secretKey, 'HS256');
        
        return $jwt;
      }
}