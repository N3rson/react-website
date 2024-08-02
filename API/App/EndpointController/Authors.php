<?php

namespace App\EndpointController;
use \App\REQUEST as REQUEST;
use \App\ClientError as ClientError;
/**
 * Authors Class
 *
 * This class extends the Endpoint class to manage the 'authors' API endpoint. It processes GET requests 
 * to retrieve a list of authors and their associated awards from the database. The SQL query fetches 
 * author names and any awards they may have received. In case an author has not received any awards, 
 * 'No awards' is returned as a default value.
 * 
 * @author Karol Fryc W21030911
 */
class Authors extends Endpoint
{
private $sql = "SELECT author.name AS 'name', IFNULL(award.name, 'No awards') AS 'award'
FROM author
LEFT JOIN content_has_author on author.id = content_has_author.author
LEFT JOIN content_has_award on content_has_author.content = content_has_award.content
LEFT JOIN award on content_has_award.award = award.id
GROUP BY author.name";
private $sqlParams = [];

public function __construct()
    {
        switch(REQUEST::method()){
            case 'GET':
                $dbConn = new \App\Database(CHI_DATABASE);
                $data = $dbConn->executeSQL($this->sql, $this->sqlParams);
                break;
            default:
                throw new ClientError(405);    
        }   
                parent::__construct($data);
    }

}