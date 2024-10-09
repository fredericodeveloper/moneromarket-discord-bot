# MoneroMarket Unofficial Discord Bot
## How to run the bot using docker:
- Install docker and docker compose
- Clone the repository using `git clone https://github.com/fredericodeveloper/moneromarket-discord-bot`
- Edit the docker-compose.yml to include your bot's token:
```yaml
version: '3.8'
services:
  app:
    build: .
    environment:
      - TOKEN=PUT_THE_BOT_TOKEN_HERE
```
- Run `docker compose up -d`
- Modify this link to include the client id of your bot `https://discord.com/oauth2/authorize?client_id=CLIENTID&scope=bot&permissions=76800` and use it to add the bot to a server.
- Your bot should now be online and ready!

## How to run the bot using nodejs:
- Install NodeJS 22.9 and NPM
- Run `npm install discord.js axios cheerio`
- Clone the repository using `git clone https://github.com/fredericodeveloper/moneromarket-discord-bot`
- Enter the bot directory using `cd moneromarket-discord-bot`
- Use `TOKEN=TOKENHERE node index.js`

## License for this project: [AGPL-3 License](https://choosealicense.com/licenses/agpl-3.0/)

### Permissions
- Commercial use
- Modification
- Distribution
- Patent use
- Private use

### Limitations
- Liability
- Warranty

### Conditions
- **License and copyright notice**
- **State changes**
- **Disclose source**
- Network use is distribution
- Same license

### For more detailed info about the [AGPL-3 License](https://choosealicense.com/licenses/agpl-3.0/) you can read https://choosealicense.com/licenses/agpl-3.0/ or the LICENSE file in this repo.