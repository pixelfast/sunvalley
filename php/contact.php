<?php
/**
 * SunValley Landscaping — contact.php
 * Handles contact form submissions and sends email notification.
 *
 * SETUP STEPS:
 *   1. Change $to_email to the real business email address
 *   2. Upload this file to your server at /php/contact.php
 *   3. Make sure your host allows PHP mail() — most cPanel hosts do
 *   4. Optionally configure SMTP via cPanel for better deliverability
 */

/* ---- Config ---- */
$to_email   = 'hello@sunvalleyaz.com';   // <-- change this
$from_name  = 'SunValley Landscaping Website';
$from_email = 'noreply@sunvalleyaz.com'; // <-- use your domain

/* ---- Only accept POST ---- */
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit('Method not allowed');
}

/* ---- Sanitize inputs ---- */
function clean(string $value): string {
    return htmlspecialchars(strip_tags(trim($value)), ENT_QUOTES, 'UTF-8');
}

$name    = clean($_POST['name']    ?? '');
$email   = clean($_POST['email']   ?? '');
$phone   = clean($_POST['phone']   ?? '');
$service = clean($_POST['service'] ?? '');
$message = clean($_POST['message'] ?? '');

/* ---- Validate required fields ---- */
if (empty($name) || empty($email)) {
    http_response_code(400);
    echo json_encode(['error' => 'Name and email are required.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid email address.']);
    exit;
}

/* ---- Service label map ---- */
$service_labels = [
    'lawn'       => 'Lawn care & maintenance',
    'design'     => 'Landscaping & design',
    'irrigation' => 'Irrigation & drainage',
    'hardscape'  => 'Hardscaping',
    'tree'       => 'Tree trimming & removal',
    'other'      => 'Not sure / other',
];
$service_label = $service_labels[$service] ?? 'Not specified';

/* ---- Build email ---- */
$subject = "New quote request from $name — SunValley Website";

$body  = "You have a new contact form submission from the SunValley Landscaping website.\n\n";
$body .= "---\n";
$body .= "Name:    $name\n";
$body .= "Email:   $email\n";
$body .= "Phone:   " . ($phone ?: 'Not provided') . "\n";
$body .= "Service: $service_label\n";
$body .= "---\n\n";
$body .= "Message:\n$message\n\n";
$body .= "---\n";
$body .= "Sent from: sunvalleyaz.com\n";
$body .= "Time: " . date('Y-m-d H:i:s T') . "\n";

$headers  = "From: $from_name <$from_email>\r\n";
$headers .= "Reply-To: $name <$email>\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

/* ---- Send ---- */
$sent = mail($to_email, $subject, $body, $headers);

if ($sent) {
    http_response_code(200);
    echo json_encode(['success' => true]);
} else {
    // mail() failed — log it and tell the client
    error_log("[SunValley contact] mail() failed for submission from $email");
    http_response_code(500);
    echo json_encode(['error' => 'Mail could not be sent. Please try again.']);
}
