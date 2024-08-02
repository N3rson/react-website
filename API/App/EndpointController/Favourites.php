<?php
namespace App\EndpointController;
/**
 * Favourites Class
 *
 * This class extends the Endpoint class to manage the 'favourites' API endpoint. It handles user favorites 
 * for content items, including operations to retrieve, add, and delete favorites. The class requires user 
 * authentication and performs token validation to ensure that the user is authorized to access and modify 
 * their favorites.
 * 
 * @author Karol Fryc W21030911
 */
class Favourites extends Endpoint 
{
    public function __construct()
    {
        $id = $this->validateToken();

        $this->checkUserExists($id);
        
        switch(\App\Request::method()) 
        {
            case 'GET':
                $data = $this->getFavourites($id);
                break;
            case 'POST':
                $data = $this->postFavourites($id);
                break;
            case 'DELETE':
                $data = $this->deleteFavourites($id);
                break;
            default:
                throw new \App\ClientError(405);
                break;
        }
        parent::__construct($data);
    }

    private function getFavourites($id)
    {
        $dbConn = new \App\Database(USER_DATABASE);
        $sql = "SELECT content_id FROM favourites WHERE user_id = :id";
        $sqlParams = [':id' => $id];
        $data = $dbConn->executeSQL($sql, $sqlParams);
        return $data;
    }

    private function postFavourites($id)
    {
        if (!isset(\App\REQUEST::params()['content_id']))
        {
            throw new \App\ClientError(422);
        }
        
        $content_id = \App\REQUEST::params()['content_id'];

        if (!is_numeric($content_id))
        {
            throw new \App\ClientError(422);
        }
    
        $dbConn = new \App\Database(USER_DATABASE);

        $sqlParams = [':id' => $id, 'content_id' => $content_id];
        $sql = "SELECT * FROM favourites WHERE user_id = :id AND content_id = :content_id";
        $data = $dbConn->executeSQL($sql, $sqlParams);

        if(count($data) === 0) {
            $sql = "INSERT INTO favourites (user_id, content_id) VALUES (:id, :content_id)";
            $data = $dbConn->executeSQL($sql, $sqlParams);
        }
        return [];
    }

    private function deleteFavourites($id)
    {
        if (!isset(\App\REQUEST::params()['content_id']))
        {
            throw new \App\ClientError(422);
        }
        
        $content_id = \App\REQUEST::params()['content_id'];
 
 
        if (!is_numeric($content_id))
        {
            throw new \App\ClientError(422);
        }
 
        $dbConn = new \App\Database(USER_DATABASE);
        $sql = "DELETE FROM favourites WHERE user_id = :id AND content_id = :content_id";
        $sqlParams = [':id' => $id, 'content_id' => $content_id];
        $data = $dbConn->executeSQL($sql, $sqlParams);
        return $data;
    }

    private function validateToken()
    {

    $key = SECRET;
    $jwt = \App\REQUEST::getBearerToken();

    try {
        $decodedJWT = \Firebase\JWT\JWT::decode($jwt, new \Firebase\JWT\Key($key, 'HS256'));
        } catch (\Exception $e) {
            throw new \App\ClientError(401);
        }

    if (!isset($decodedJWT->exp) || !isset($decodedJWT->id)) { 
            throw new \App\ClientError(401);
        }

    if ($decodedJWT->exp < time()) {
        throw new \App\ClientError(401);
        }

    return $decodedJWT->id;
    }

    private function checkUserExists($id)
    {
        $dbConn = new \App\Database(USER_DATABASE);
        $sql = "SELECT id FROM account WHERE id = :id";
        $sqlParams = [':id' => $id];
        $data = $dbConn->executeSQL($sql, $sqlParams);
        if (count($data) != 1) {
            throw new \App\ClientError(401);
        }
    }
}