<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header('P3P: CP="CAO PSA OUR"'); // Makes IE to support cookies
header("Content-Type: application/json; charset=utf-8");

$dataBody = file_get_contents('php://input');


if ($_SERVER['REQUEST_METHOD'] !== 'OPTIONS') {
		$request = $_SERVER['PATH_INFO'].'?'.$_SERVER['QUERY_STRING'];
		$requestURL = 'http://hamper-x186vw0p.cloudapp.net:8889'.$request;
	    $process = curl_init($requestURL);
		curl_setopt($process, CURLOPT_HTTPHEADER, array(
					'Accept: '.get_header("Accept"),
					'Content-Type: '. get_header("Content-Type"), 
					'Authorization: '. get_header("Authorization"),
					$additionalHeaders)
		);
	//	curl_setopt($process, CURLOPT_USERPWD, "hampersoftware:@2016Drycleaning");
		curl_setopt($process, CURLOPT_TIMEOUT, 30);
		curl_setopt($process, CURLOPT_HEADER, 1);
		curl_setopt($process, CURLOPT_CUSTOMREQUEST, $_SERVER['REQUEST_METHOD']);
		curl_setopt($process, CURLOPT_POSTFIELDS, $dataBody);
		curl_setopt($process, CURLOPT_RETURNTRANSFER, TRUE);
	
		$return = curl_exec($process);
	
		$responseCode = curl_getinfo($process, CURLINFO_HTTP_CODE);
		
		http_response_code($responseCode);
		
	
		
		$header_len = curl_getinfo($process, CURLINFO_HEADER_SIZE);
		$header = substr($return, 0, $header_len);
		$body = substr($return, $header_len);
		curl_close($process);
		echo $body;
	}

function get_header( $headerKey )
{
     $test = getallheaders();
    if ( array_key_exists($headerKey, $test) ) {
        $headerValue = $test[ $headerKey ];
    }
    return $headerValue;
}

function get_Token() {
	$header = get_header("Authorization");
	if (substr($header, 0, 7) !== 'Bearer ') {
    	return false;
	}

	return trim(substr($header, 7));
}

?>