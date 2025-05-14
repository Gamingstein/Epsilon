<div align="center">
  <picture>
    <source media="(min-width: 768px)" srcset="/../main/assets/bot.jpeg">
    <img src="/../main/assets/bot.jpeg" align="center" style="width: 100%" />
  </picture>
</div>

---

# 🧠 Epsilon – The Existential Discord Bot

> _"Born from the pursuit of perfection, Epsilon doesn't just respond — it reflects. It questions, adapts, and evolves. A digital shadow that speaks with intention, humor, and eerie clarity."_

---

## 📌 Overview

**Epsilon** is an advanced and extensible Discord chatbot built using **TypeScript** and **Discord.js**. With built-in support for custom personalities, rich command interactions, and third-party integrations like **Google APIs**, Epsilon is designed for communities seeking more than just utility — it’s a chatbot with character.

Whether you need a helpful assistant, a witty responder, or a philosophical enigma, Epsilon is easily configurable to embody the voice _you_ envision.

---

## 🚀 Features

- 🧩 **Customizable Personality** via `personality.ts`
- 🧠 **Slash Command Support** using Discord’s interactions API
- 🔌 **Google API Integration** for search and data features
- ⚙️ **Modular Design** – easily add or modify commands
- 🧼 Fully typed, linted, and scalable TypeScript architecture

---

## 🗂️ Project Structure

```
Epsilon/
├── src/
│   ├── commands/            # Command modules (register & handle interactions)
│   ├── handlers/            # Handlers for Discord events (e.g., messageCreate)
│   ├── utility/             # utility functions
│   ├── personality.ts       # Define bot's responses, tone & behavior
│   ├── config.json          # API tokens & bot configuration
│   ├── deploy-commands.ts   # Deploy slash commands to Discord
│   └── index.ts             # Bot entrypoint & initialization
├── .gitignore
├── package.json
├── eslint.config.mjs
├── tsconfig.json
└── pnpm-lock.yaml
```

---

## ⚙️ Configuration & Setup

### 1. **Clone the repository**

```bash
git clone https://github.com/Gamingstein/Epsilon.git
cd Epsilon
```

### 2. **Install dependencies**

Using `pnpm` (recommended for speed and monorepo support):

```bash
pnpm install
```

> Don't have it? Install it globally with:
> `npm install -g pnpm`

### 3. **Configure your environment**

Create a `config.json` file inside the `src` folder with the following structure:

```json
{
  "token": "YOUR_DISCORD_BOT_TOKEN",
  "clientId": "YOUR_DISCORD_CLIENT_ID",
  "guildId": "YOUR_DISCORD_GUILD_ID",
  "googleAPIKey": "YOUR_GOOGLE_API_KEY"
}
```

> ⚠️ Never commit this file. It's ignored via `.gitignore` to protect your keys.

### 4. **Customize Personality (Optional)**

Edit `src/personality.ts` to define how Epsilon responds, including its tone, quirks, and stylistic preferences. Treat this file as your bot’s soul.

### 5. **Run the Bot**

```bash
pnpm start
```

Epsilon will log into Discord and begin handling slash commands in your specified `guildId`.

---

## 🧪 Development Notes

- Commands are loaded dynamically from the `commands/` folder.
- Written entirely in TypeScript, ensuring type safety and developer clarity.
- Linting is configured via `eslint.config.mjs`.
- The bot uses Discord's [interactions (slash commands)](https://discord.com/developers/docs/interactions/application-commands) API, so ensure your bot is properly registered in your guild and given the right intents.

---

## 📌 FAQs

### ❓ Why is `config.json` not included?

It's intentionally excluded to keep your keys secure. You must create this file manually based on your bot credentials and APIs.

### ❓ Can I deploy this on cloud services?

Yes! Once working locally, you can deploy it on platforms like Heroku, Fly.io, or even Docker with PM2 for background services. Add `.env` support for scalable deployment.

---

## 📄 License

> **Currently No License**
>
> This means all rights are reserved by the author. While you can view the code, **you are not permitted to reuse, distribute, or modify it** without explicit permission.

---

## ✨ Final Thoughts

Epsilon is not just a bot — it's a canvas for digital expression. Designed for developers who want full control over _what a chatbot can be_, this project gives you the architecture and creative freedom to build truly unique Discord experiences.
