# Capra Nettsiden

> [https://nettsiden.pages.dev](https://nettsiden.pages.dev)

- UI med [React](https://reactjs.org/)
- Server side rendering med [Remix](https://remix.run/)
- Styling med [Tailwind](https://tailwindcss.com/)
- Hosted hos [Cloudflare Pages](https://pages.cloudflare.com/)
- Innhold og bilder hos [Sanity](https://www.sanity.io/)
- Komponent utvikling med [Ladle](https://ladle.dev/)

## Utvikling

Bare trykk 👇 for å åpne prosjektet med StackBlitz Codeflow rett i nettleseren

[![Open in Codeflow](https://developer.stackblitz.com/img/open_in_codeflow.svg)](https:///pr.new/capraconsulting/nettsiden)

_Du trenger å logge inn med Github og bli med i beta'en til Codeflow, det går fort._

**Eller** kjør det opp lokalt

```
npm install
npm run dev
```

Åpne opp [http://localhost:3000](http://localhost:3000)

### Secrets

Noen ruter trenger hemmelige API nøkkler disse finner du på [Notion](https://www.notion.so/capra/Tokens-og-s-nn-9f9b4683fefc4a0886967739754109f8), eller spør i [#team_capraweb](https://capra.slack.com/archives/C01A1QLRKJM). Men dette er ikke nødvendig for få repoet til å kjøre og gjøre endringer på de fleste sidene.

```
TEAM_TAILOR_API_KEY=<api-key-here>
SLACK_WEBHOOK_URL=<webhook-url-here>
```

### Ladle / Storybook

Flere av felles komponentene utvikler og dokumenterer vi i [ladle](https://ladle.dev/)

```
npm run ladle
```

## Deployment

Vi deployer på Cloudflare Pages [her](https://dash.cloudflare.com/1df81eff3a3cb0e9662170a4b25ad52b/pages/view/nettsiden). Alle commits til main går rett ut i PROD. Alle branches vil få en preview build.
