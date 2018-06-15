<?php
    $to = "amanda@booj.com"; 
    $from = $_REQUEST['email']; 
    $name = $_REQUEST['fname']; 
    $headers = "From: " . $from; 
    $subject = "ENCON X RSVP";
    $fields = array(); 
    $fields{"name"} = 'Name: '.$_REQUEST['first_last']; 
    $fields{"email"} = 'Email: '.$_REQUEST['email']; 
    $fields{"company"} = 'Company: '.$_REQUEST['company']; 
    $fields{"official_title"} = 'Title: '.$_REQUEST['official_title']; 
    $fields{"tshirt_size"} = 'T-Shirt Size: '.$_REQUEST['tshirt_size'];
    $fields{"dietary_restrictions"} = 'Dietary Restrictions: '.$_REQUEST['dietary_restrictions'];
    $fields{"broker_conference"} = 'Attending Broker Conference: '.($_REQUEST['broker_conference'] == 'Yes' ? 'Yes' : 'No');
    $fields{"crm_workshop"} = 'Attending CRM Workshop: '.($_REQUEST['crm_workshop'] == 'Yes' ? 'Yes' : 'No');
    $fields{"awards_gala"} = 'Attending Agent Award Gala: '.($_REQUEST['awards_gala'] == 'Yes' ? 'Yes' : 'No');
    
    $body = "RSVP FOR ENCON X\n\n"; foreach($fields as $a => $b){   $body .= sprintf("%20s \n",$b,$_REQUEST[$a]); }
    $send = mail($to, $subject, $body, $headers);

    // Confirmation Email
    $con_to = $_REQUEST['email'];
    $con_from = "amanda@booj.com";
    $con_headers = 'From: ' . $con_from;
    $con_subject = 'ENCON X Confirmation';
    $confirmation = 'Thank you for RSVPing to ENCON X. We look forward to seeing you in September. If you have any questions leading up to the event, please let me know.';
    $con_send = mail($con_to, $con_subject, $confirmation, $con_headers);
?>