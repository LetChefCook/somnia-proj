'use client';

import { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import {useWriteContract , useWaitForTransactionReceipt} from 'wagmi';
const genai = new GoogleGenAI({apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY || '',
});
interface StoryGeneratorProps {
  isConnected: boolean;
}
// Contract ABI - only the mintStory function
const CONTRACT_ABI = [
    {
      "inputs": [
        {
          "internalType": "string[]",
          "name": "keywords",
          "type": "string[]"
        },
        {
          "internalType": "string",
          "name": "content",
          "type": "string"
        }
      ],
      "name": "mintStory",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    }
] as const;
  
  const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_SOMNIA_CONTRACT_ADDRESS as `0x${string}`;
  
export default function StoryGenerator({ isConnected }: StoryGeneratorProps) {
  const [keywords, setKeywords] = useState('');
  const [story, setStory] = useState('');// story rmb to put empty string
  const [isGenerating, setIsGenerating] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  const [error, setError] = useState('');
  const [mintError, setMintError] = useState('');
  const [mintSuccess, setMintSuccess] = useState(false);

    // Wagmi hooks for contract interaction
    const { writeContract, data: hash, isPending, isError: isWriteError } = useWriteContract();
  
    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
      hash,
    });
  const generateStory = async () => {
    const keywordCount = keywords.trim() 
    ? keywords.split(',').map(k => k.trim()).filter(k => k.length > 0).length 
    : 0;
  
    if (keywordCount === 0) {
        setError('Please enter some keywords for your story');
        return;
    }
    
    if (keywordCount <= 2) {
        setError('Please enter more than 2 keywords');
        return;
    }

    setIsGenerating(true);
    setError('');
    setStory('');

    try {
        console.log(genai);
        // return;

        const response = await genai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Create a bedtime story using these keywords: ${keywords}`,
        });
        const generatedStory = response.text || 'Failed to generate story';
        setStory(generatedStory || 'Failed to generate story');    
        setIsMinting(true);

    } catch (err) {
      console.error('Error generating story:', err);
      setError('Failed to generate story. Please check your API key and try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const mintStory = async () => {
    try {
    setIsMinting(true);
    setMintError('');
    setMintSuccess(false);
    // Split keywords into array
      const keywordsArray = keywords
      .split(',')
      .map(k => k.trim())
      .filter(k => k.length > 0);
            // Call the smart contract
            writeContract({
                address: CONTRACT_ADDRESS,
                abi: CONTRACT_ABI,
                functionName: 'mintStory',
                args: [keywordsArray, story],
              });
              
    } catch (error) {
        console.error('Error minting story:', error);
        setIsMinting(false);
    }
    console.log('Minting story...');
  };
    // Handle transaction confirmation
    if (isConfirmed && isMinting) {
        setMintSuccess(true);
        setIsMinting(false);
      }
    
      // Handle transaction error
      if (isWriteError && isMinting) {
        setMintError('Transaction failed. Please try again.');
        setIsMinting(false);
      }

  if (!isConnected) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 text-center">
        <p className="text-gray-400">Please connect your wallet to generate bedtime stories</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-2xl font-bold text-white mb-4">🌙 Bedtime Story Generator</h2>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="keywords" className="block text-sm font-medium text-gray-300 mb-2">
            Enter keywords for your story:
          </label>
          <input
            id="keywords"
            type="text"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="e.g., dragon, princess, magic forest, adventure"
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            disabled={isGenerating}
          />
        </div>

        <button
          onClick={generateStory}
          disabled={isGenerating || !keywords.trim()}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating story...
            </span>
          ) : (
            '✨ Generate Story'
          )}
        </button>

        {error && (
          <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {story && (
          <div className="bg-gray-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-3">Your Bedtime Story:</h3>
            <div className="text-gray-200 leading-relaxed whitespace-pre-wrap">
              {story}
            </div>
            <button
          onClick={mintStory}
          disabled={isMinting}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 disabled:cursor-not-allowed"
        >
          {isMinting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Minting Story...
            </span>
          ) : (
            'Mint Story ⚒️'
          )}
        </button>
        {mintError && (
          <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-lg">
            {mintError}
          </div>
        )}
        {mintSuccess && (
          <div className="bg-green-900/50 border border-green-500 text-green-200 px-4 py-3 rounded-lg">
            ✅ Story minted successfully! Transaction hash: {hash}
          </div>
        )}
          </div>
        )}
      </div>
    </div>
  );
}
