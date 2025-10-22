# InSomnia - AI Bedtime Stories dApp

A beautiful dApp that generates personalized bedtime stories using AI and Web3 technology powered by Somnia

## Features

- 🌙 **Dark Theme UI** - Beautiful dark theme with gradient backgrounds
- 🔗 **Web3 Integration** - RainbowKit wallet connection
- 🤖 **AI Story Generation** - OpenAI-powered bedtime story creation
- ✨ **Personalized Stories** - Custom stories based on user keywords
- 📱 **Responsive Design** - Works on desktop and mobile

## Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **RainbowKit** - Wallet connection
- **Wagmi** - Ethereum interaction
- **Gemini API** - AI story generation
- **Yarn** - Package manager
- **Remix IDE** - Smart contract creation

## Setup Instructions

1. **Install dependencies:**
   ```bash
   yarn install
   ```
2. **Deploying Smart Contract:**
   Copy the codes in contract/Insomnia.sol to [remix IDE](https://remix.ethereum.org) to deploy contract under Somnia Testnet and get the contract address.

3. **Set up environment variables:**
   Create a `.env.local` file in the root directory with:
   ```env
   NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
   NEXT_PUBLIC_SOMNIA_CONTRACT_ADDRESS=YOUR_DEPLOYED_CONTRACT
   NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_wallet_connect_project_id_here
   ```

4. **Get API Keys:**
   - **Gemini API Key**: Get from [AI Studio Google](https://aistudio.google.com/)
   - **WalletConnect Project ID**: Get from [WalletConnect Cloud](https://cloud.walletconnect.com/) (optional)

5. **Run the development server:**
   ```bash
   yarn dev
   ```

6. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## How to Use

1. **Connect Wallet**: Click the "Connect Wallet" button to connect your Web3 wallet
2. **Enter Keywords**: Type keywords for your story (e.g., "dragon, princess, magic forest")
3. **Generate Story**: Click "Generate Story" to create your personalized bedtime story
4. **Minting Story**: Click "Mint Story" to mint your own unique story
5. **Enjoy**: Read your AI-generated tale!


## License

MIT License #seraph