<?php

namespace App\EndpointController;
use \App\REQUEST as REQUEST;
use \App\ClientError as ClientError;
/**
 * Country Class
 *
 * This class extends the Endpoint class and is responsible for handling the 'country' API endpoint. 
 * It processes GET requests to retrieve a list of countries and their associated cities from the database. 
 * The SQL query used in this class groups cities by their respective countries and orders them alphabetically. 
 * 
 * @author Karol Fryc W21030911
 */
class Country extends Endpoint
{
    private $sql = "SELECT
    country,
    GROUP_CONCAT(city, ', ') AS cities
FROM (
    SELECT
        country,
        city
    FROM (
        SELECT DISTINCT
            country,
            city
        FROM affiliation
    ) AS subquery
    ORDER BY country, city
) AS orderedCities
GROUP BY country
ORDER BY country";
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