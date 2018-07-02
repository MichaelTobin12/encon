<?php
    $to = "amanda@booj.com"; 
    $from = $_REQUEST['email'];
    $name = $_REQUEST['fname']; 
    $headers = "From: " . $from; 
    $subject = "ENCON 2018 RSVP";
    $fields = array(); 
    $fields{"name"} = 'Name: '.$_REQUEST['first_name'].' '.$_REQUEST['last_name']; 
    $fields{"email"} = 'Email: '.$_REQUEST['email']; 
    $fields{"company"} = 'Company: '.$_REQUEST['company']; 
    $fields{"official_title"} = 'Title: '.$_REQUEST['official_title']; 
    $fields{"tshirt_size"} = 'T-Shirt Size: '.$_REQUEST['tshirt_size'];
    $fields{"dietary_restrictions"} = 'Dietary Restrictions: '.$_REQUEST['dietary_restrictions'];
    $fields{"broker_conference"} = 'Attending Broker Conference: '.($_REQUEST['broker_conference'] == 'Yes' ? 'Yes' : 'No');
    $fields{"group_dinner"} = 'Group Dinner: '.($_REQUEST['group_dinner'] == 'Yes' ? 'Yes' : 'No');
    
    $body = "RSVP FOR ENCON 2018\n\n"; foreach($fields as $a => $b){   $body .= sprintf("%20s \n",$b,$_REQUEST[$a]); }
    $send = mail($to, $subject, $body, $headers);

    // Confirmation Email
    $con_to = $_REQUEST['email'];
    $con_from = "amanda@booj.com";
    $con_headers = 'From: ' . $con_from;
    $con_subject = 'ENCON 2018 RSVP';
    $confirmation = 
    "You are now registered for The Enterprise Network Annual Conference.\r\n\r\nOur team will be sending communications leading up to the event as more details are announced, but if you have any questions until then, please contact our Marketing Director and Event Coordinator, Amanda Zaske, at amanda@booj.com. She is happy to assist.\r\n\r\nWe look forward to seeing you in November at ENCON!";
    
    $con_send = mail($con_to, $con_subject, $confirmation, $con_headers);
?>