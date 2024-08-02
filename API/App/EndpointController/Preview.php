<?php
 
 namespace App\EndpointController;
/**
 * Preview Class
 *
 * This class extends the Endpoint class to handle the 'preview' API endpoint. It processes GET requests to
 * retrieve a random selection of content previews, including titles and preview video URLs, from the database.
 * The class allows an optional 'limit' parameter to control the number of preview items returned.
 * 
 * @author Karol Fryc W21030911
 */
 use \App\REQUEST as REQUEST;
 use \App\ClientError as ClientError;

class Preview extends Endpoint
{
    protected $allowedParams = ["limit"];
    private $sql = "SELECT title, preview_video 
                    FROM content
                    WHERE preview_video NOT NULL
                    ORDER BY random()";

    private $sqlParams = [];

    public function __construct()
    {
        switch(REQUEST::method()){
            case 'GET':
                $this->checkAllowedParams();
                $this->buildSQL();
                $dbConn = new \App\Database(CHI_DATABASE);
                $data = $dbConn->executeSQL($this->sql, $this->sqlParams);
                break;
          default:
            throw new ClientError(405);    
        }   
        parent::__construct($data);
    }
    private function buildSQL()
    {
        if (isset(REQUEST::params()['limit'])) 
        {
            if (!is_numeric(REQUEST::params()['limit'])) {
                throw new ClientError(422);
            }
            $this->sql .= " LIMIT :limit";
            $this->sqlParams[":limit"] = REQUEST::params()['limit'];
        }
    }
}