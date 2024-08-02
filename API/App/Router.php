<?php
 
namespace App;
 /**
 * Router Class
 *
 * This abstract class is responsible for routing incoming API requests to their respective endpoint controllers. 
 *
 * @author Karol Fryc W21030911
 */
abstract class Router
{
    public static function routeRequest()
    {
        try
        {
         switch(Request::endpointName()) {
            case '/':
            case '/developer':
            case '/developer/':
                $endpoint = new EndpointController\Developer();
                break;
            case '/country':
            case '/country/':
                $endpoint = new EndpointController\Country();
                break;
            case '/preview':
            case '/preview/':
                $endpoint = new EndpointController\Preview();
                break;
            case '/author-and-affiliation':
            case '/author-and-affiliation/':
                $endpoint = new EndpointController\AuthorAffiliation();
                break;
            case '/content':
            case '/content/':
                $endpoint = new EndpointController\Content();
                break;
            case '/token':
            case '/token/':
                $endpoint = new EndpointController\Token();
                break;
            case '/favourites':
            case '/favourites/':
                $endpoint = new EndpointController\Favourites();
                break;    
            case '/note':
            case '/note/':
                $endpoint = new EndpointController\Note();
                break;  
            case '/authors':
            case '/authors/':
                $endpoint = new EndpointController\Authors();
                break;  
            default:
               throw new ClientError(404);
            }
        }   catch (ClientError $e){
                $data = ['message' => $e->getMessage()];
                $endpoint = new EndpointController\Endpoint($data);
         }
 
        return $endpoint;
    }
}