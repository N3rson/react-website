<?php

namespace App;
/**
 * Database Class
 *
 * This class is responsible for managing the database connection and executing SQL queries. 
 * It encapsulates the details of connecting to the database and provides a method to execute 
 * SQL queries with optional parameters.
 * 
 * @author Karol Fryc W21030911
 */
class Database 
{
    private $dbConnection;
  
    public function __construct($dbName) 
    {
        $this->setDbConnection($dbName);  
    }
 
    private function setDbConnection($dbName) 
    {
        $this->dbConnection = new \PDO('sqlite:'.$dbName);
        $this->dbConnection->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
    }
    
    public function executeSQL($sql, $params=[])
    { 
        $stmt = $this->dbConnection->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }
}