// ===================================
// Tripzverse - Gemini AI Integration
// AI-Powered Destination Guide
// ===================================

const GEMINI_API_KEY = 'AIzaSyAX4ZANh5teVEKpfKV8eJfHTAeuER9u_GY';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

// Initialize AI Chat
document.addEventListener('DOMContentLoaded', function () {
    initAIChat();
});

function initAIChat() {
    const chatForm = document.getElementById('chatForm');
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');
    const suggestionChips = document.querySelectorAll('.suggestion-chip');

    if (!chatForm) return;

    // Handle form submission
    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const message = chatInput.value.trim();

        if (message) {
            await sendMessage(message);
            chatInput.value = '';
        }
    });

    // Handle suggestion chips
    suggestionChips.forEach(chip => {
        chip.addEventListener('click', async () => {
            const query = chip.getAttribute('data-query');
            if (query) {
                chatInput.value = query;
                await sendMessage(query);
                chatInput.value = '';
            }
        });
    });
}

// Send message to AI
async function sendMessage(message) {
    const chatMessages = document.getElementById('chatMessages');
    const chatSend = document.getElementById('chatSend');

    // Add user message
    addMessage(message, 'user');

    // Disable send button and show loading
    chatSend.disabled = true;
    showTypingIndicator();

    try {
        const response = await fetchGeminiResponse(message);
        removeTypingIndicator();
        addMessage(response, 'ai');
    } catch (error) {
        removeTypingIndicator();
        addMessage('Sorry, I encountered an error. Please try again.', 'ai');
        console.error('Gemini API Error:', error);
    }

    chatSend.disabled = false;
    scrollToBottom();
}

// Fetch response from Gemini API
async function fetchGeminiResponse(userMessage) {
    const systemPrompt = `You are a knowledgeable and friendly travel guide AI assistant for Tripzverse. 
Your role is to provide helpful, accurate, and engaging information about travel destinations worldwide.

When users ask about a destination, provide:
1. 🏛️ **Famous Tourist Spots & Landmarks** - Top attractions and must-visit places
2. 🍜 **Local Cuisine & Food** - Must-try dishes and food recommendations
3. 🌤️ **Best Time to Visit** - Weather and seasonal information
4. 🎭 **Culture & Traditions** - Local customs and cultural insights
5. 💡 **Travel Tips** - Practical advice for visitors
6. 💰 **Budget Information** - Approximate costs and money-saving tips

Format your responses with emojis and clear sections for easy reading.
Keep responses informative but concise (around 300-400 words).
Be enthusiastic and helpful!`;

    const requestBody = {
        contents: [
            {
                role: "user",
                parts: [
                    {
                        text: `${systemPrompt}\n\nUser question: ${userMessage}`
                    }
                ]
            }
        ],
        generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024
        }
    };

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();

    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        return data.candidates[0].content.parts[0].text;
    }

    throw new Error('Invalid API response');
}

// Add message to chat
function addMessage(content, type) {
    const chatMessages = document.getElementById('chatMessages');

    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${type}`;

    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = type === 'ai' ? '🤖' : '👤';

    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';

    // Parse markdown-like formatting
    const formattedContent = formatMessage(content);
    contentDiv.innerHTML = formattedContent;

    messageDiv.appendChild(avatar);
    messageDiv.appendChild(contentDiv);

    chatMessages.appendChild(messageDiv);
    scrollToBottom();
}

// Format message with basic markdown support
function formatMessage(text) {
    // Convert **bold** to <strong>
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Convert *italic* to <em>
    text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Convert ### headings
    text = text.replace(/^### (.*?)$/gm, '<h4>$1</h4>');
    text = text.replace(/^## (.*?)$/gm, '<h3>$1</h3>');

    // Convert bullet points
    text = text.replace(/^[•\-\*] (.*?)$/gm, '<li>$1</li>');
    text = text.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>');

    // Convert numbered lists
    text = text.replace(/^\d+\. (.*?)$/gm, '<li>$1</li>');

    // Convert line breaks to paragraphs
    const paragraphs = text.split(/\n\n+/);
    text = paragraphs.map(p => {
        if (p.startsWith('<h') || p.startsWith('<ul') || p.startsWith('<ol')) {
            return p;
        }
        return `<p>${p.replace(/\n/g, '<br>')}</p>`;
    }).join('');

    return text;
}

// Show typing indicator
function showTypingIndicator() {
    const chatMessages = document.getElementById('chatMessages');

    const typingDiv = document.createElement('div');
    typingDiv.className = 'chat-message ai typing-message';
    typingDiv.innerHTML = `
        <div class="message-avatar">🤖</div>
        <div class="message-content">
            <div class="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;

    chatMessages.appendChild(typingDiv);
    scrollToBottom();
}

// Remove typing indicator
function removeTypingIndicator() {
    const typingMessage = document.querySelector('.typing-message');
    if (typingMessage) {
        typingMessage.remove();
    }
}

// Scroll chat to bottom
function scrollToBottom() {
    const chatMessages = document.getElementById('chatMessages');
    if (chatMessages) {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

// Export for use in other modules
window.TravelAI = {
    sendMessage,
    fetchGeminiResponse
};
