<div align="center">
  
  # API web client
  _A package to interact with the [AssistantApps API](https://api.assistantapps.com)._
  
  <br />  
  
  ![header](https://github.com/AssistantApps/.github/blob/main/img/animatedBanner.svg?raw=true) 
  
  <br />
  
  ![madeWithLove](https://github.com/AssistantApps/.github/blob/main/badges/made-with-love.svg)
  ![gitmoji](https://github.com/AssistantApps/.github/blob/main/badges/gitmoji.svg?raw=true)<br />
  ![Profile views](https://komarev.com/ghpvc/?username=AssistantApps&color=green&style=for-the-badge)

  [![Follow on Twitter](https://img.shields.io/twitter/follow/AssistantApps?color=%231d9bf0&style=for-the-badge)][assistantAppsTwitter]
  [![Discord](https://img.shields.io/discord/625007826913198080?style=for-the-badge)][discord]
  
  <br /> 
</div>


> A package to interact with the [AssistantApps API](https://api.assistantapps.com)

## Install

```bash
npm install @assistantapps/assistantapps.api.client
```

## Usage

```ts
import { AssistantAppsApiService } from '@assistantapps/assistantapps.api.client';

const api = new AssistantAppsApiService({
    // url: 'https://api.assistantapps.com', OPTIONAL
    // authToken: '<assistantapps jwt token>', OPTIONAL
});

const availableApps = await api.app.readAll();
```

[assistantAppsTwitter]: https://twitter.com/AssistantApps?ref=AssistantAppsGithub
[discord]: https://assistantapps.com/discord?ref=AssistantAppsGithub