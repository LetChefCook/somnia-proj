# Somnia - AI Bedtime Stories dApp

A beautiful dark-themed one-page dApp that generates personalized bedtime stories using AI and Web3 technology.

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
- **OpenAI API** - AI story generation
- **Yarn** - Package manager

## Setup Instructions

1. **Install dependencies:**
   ```bash
   yarn install
   ```

2. **Set up environment variables:**
   Create a `.env.local` file in the root directory with:
   ```env
   NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key_here
   NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_wallet_connect_project_id_here
   ```

3. **Get API Keys:**
   - **OpenAI API Key**: Get from [OpenAI Platform](https://platform.openai.com/api-keys)
   - **WalletConnect Project ID**: Get from [WalletConnect Cloud](https://cloud.walletconnect.com/) (optional)

4. **Run the development server:**
   ```bash
   yarn dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## How to Use

1. **Connect Wallet**: Click the "Connect Wallet" button to connect your Web3 wallet
2. **Enter Keywords**: Type keywords for your story (e.g., "dragon, princess, magic forest")
3. **Generate Story**: Click "Generate Story" to create your personalized bedtime story
4. **Enjoy**: Read your AI-generated tale!

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with wallet providers
│   ├── page.tsx            # Main dApp page
│   └── globals.css         # Global styles
├── components/
│   └── StoryGenerator.tsx  # Story generation component
└── lib/
    └── wallet.tsx          # Wallet configuration
```

## Customization

- **Colors**: Modify the gradient backgrounds in `page.tsx`
- **Story Length**: Adjust `max_tokens` in `StoryGenerator.tsx`
- **Story Style**: Modify the system prompt in `StoryGenerator.tsx`
- **UI Components**: Customize the Tailwind classes

## Deployment

The app is ready for deployment on platforms like Vercel, Netlify, or any other hosting service that supports Next.js.

## License

MIT License - feel free to use this project for your own dApps!