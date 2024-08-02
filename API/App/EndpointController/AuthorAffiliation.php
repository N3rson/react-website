<?php
 
namespace App\EndpointController;
use \App\REQUEST as REQUEST;
use \App\ClientError as ClientError;
/**
 * AuthorAffiliation Class
 *
 * This class extends the Endpoint class to handle requests related to author affiliations. It processes GET requests
 * to retrieve author affiliation information from the database. The class allows filtering by content ID and country 
 * through query parameters. It constructs an SQL query based on the provided parameters and executes it to fetch the 
 * required data.
 * 
 * @author Karol Fryc W21030911
 */
class AuthorAffiliation extends Endpoint
{
    protected $allowedParams = ["content", "country"];
    private $sql = "SELECT ROW_NUMBER() OVER (ORDER BY author.name) AS Row_number,
                    author.id AS 'authorID', 
                    author.name AS 'authorName', 
                    content.id AS 'contentID', 
                    content.title AS 'contentName', 
                    affiliation.country AS 'country', 
                    affiliation.city AS 'city', 
                    affiliation.institution AS 'institution'
                    FROM affiliation
                    JOIN author on (affiliation.author = author.id)
                    JOIN content on (affiliation.content = content.id)";

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
                break;    
        }   
        parent::__construct($data);
    }

    private function buildSQL()
    {
        $where = false;

        if (isset(REQUEST::params()['content'])) 
        {
            if (!is_numeric(REQUEST::params()['content'])) {
                throw new ClientError(422);
            }
            if(count(REQUEST::params()) >1){
                throw new ClientError(422);
            }
            $this->sql .= " WHERE content.id = :contentID";
            $this->sqlParams[":contentID"] = REQUEST::params()['content'];
        }

        if (isset(REQUEST::params()['country'])) 
        {
            $this->sql .= ($where) ? " AND" : " WHERE";
            $where = true;
            $this->sql .= " affiliation.country LIKE :country";
            $this->sqlParams[':country'] = REQUEST::params()['country'];
        }
    }
}