<?php

namespace App;

/**
 * Request Class
 *
 * This abstract class provides utility methods for extracting information about the HTTP request. 
 * It offers methods to determine the request method (GET, POST, etc.), the endpoint name, request parameters, 
 * and to retrieve the Bearer token from the Authorization header.
 * 
 * @author Karol Fryc W21030911
 */
abstract class Request 
{
    public static function method()
    {
        return $_SERVER['REQUEST_METHOD'];
    }
 
    public static function endpointName()
    {
        $url = $_SERVER["REQUEST_URI"];
        $path = parse_url($url)['path'];
        return str_replace(BASEPATH, "", $path);
    }
 
    public static function params()
    {
        return $_REQUEST;
    }
    
    public static function getBearerToken()
    {
        $allHeaders = getallheaders();
        $authorizationHeader = "";

        if (array_key_exists('Authorization', $allHeaders)) {
            $authorizationHeader = $allHeaders['Authorization'];
            } elseif (array_key_exists('authorization', $allHeaders)) {
                $authorizationHeader = $allHeaders['authorization'];
            }

        if (substr($authorizationHeader, 0, 7) != 'Bearer ') {
            throw new \App\ClientError(401);
            }

        return trim(substr($authorizationHeader, 7));
    }
}