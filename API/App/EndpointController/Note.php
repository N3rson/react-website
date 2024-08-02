<?php
namespace App\EndpointController;
/**
 * Note Class
 *
 * This class extends the Endpoint class to handle the 'note' API endpoint. It allows authenticated users
 * to create, retrieve, and delete personal notes associated with specific content items. The class 
 * requires user authentication and checks the validity of the user's token.
 * 
 * @author Karol Fryc W21030911
 */
class Note extends Endpoint 
{
    public function __construct()
    {
        $id = $this->validateToken();
        
        $this->checkUserExists($id);
 
        switch(\App\Request::method()) 
        {
            case 'GET':
                $data = $this->getNote($id);
                break;
            case 'POST':
                $data = $this->postNote($id);
                break;
            case 'DELETE':
                $data = $this->deleteNote($id);
                break;
            default:
                throw new \App\ClientError(405);
                break;
        }
        parent::__construct($data);
    }

    private function note() 
    {
        if (!isset(\App\REQUEST::params()['note']))
        {
            throw new \App\ClientError(422);
        }
 
        if (mb_strlen(\App\REQUEST::params()['note']) > 255)
        {
            throw new \App\ClientError(422);
        }
 
       $note = \App\REQUEST::params()['note'];
       return htmlspecialchars($note);
    }

    private function getNote($id)
    {
        if (isset(\App\REQUEST::params()['content_id']))
        {
            $content_id = \App\REQUEST::params()['content_id'];
 
            if (!is_numeric($content_id))
            {
                throw new \App\ClientError(422);
            }
 
            $sql = "SELECT * FROM notes WHERE user_id = :id AND content_id = :content_id";
            $sqlParams = [':id' => $id, 'content_id' => $content_id];
        } else {
            $sql = "SELECT * FROM notes WHERE user_id = :id";
            $sqlParams = [':id' => $id];
        }
 
        $dbConn = new \App\Database(USER_DATABASE);
        
        $data = $dbConn->executeSQL($sql, $sqlParams);
        return $data;
    }
 
    private function postNote($id)
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
 
        $note = $this->note();
 
        $dbConn = new \App\Database(USER_DATABASE);
 
        $sqlParams = [':id' => $id, 'content_id' => $content_id];
        $sql = "SELECT * FROM notes WHERE user_id = :id AND content_id = :content_id";
        $data = $dbConn->executeSQL($sql, $sqlParams);
 
        if (count($data) === 0) {
            $sql = "INSERT INTO notes (user_id, content_id, note) VALUES (:id, :content_id, :note)";
        } else {
            $sql = "UPDATE notes SET note = :note WHERE user_id = :id AND content_id = :content_id";
        }
 
        $sqlParams = [':id' => $id, 'content_id' => $content_id, 'note' => $note];
        $data = $dbConn->executeSQL($sql, $sqlParams);
     
        return [];
    }

    private function deleteNote($id)
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
        $sql = "DELETE FROM notes WHERE user_id = :id AND content_id = :content_id";
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