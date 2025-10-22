'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import StoryGenerator from '@/components/StoryGenerator';

export default function Home() {
  const { isConnected } = useAccount();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Header */}
      <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="text-3xl">🌙</div>
              <h1 className="text-2xl font-bold text-white">InSomnia</h1>
            </div>
            <ConnectButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            AI-Powered Bedtime Stories
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Connect your wallet and let AI create personalized bedtime stories 
            based on your keywords. Perfect for creating magical moments before sleep.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
            <div className="text-3xl mb-4">🔗</div>
            <h3 className="text-xl font-semibold text-white mb-2">Web3 Connected</h3>
            <p className="text-gray-300">Secure wallet connection with RainbowKit</p>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
            <div className="text-3xl mb-4">🤖</div>
            <h3 className="text-xl font-semibold text-white mb-2">AI Generated</h3>
            <p className="text-gray-300">Powered by OpenAI for creative storytelling</p>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
            <div className="text-3xl mb-4">✨</div>
            <h3 className="text-xl font-semibold text-white mb-2">Personalized</h3>
            <p className="text-gray-300">Custom stories based on your keywords</p>
          </div>
        </div>

        {/* Story Generator */}
        <StoryGenerator isConnected={isConnected} />

        {/* Instructions */}
        {!isConnected && (
          <div className="mt-8 bg-blue-900/20 border border-blue-500/30 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-300 mb-2">
              How to get started:
            </h3>
            <ol className="text-blue-200 space-y-2">
              <li>1. Click "Connect Wallet" to connect your Web3 wallet</li>
              <li>2. Enter keywords for your story (e.g., "dragon, princess, magic")</li>
              <li>3. Click "Generate Story" to create your personalized bedtime story</li>
              <li>4. Enjoy your AI-generated tale!</li>
            </ol>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800/50 backdrop-blur-sm border-t border-gray-700 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-400">
            <p className="mt-2 text-sm">🌙 Sweet dreams await your stories</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
