# 📞 AI Calling Assistant (Hindi Voice Bot)

A powerful AI-driven calling bot using **Twilio**, **Whisper ASR**, **Mistral-7B / GPT**, and **Google Text-to-Speech**, built with Node.js and Express.

> 🤖 Speak with your assistant in Hindi – it understands, thinks, and responds like a human!

---

## ✨ Features

- ✅ Incoming call handling (Twilio)
- 🧠 AI brain: Mistral-7B (or OpenAI GPT)
- 🗣️ Hindi voice transcription with Whisper
- 🔊 Voice reply using Google TTS (Polly optional)
- 📁 Supports local JSON databases (e.g., society codes)
- 🧾 Reads out AMC/bill info from database
- ☁️ Railway deployment-ready

---

## 📞 Use Case

> Customer calls →  
> Bot greets & asks for 6-digit code →  
> Bot fetches info + AMC status →  
> Bot responds in clear Hindi using voice →  
> (Optional) Call ends or routes further

---

## ⚙️ Tech Stack

- Node.js + Express
- Twilio Voice API
- Whisper ASR (OpenAI / OpenRouter)
- Mistral / GPT-4 / LLM
- Google Text-to-Speech (gTTS or Polly)
- Railway (deployment)
- GitHub (source control)

---

## 🧩 How It Works

📞 Caller dials in using Twilio  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;⬇️  
🤖 Bot greets in Hindi  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;⬇️  
🔢 Asks for a 6-digit society/customer code  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;⬇️  
📁 Fetches AMC/bill info from `companies.json`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;⬇️  
🧠 Generates Hindi reply via GPT or Mistral  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;⬇️  
🔊 Converts reply to speech via Google TTS / Polly  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;⬇️  
📲 Speaks back the answer to the caller  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;⬇️  
🔁 Ends call or performs next action (optional)


---

## 🚀 Local Setup

```bash
git clone https://github.com/yourname/ai-calling-assistant.git
cd ai-calling-assistant
npm install
cp .env.example .env
# Fill in your Twilio, OpenAI, Google creds
node start.js
