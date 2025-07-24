const express = require("express");
const dotenv = require("dotenv");
const twilio = require("twilio");
const path = require("path");
const companies = require("./data/companies.json");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));

// 📞 Voice Entry Point
app.post("/voice", (req, res) => {
  console.log("📞 Incoming call received at /voice");
  const twiml = new twilio.twiml.VoiceResponse();

  try {
    const gather = twiml.gather({
      input: "dtmf",
      numDigits: 6,
      action: "/process-code",
      method: "POST",
      timeout: 10,
    });

    gather.say(
      { voice: "Polly.Aditi" },
      "नमस्ते! कृपया अपनी कंपनी का 6 अंकों का कोड टाइप करें और हैश दबाएं।"
    );

    twiml.say(
      { voice: "Polly.Aditi" },
      "आपने कोई इनपुट नहीं दिया। कृपया कुछ देर बाद फिर से प्रयास करें।"
    );

    res.type("text/xml");
    res.send(twiml.toString());
  } catch (err) {
    console.error("❌ Error in /voice:", err.message);
    res.status(500).send("Internal Server Error");
  }
});

// 📦 Code Processing
app.post("/process-code", (req, res) => {
  console.log("📨 Received digits at /process-code:", req.body.Digits);
  const code = req.body.Digits;
  const twiml = new twilio.twiml.VoiceResponse();

  try {
    if (!code || code.length !== 6) {
      console.warn("⚠️ Invalid code input:", code);
      twiml.say(
        { voice: "Polly.Aditi" },
        "कोड अमान्य है। कृपया 6 अंकों का सही कोड डालें।"
      );
    } else {
      const match = companies.payload.data.find((c) => c.society_code === code);
      console.log("🔍 Matching company:", match);

      if (match) {
        const amcAmount = parseFloat(match.amc || "0");
        const billAmount = match.bill_amount || "0";

        const amcMessage =
          amcAmount > 0
            ? `आपका AMC ₹${amcAmount} भरा नहीं गया है, कृपया शीघ्र भरें।`
            : `आपका AMC पहले ही भर दिया गया है, धन्यवाद।`;

        const msg = `आपकी कंपनी का नाम है ${match.society_name}, सेक्रेटरी श्री ${match.sec_name}, ज़िला ${match.district_name}, तालुका ${match.taluka_name}, गाँव ${match.city_name}। ${amcMessage} बिल राशि ₹${billAmount} है।`;

        twiml.say({ voice: "Polly.Aditi" }, msg);
      } else {
        twiml.say(
          { voice: "Polly.Aditi" },
          `कोड ${code} से कोई कंपनी नहीं मिली। कृपया सही कोड डालें।`
        );
      }
    }

    res.type("text/xml");
    res.send(twiml.toString());
  } catch (err) {
    console.error("❌ Error in /process-code:", err.message);
    res.status(500).send("Internal Server Error");
  }
});

// 🚀 Start server and update webhook
app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);

  const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );

  // You can change this to dynamic localtunnel or ngrok detection if needed
  const voiceUrl = process.env.VOICE_WEBHOOK_URL || `https://upset-laws-march.loca.lt/voice`;
  console.log("🌐 Using voice webhook URL:", voiceUrl);

  client.incomingPhoneNumbers
    .list()
    .then((numbers) => {
      const match = numbers.find(
        (n) => n.phoneNumber === process.env.TWILIO_PHONE_NUMBER
      );
      if (!match) throw new Error("⚠️ Twilio phone number not found.");
      console.log("✅ Twilio phone number matched:", match.phoneNumber);
      return client.incomingPhoneNumbers(match.sid).update({
        voiceUrl,
        voiceMethod: "POST",
      });
    })
    .then(() => console.log(`🔁 Twilio webhook updated to ${voiceUrl}`))
    .catch((err) =>
      console.error("❌ Error updating Twilio webhook:", err.message)
    );
});
