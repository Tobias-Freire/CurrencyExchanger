# CurrencyExchanger
Aplicação web feita para converter valores monetários de uma moeda para outra. Utiliza a API [Exchangerate-API](https://www.exchangerate-api.com/)

<p align="center">
  <img src="https://github.com/user-attachments/assets/cec74a67-a24c-409d-b675-bccd6ad63b42" alt="image" />
</p>

## Como rodar 
> **Pré-requisitos**: Docker
1. Adicione um arquivo .env na raíz do projeto com o conteúdo `EXCHANGERATE_API_KEY=<SUA_CHAVE_API>`. Pegue sua chave criando uma conta em [Exchangerate-API](https://www.exchangerate-api.com/)
2. Rode o comando `docker compose up --build`
3. Visite [localhost:3000](http://localhost:3000) para visualizar a aplicação
