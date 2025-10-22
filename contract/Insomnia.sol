// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title Imsomnia
 * @dev Simple NFT contract for minting unique stories with keywords
 */
contract Imsomnia is ERC721, Ownable {
    
    uint256 private _tokenIdCounter;
    
    struct Story {
        string[] keywords;
        string content;
        uint256 timestamp;
    }
    
    // Mapping from token ID to Story
    mapping(uint256 => Story) public stories;
    
    // Mapping to track if a story hash already exists (prevent duplicates)
    mapping(bytes32 => bool) public storyExists;
    
    // Events
    event StoryMinted(
        uint256 indexed tokenId,
        address indexed owner,
        string[] keywords,
        string content
    );
    
    constructor() ERC721("Imsomnia", "IMSM") Ownable(msg.sender) {}
    
    /**
     * @dev Mint a new Story NFT
     * @param keywords Array of keywords for the story
     * @param content The story content generated from frontend
     */
    function mintStory(
        string[] memory keywords,
        string memory content
    ) public returns (uint256) {
        require(keywords.length > 0, "Need at least one keyword");
        require(bytes(content).length > 0, "Story content cannot be empty");
        
        // Create hash to ensure story uniqueness
        bytes32 storyHash = keccak256(abi.encodePacked(content));
        require(!storyExists[storyHash], "This story already exists");
        
        _tokenIdCounter++;
        uint256 newTokenId = _tokenIdCounter;
        
        // Mint NFT
        _safeMint(msg.sender, newTokenId);
        
        // Store story data
        stories[newTokenId] = Story({
            keywords: keywords,
            content: content,
            timestamp: block.timestamp
        });
        
        // Mark story as existing
        storyExists[storyHash] = true;
        
        emit StoryMinted(newTokenId, msg.sender, keywords, content);
        
        return newTokenId;
    }
    
    /**
     * @dev Get story data by token ID
     * @param tokenId The token ID to query
     */
    function getStory(uint256 tokenId) public view returns (
        string[] memory keywords,
        string memory content,
        uint256 timestamp,
        address owner
    ) {
        require(_ownerOf(tokenId) != address(0), "Token does not exist");
        
        Story memory story = stories[tokenId];
        return (
            story.keywords,
            story.content,
            story.timestamp,
            ownerOf(tokenId)
        );
    }
    
    /**
     * @dev Get all keywords for a token
     * @param tokenId The token ID to query
     */
    function getKeywords(uint256 tokenId) public view returns (string[] memory) {
        require(_ownerOf(tokenId) != address(0), "Token does not exist");
        return stories[tokenId].keywords;
    }
    
    /**
     * @dev Get story content for a token
     * @param tokenId The token ID to query
     */
    function getContent(uint256 tokenId) public view returns (string memory) {
        require(_ownerOf(tokenId) != address(0), "Token does not exist");
        return stories[tokenId].content;
    }
    
    /**
     * @dev Get total number of minted stories
     */
    function totalSupply() public view returns (uint256) {
        return _tokenIdCounter;
    }
    
    /**
     * @dev Check if a story content already exists
     * @param content The story content to check
     */
    function isStoryUnique(string memory content) public view returns (bool) {
        bytes32 storyHash = keccak256(abi.encodePacked(content));
        return !storyExists[storyHash];
    }
}