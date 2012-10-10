<?php

global $_USER;

 function manageReport() {
   //?org_id required param
   //user_id optional param
   // calls createReport(org_id)
   //if no user_id param call sendReport(for every user_id)
   // else user_id param call sendReport(user_id param)
   echo "manage";
 }
 //high priority
 function createReport() {
   // puts report  in report organization in db*/  

   // generates everything in a report
   // $_POST[title] = string report title
   // $_POST[content] = report, self-contained html string
   // $_POST[org_id] = organization id
   // category
 
 }

 //high priority
 function sendReport($get) {

   $to = 'blacki@gmail.com';

   $subject = 'from_Gatech_Gripe_Email';

   $headers = "From: gripe-no-reply@gripe.com\r\n";
   $headers .= "MIME-Version: 1.0\r\n";
   $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

   $message = '<html><body>';
   $message .= '<form action="http://mysite.com/process.php" method="post" target="_blank">';
   $message .= '<label>Rate <strong>Turfnuts</strong>?</label><br />';
   $message .= '<input name="rating" type="radio" /> ★☆☆☆<br />';
   $message .= '<input name="rating" type="radio" /> ★★☆☆<br />';
   $message .= '<input name="rating" type="radio" /> ★★★☆<br />';
   $message .= '<input name="rating" type="radio" /> ★★★★<br />';
   $message .= '<br />';
   $message .= '<label for="commentText">Leave a quick review:</label><br />';
   $message .= '<textarea cols="75" name="commentText" rows="5"></textarea><br />';
   $message .= '<br />';
   $message .= '<input type="submit" value="Submit your review" />&nbsp;</form>';
   $message .= '</body></html>';

   mail($to, $subject, $message, $headers);


   echo "email ".$get['org_id'];

 }


 function getFunnelStats() {
   /**/    
 }



 function funnelGripe(){

 }
 
?>
