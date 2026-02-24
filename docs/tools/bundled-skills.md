---
summary: "Catalog of all bundled skills shipped with Clawdbot, including Clawdbot-native skills that require no external setup"
read_when:
  - You want to know which skills ship with Clawdbot out of the box
  - You're looking for skills that work with no extra tools installed
  - You want to understand what makes Clawdbot's skill set unique
---

# Bundled Skills

Clawdbot ships a curated set of **bundled skills** with every install. Some are special because they integrate directly with Clawdbot's own platform features — no external binary or API key required.

To list all skills and their eligibility status:

```bash
clawdbot skills list
clawdbot skills list --eligible   # only ready-to-use skills
clawdbot skills check             # summary of what's ready vs missing
```

For details on the skills system (gating, config, workspaces), see [Skills](/tools/skills).

---

## 🔗 Clawdbot-native skills

These skills use Clawdbot's own built-in tools. They don't wrap an external CLI — they work because Clawdbot provides the tool directly.

| Skill | Emoji | What it does | Requires |
|---|---|---|---|
| `canvas` | — | Display HTML/games/dashboards on connected Mac/iOS/Android nodes via the canvas tool | Nothing (always eligible) |
| `discord` | 🎮 | Send messages, react, manage channels, run polls, and moderate Discord via Clawdbot's Discord integration | `channels.discord` configured |
| `slack` | 💬 | React to messages and pin/unpin items in Slack via Clawdbot's Slack integration | `channels.slack` configured |
| `voice-call` | 📞 | Start and inspect voice calls via the Clawdbot voice-call plugin | `plugins.entries.voice-call.enabled` |
| `session-logs` | 📜 | Search and analyze your own past conversation sessions stored in `~/.clawdbot/agents/` | `jq` + `rg` on PATH |
| `skill-creator` | — | Design, structure, and package new AgentSkills for Clawdbot | Nothing (always eligible) |
| `clawdhub` | — | Search, install, update, and publish skills from the [ClawdHub](https://clawdhub.com) registry | `clawdhub` CLI |

The `canvas`, `skill-creator`, and `bluebubbles` skills have no `metadata.clawdbot` gating at all, making them **always eligible** regardless of environment.

---

## 🛠️ AI & coding skills

| Skill | Emoji | What it does | Key requirement |
|---|---|---|---|
| `coding-agent` | 🧩 | Run Codex CLI, Claude Code, OpenCode, or Pi Coding Agent as a background process | `claude`, `codex`, `opencode`, or `pi` on PATH |
| `gemini` | ♊️ | One-shot Q&A, summaries, and generation via Gemini CLI | `gemini` binary |
| `oracle` | 🧿 | Prompt bundling, file injection, and multi-engine sessions via oracle CLI | `oracle` binary |
| `openai-image-gen` | 🖼️ | Batch-generate images via OpenAI Images API | `python3` + `OPENAI_API_KEY` |
| `openai-whisper` | 🎙️ | Local speech-to-text with the Whisper CLI (no API key) | `whisper` binary |
| `openai-whisper-api` | ☁️ | Transcribe audio via OpenAI Whisper API | `curl` + `OPENAI_API_KEY` |
| `nano-banana-pro` | 🍌 | Generate or edit images via Gemini 3 Pro Image | `uv` + `GEMINI_API_KEY` |
| `nano-pdf` | 📄 | Edit PDFs with natural-language instructions | `nano-pdf` binary |
| `summarize` | 🧾 | Summarize URLs, podcasts, and local files | `summarize` binary |
| `model-usage` | 📊 | Summarize per-model usage/cost from CodexBar (macOS) | `codexbar` binary |

---

## 📱 Messaging & social skills

| Skill | Emoji | What it does | Key requirement |
|---|---|---|---|
| `bird` | 🐦 | X/Twitter CLI: read, search, post, engage via cookies | `bird` binary |
| `imsg` | 📨 | iMessage/SMS: list chats, history, and send (macOS) | `imsg` binary |
| `wacli` | 📱 | Send WhatsApp messages and sync history via CLI | `wacli` binary |
| `bluebubbles` | — | Build/update BlueBubbles external channel plugin | Nothing |
| `himalaya` | 📧 | Email management via IMAP/SMTP with Himalaya CLI | `himalaya` binary |

---

## 📝 Notes & productivity skills

| Skill | Emoji | What it does | Key requirement |
|---|---|---|---|
| `apple-notes` | 📝 | Create, view, edit, and search Apple Notes via `memo` CLI (macOS) | `memo` binary |
| `apple-reminders` | ⏰ | Manage Apple Reminders via `remindctl` (macOS) | `remindctl` binary |
| `bear-notes` | 🐻 | Create and manage Bear notes via `grizzly` CLI (macOS) | `grizzly` binary |
| `obsidian` | 💎 | Work with Obsidian vaults via `obsidian-cli` | `obsidian-cli` binary |
| `notion` | 📝 | Create and manage Notion pages and databases | `NOTION_API_KEY` |
| `things-mac` | ✅ | Manage Things 3 todos and projects via `things` CLI (macOS) | `things` binary |
| `trello` | 📋 | Manage Trello boards, lists, and cards via REST API | `jq` + `TRELLO_API_KEY` + `TRELLO_TOKEN` |

---

## 🎵 Media & entertainment skills

| Skill | Emoji | What it does | Key requirement |
|---|---|---|---|
| `spotify-player` | 🎵 | Terminal Spotify playback/search via `spogo` or `spotify_player` | `spogo` or `spotify_player` |
| `sonoscli` | 🔊 | Control Sonos speakers (discover/status/play/volume/group) | `sonos` binary |
| `blucli` | 🫐 | BluOS multi-room audio control via `blu` CLI | `blu` binary |
| `openhue` | 💡 | Control Philips Hue lights and scenes via OpenHue CLI | `openhue` binary |
| `gifgrep` | 🧲 | Search GIF providers, download, and extract stills | `gifgrep` binary |
| `songsee` | 🌊 | Generate spectrograms and visualizations from audio | `songsee` binary |
| `video-frames` | 🎞️ | Extract frames or clips from videos with ffmpeg | `ffmpeg` binary |
| `camsnap` | 📸 | Capture frames or clips from RTSP/ONVIF cameras | `camsnap` binary |

---

## 🔊 Voice & TTS skills

| Skill | Emoji | What it does | Key requirement |
|---|---|---|---|
| `sag` | 🗣️ | ElevenLabs text-to-speech with macOS `say`-style UX | `sag` binary + `ELEVENLABS_API_KEY` |
| `sherpa-onnx-tts` | 🗣️ | Local offline TTS via sherpa-onnx (no cloud) | `SHERPA_ONNX_RUNTIME_DIR` + `SHERPA_ONNX_MODEL_DIR` |

---

## 🌐 Web & local services skills

| Skill | Emoji | What it does | Key requirement |
|---|---|---|---|
| `weather` | 🌤️ | Current weather and forecasts via wttr.in (no API key) | `curl` |
| `blogwatcher` | 📰 | Monitor blogs and RSS/Atom feeds for updates | `blogwatcher` binary |
| `goplaces` | 📍 | Query Google Places API for text search and place details | `goplaces` binary + `GOOGLE_PLACES_API_KEY` |
| `local-places` | 📍 | Search for places via Google Places API proxy on localhost | `uv` + `GOOGLE_PLACES_API_KEY` |

---

## ☁️ Cloud & SaaS skills

| Skill | Emoji | What it does | Key requirement |
|---|---|---|---|
| `github` | 🐙 | Issues, PRs, CI runs, and advanced queries via `gh` CLI | `gh` binary |
| `1password` | 🔐 | Set up and use 1Password CLI for secrets and injection | `op` binary |
| `gog` | 🎮 | Google Workspace: Gmail, Calendar, Drive, Contacts, Sheets, Docs | `gog` binary |
| `mcporter` | 📦 | List, configure, auth, and call MCP servers/tools | `mcporter` binary |

---

## 🏠 Smart home & hardware skills

| Skill | Emoji | What it does | Key requirement |
|---|---|---|---|
| `eightctl` | 🎛️ | Control Eight Sleep pods (status, temperature, alarms) | `eightctl` binary |
| `peekaboo` | 👀 | Capture and automate macOS UI via Peekaboo CLI (macOS) | `peekaboo` binary |

---

## 🛒 Food & ordering skills

| Skill | Emoji | What it does | Key requirement |
|---|---|---|---|
| `food-order` | 🥡 | Reorder Foodora + track ETA/status via `ordercli` | `ordercli` binary |
| `ordercli` | 🛵 | Check past Foodora orders and active order status | `ordercli` binary |

---

## ⚙️ Dev & utility skills

| Skill | Emoji | What it does | Key requirement |
|---|---|---|---|
| `tmux` | 🧵 | Remote-control tmux sessions by sending keystrokes and scraping pane output | `tmux` binary |

---

## Looking for more?

Browse the public registry at [clawdhub.com](https://clawdhub.com) or install skills with:

```bash
npx clawdhub install <skill-slug>
```

See [ClawdHub](/tools/clawdhub) for the full install and sync guide.
