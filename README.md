# Qaankunka

**Live:** https://qaankunka.com

Official website for Qaankunka — a Quantum + AI technology company developing agentic visual intelligence systems for imagery and video.

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- Framer Motion

## Getting Started

Prerequisites: Git and Node.js 22 LTS.

```bash
git clone https://github.com/elikim4k-ai/qaankunka.git
cd qaankunka
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm run start
```

## Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/
│   ├── home/         # Homepage section components
│   ├── layout/       # Navbar, Footer
│   └── ui/           # Reusable UI components
└── data/             # Content configuration
docs/
└── QAANKUNKA_BUILD_STATE.md  # Development handoff document
```

## Documentation

See [docs/QAANKUNKA_BUILD_STATE.md](docs/QAANKUNKA_BUILD_STATE.md) for current build state, architecture decisions, and remaining work.

## Configuration and validation

The site can be browsed without SMTP credentials. Contact-email delivery uses
`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, and optional `CONTACT_TO`
in `.env.local`; without complete SMTP configuration the mailer returns
`not-configured`. Do not treat an unconfigured form as proof of email delivery.

```bash
npm run lint
npm run build
npm run start
```

Stop the development server before starting production on port 3000. Check the
homepage, navigation, and narrow-screen layout. There is no automated test
script in `package.json`. A build checks compilation, not contact delivery or
visual correctness. For a reproduction report, record the commit, Node/npm
versions, browser, viewport, command, and whether SMTP was configured. Use only
synthetic form data and do not include secrets. This repository is a company
website, not an implementation or benchmark of its advertised research systems.
