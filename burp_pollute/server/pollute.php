<?php
  if(isset($_GET['url']) and is_string($_GET['url']) and ((strpos($_GET['url'], 'http://') === 0) or (strpos($_GET['url'], 'https://') === 0))) {
    $context = stream_context_create(array('http' => array('follow_location' => false)));
    $js = file_get_contents($_GET['url'], false, $context);

    if(array_search('Content-Encoding: gzip', $http_response_header)) {
      $js = gzdecode($js);
    }

    $tmpname = tempnam('/tmp', 'pp');
    file_put_contents($tmpname, $js);
    exec('node pollute.js '.$tmpname);
    header('Content-Type: text/javascript');
    header('Access-Control-Allow-Origin: *');
    echo file_get_contents($tmpname);
    unlink($tmpname);
  }
?>