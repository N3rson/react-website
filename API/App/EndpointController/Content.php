<?php

namespace App\EndpointController;
use \App\REQUEST as REQUEST;
use \App\ClientError as ClientError;
/**
 * Content Class
 *
 * This class extends the Endpoint class to manage the 'content' API endpoint. It handles GET requests to retrieve
 * content data, including details like title, abstract, type, and awards from the database. The class allows
 * optional filtering by content type and pagination through query parameters 'type' and 'page'.
 * 
 * @author Karol Fryc W21030911
 */
class Content extends Endpoint
{
    protected $allowedParams = ["type", "page"];
    private $sql = "SELECT ROW_NUMBER() OVER (ORDER BY content.title) AS Row_number,
                    content.id, 
                    content.title, 
                    content.abstract, 
                    type.name AS 'type',
                    IFNULL(award.name, 'No awards') AS 'award'
                    FROM content
                    JOIN type ON (content.type = type.id)
                    LEFT JOIN content_has_award ON (content.id = content_has_award.content)
                    LEFT JOIN award ON (content_has_award.award = award.id)";

    private $sqlParams = [];
    private $limit = 20;
    private $offset = 0;

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

        if (isset(REQUEST::params()['type'])) 
        {
            $this->sql .= " WHERE type.name LIKE :type";
            $this->sqlParams[":type"] = REQUEST::params()['type'];
        }

        

        if (isset(REQUEST::params()['page'])) 
        {
            if (!is_numeric(REQUEST::params()['page'])) {
                throw new ClientError(422);
            }
            $this->offset = (REQUEST::params()['page'] - 1)* $this->limit;
            $this->sql .= " LIMIT :limit";
            $this->sqlParams[":limit"] = $this->limit;
            $this->sql .= " OFFSET :offset";
            $this->sqlParams[":offset"] = $this->offset;
        }
    }
}