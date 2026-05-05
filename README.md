# 🐾 Animal Guess (Web3 DApp)

Aplicação Web3 simples onde o usuário escolhe um animal (1 a 10), envia uma transação para um smart contract e recebe o resultado do jogo diretamente via eventos da blockchain.

## 🚀 Funcionalidades

- Conexão com carteira (OKX, MetaMask, etc)
- Seleção de animal (1–10)
- Envio de transação com valor mínimo (`MIN_BET`)
- Leitura do evento `GamePlayed` do contrato
- Exibição do resultado na interface:
  - Número sorteado
  - Animal correspondente
  - Vitória ou derrota
  - Valor pago
  - Prêmio recebido

---

## 🛠️ Tecnologias

- TypeScript
- Vite
- Ethers.js v6
- Wallet Provider (EIP-1193)

---

## 📦 Instalação

Clone o repositório:

```bash
git clone https://github.com/SEU_USUARIO/animalguess.git
cd animalguess
```


### Instale as dependencias

```
npm install
```

▶️ Rodando o projeto

Inicie o servidor de desenvolvimento:

```
npm run dev
```


A aplicação estará disponível em: http://localhost:5173


🔗 Requisitos


Carteira Web3 instalada no navegador:
OKX Wallet
MetaMask
ou qualquer carteira compatível com EVM
Estar conectado na mesma rede do contrato

<hr />

💰 Como usar

- Clique em Conectar carteira
- Escolha um animal
- Clique em Enviar palpite
- Confirme a transação na carteira
- Aguarde o resultado aparecer na tela

<hr />


📡 Smart Contract

- A aplicação interage com um contrato que expõe:

- `run(uint256 guess) (payable)`
- `MIN_BET() (view)`
- Evento `GamePlayed`


# Block Explorer

Acesse as transações do bloco através do [endereço do contrato](https://sepolia.etherscan.io/address/0x491a66c922ac76064f97a3b20e21b4ddcc8bf702)