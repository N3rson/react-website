<?php

namespace App\EndpointController;
use \App\REQUEST as REQUEST;
use \App\ClientError as ClientError;
/** 
 * Developer class
 *
 * Class containing info about developer.
 *
 * @author Karol Fryc W21030911
 */ 
class Developer extends Endpoint 
{
    public function __construct()
    {
      switch(REQUEST::method()){
        case 'GET':
            $data['code'] = "W21030911";
            $data['name'] = "Karol Fryc";
            break;
          default:
            throw new ClientError(405);    
      }   
      parent::__construct($data);
    }
}