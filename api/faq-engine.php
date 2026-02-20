<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
require_once 'config.php';

$article_id = $_POST['id'] ?? '';
$description = $_POST['desc'] ?? '';

if (empty($article_id) || empty($description)) {
    echo json_encode(["error" => "Daten fehlen"]);
    exit;
}

$cache_file = "cache/faq_" . md5($article_id) . ".json";

if (file_exists($cache_file)) {
    echo file_get_contents($cache_file);
    exit;
}

$prompt = "Analysiere diese Produktbeschreibung und erstelle exakt 3 kurze FAQ (Frage & Antwort) auf Deutsch. 
           Antworte NUR im JSON-Format als Array: 
           [{\"f\": \"Frage?\", \"a\": \"Antwort\"}]. 
           Hier die Beschreibung: " . strip_tags($description);

$ch = curl_init('https://api.groq.com/openai/v1/chat/completions');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
    "model" => "llama-3.3-70b-versatile",
    "messages" => [
        ["role" => "system", "content" => "Du bist ein JSON-Generator. Antworte niemals mit Text außerhalb des Arrays."],
        ["role" => "user", "content" => $prompt]
    ],
    "temperature" => 0.5
]));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Authorization: Bearer ' . $ai_api_key
]);

$response = curl_exec($ch);
curl_close($ch);

$res_data = json_decode($response, true);
$ai_content = $res_data['choices'][0]['message']['content'] ?? '';

$clean_json = preg_replace('/```json|```/', '', $ai_content);
$clean_json = trim($clean_json);

if (!empty($clean_json) && strpos($clean_json, '[') === 0) {
    file_put_contents($cache_file, $clean_json);
    echo $clean_json;
} else {
    echo json_encode(["error" => "KI Fehler oder ungültiges Format"]);
}
