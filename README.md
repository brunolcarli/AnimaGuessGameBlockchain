# 🐾 Animal Guess (Web3 DApp)

Aplicação Web3 simples onde o usuário escolhe um animal (1 a 10), envia uma transação para um smart contract e recebe o resultado do jogo diretamente via eventos da blockchain.


## 🌐 Aplicação em produção

A aplicação está disponível no Vercel:

👉 https://anima-guess-game-blockchain.vercel.app/

---

## 🧪 Ambiente

Este projeto está rodando na rede de testes:

- **Ethereum Sepolia**

---

## 📋 Requisitos para uso

Para utilizar a aplicação, você precisa:

- Uma carteira Web3 compatível (ex: OKX Wallet, MetaMask, etc)
- A carteira deve estar conectada na rede **Sepolia**
- Ter saldo de ETH de teste (Sepolia ETH)

---

## ⛽ Faucet (ETH de teste)

Caso não tenha saldo, você pode obter ETH de teste em faucets:

- https://sepoliafaucet.com/
- https://faucet.quicknode.com/ethereum/sepolia

---

## ⚠️ Observações

- Este projeto utiliza **ETH de teste**, sem valor financeiro real
- As transações são públicas e podem ser visualizadas no explorer
- O tempo de confirmação pode variar dependendo da rede

---

## 🔍 Explorador de blocos

Você pode acompanhar suas transações em:

👉 https://sepolia.etherscan.io/



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

# Desenvolvimento

Seção dedicada À desenvolvedores a fim de executar a aplicação localmente, modificar o codigo fonte, etc...


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