import { ethers } from "ethers";
import "./style.css";

const CONTRACT_ADDRESS = "0x491A66C922Ac76064f97A3b20e21b4ddcc8bf702";

const ABI = [
  "function run(uint256 guess) payable",
  "function MIN_BET() view returns (uint256)",
  "event GamePlayed(address indexed player, uint256 guess, uint256 generatedNumber, bool won, uint256 amountPaid, uint256 prizePaid, string animal)",
];

const bichos: Record<number, string> = {
  1: "MACACO",
  2: "BORBOLETA",
  3: "COBRA",
  4: "TARTARUGA",
  5: "COELHO",
  6: "ELEFANTE",
  7: "GIRAFA",
  8: "PORCO",
  9: "CACHORRO",
  10: "GATO",
};

let signer: ethers.JsonRpcSigner | null = null;
let selectedNumber: number | null = null;

declare global {
  interface Window {
    ethereum?: any;
    okxwallet?: any;
  }
}

function getInjectedProvider() {
  if (window.okxwallet) return window.okxwallet;
  if (window.ethereum) return window.ethereum;

  throw new Error("Nenhuma carteira EVM encontrada.");
}

async function connectWallet() {
  try {
    const injectedProvider = getInjectedProvider();
    const provider = new ethers.BrowserProvider(injectedProvider);

    await provider.send("eth_requestAccounts", []);

    signer = await provider.getSigner();

    const address = await signer.getAddress();

    const walletEl = document.querySelector<HTMLDivElement>("#wallet")!;
    walletEl.innerText = `Carteira conectada: ${address}`;
  } catch (error) {
    console.error(error);
    alert("Erro ao conectar carteira.");
  }
}

async function esperarReceipt(
  provider: ethers.Provider,
  txHash: string
): Promise<ethers.TransactionReceipt | null> {
  for (let i = 0; i < 30; i++) {
    const receipt = await provider.getTransactionReceipt(txHash);

    if (receipt) {
      return receipt;
    }

    await new Promise((resolve) => setTimeout(resolve, 2000));
  }

  return null;
}

async function enviarPalpite() {
  const statusEl = document.querySelector<HTMLDivElement>("#status")!;

  if (!signer) {
    alert("Conecte sua carteira primeiro.");
    return;
  }

  if (!selectedNumber) {
    alert("Escolha um bicho primeiro.");
    return;
  }

  const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

  try {
    const minBet = await contract.MIN_BET();

    statusEl.innerHTML = `
      Enviando palpite: ${bichos[selectedNumber]} (${selectedNumber})...<br />
      Valor da aposta: ${ethers.formatEther(minBet)} ETH
    `;

    const tx = await contract.run(selectedNumber, {
      value: minBet,
      gasLimit: 300000n,
    });

    statusEl.innerHTML = `
      Transação enviada:<br />
      ${tx.hash}<br /><br />
      Aguardando confirmação...
    `;

    const receipt = await esperarReceipt(signer.provider, tx.hash);

    if (!receipt) {
      statusEl.innerHTML = `
        Transação enviada, mas não consegui buscar o receipt.<br />
        Hash:<br />
        ${tx.hash}
      `;
      return;
    }

    const gamePlayedEvent = receipt.logs
      .map((log) => {
        try {
          return contract.interface.parseLog(log);
        } catch {
          return null;
        }
      })
      .find((event) => event !== null && event.name === "GamePlayed");

    if (!gamePlayedEvent) {
      console.log("Receipt completo:", receipt);
      console.log("Logs:", receipt.logs);

      statusEl.innerHTML = `
        Transação confirmada no bloco ${receipt.blockNumber},<br />
        mas o evento <strong>GamePlayed</strong> não foi encontrado.
      `;

      return;
    }

    const guess = Number(gamePlayedEvent.args.guess);
    const generatedNumber = Number(gamePlayedEvent.args.generatedNumber);
    const won = Boolean(gamePlayedEvent.args.won);
    const amountPaid = gamePlayedEvent.args.amountPaid;
    const prizePaid = gamePlayedEvent.args.prizePaid;
    const animal = String(gamePlayedEvent.args.animal);

    statusEl.innerHTML = `
      <strong>Resultado da jogada</strong><br /><br />

      Seu palpite: <strong>${guess} - ${bichos[guess]}</strong><br />
      Número sorteado: <strong>${generatedNumber} - ${animal}</strong><br /><br />

      Resultado: <strong>${won ? "🎉 Você ganhou!" : "❌ Você perdeu"}</strong><br /><br />

      Valor pago: ${ethers.formatEther(amountPaid)} ETH<br />
      Prêmio pago: ${ethers.formatEther(prizePaid)} ETH<br /><br />

      Bloco: ${receipt.blockNumber}<br />
      Hash:<br />
      ${tx.hash}
    `;
  } catch (error) {
    console.error(error);
    statusEl.innerText = "Erro ao enviar transação. Veja o console.";
  }
}

function renderBichos() {
  const container = document.querySelector<HTMLDivElement>("#animals")!;

  Object.entries(bichos).forEach(([number, name]) => {
    const button = document.createElement("button");

    button.innerText = `${number} - ${name}`;
    button.classList.add("animal-button");

    button.onclick = () => {
      selectedNumber = Number(number);

      document
        .querySelectorAll(".animal-button")
        .forEach((btn) => btn.classList.remove("selected"));

      button.classList.add("selected");

      const selectedEl = document.querySelector<HTMLDivElement>("#selected")!;
      selectedEl.innerText = `Selecionado: ${name} (${number})`;
    };

    container.appendChild(button);
  });
}

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <main>
    <h1>Animal Guess</h1>

    <button id="connect">Conectar carteira</button>

    <div id="wallet">Carteira não conectada</div>

    <h2>Escolha um bicho</h2>

    <div id="animals"></div>

    <div id="selected">Nenhum bicho selecionado</div>

    <button id="send">Enviar palpite</button>

    <div id="status"></div>
  </main>
`;

renderBichos();

document
  .querySelector<HTMLButtonElement>("#connect")!
  .addEventListener("click", connectWallet);

document
  .querySelector<HTMLButtonElement>("#send")!
  .addEventListener("click", enviarPalpite);