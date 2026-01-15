# 🌍 Tripzverse.in - Travel Booking Platform

A modern, feature-rich travel booking platform with an integrated AI-powered destination guide. Built with HTML, CSS, and JavaScript featuring a beautiful purple-violet glassmorphism design with light/dark mode support.

![Tripzverse Banner](https://images.unsplash.com/photo-1488085061387-422e29b40080?w=800&h=400&fit=crop)

## ✨ Features

### 🏨 Multi-Service Booking
- **Hotels** - Browse and book luxury, boutique, resort, and budget-friendly accommodations worldwide
- **Buses** - Search and book bus tickets across major routes globally
- **Trains** - Reserve train tickets on iconic routes like Shinkansen, Glacier Express, and Eurostar
- **Local Transport** - Book cabs, auto-rickshaws, bikes, and self-drive rentals

### 🤖 AI-Powered Travel Guide
- Integrated AI assistant for destination guidance
- Get detailed information about any destination including:
  - Famous tourist spots & landmarks
  - Local cuisine recommendations
  - Best time to visit
  - Culture & traditions
  - Budget information
  - Travel tips

### 🎨 Premium Design
- **Glassmorphism UI** - Modern frosted glass aesthetic
- **Purple-Violet Theme** - Elegant color palette
- **Light/Dark Mode** - Seamless theme switching with persistence
- **Smooth Animations** - Fade-in, hover effects, and micro-interactions
- **Fully Responsive** - Works beautifully on all devices

### 🌐 World Destinations
Browse famous destinations across:
- 🌏 Asia (Tokyo, Bali, Maldives, Bangkok)
- 🌍 Europe (Paris, Swiss Alps, Rome)
- 🌎 Americas (New York, Machu Picchu)
- 🌍 Africa (Cape Town, Marrakech)
- 🌏 Oceania (Sydney)

## 📁 Project Structure

```
tripzverse-travel/
├── index.html      # Main HTML file with all sections
├── styles.css      # Complete CSS with design system & themes
├── script.js       # Core JavaScript functionality
├── gemini.js       # AI assistant integration
└── README.md       # Documentation
```

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A Gemini API key (for AI features)

### Installation

1. **Clone or Download** this repository
   ```bash
   git clone https://github.com/yourusername/tripzverse-travel.git
   ```

2. **Open the Project**
   - Simply open `index.html` in your web browser
   - Or use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js (with http-server)
   npx http-server
   ```

3. **Configure API Key** (for AI features)
   - Open `gemini.js`
   - Replace the API key with your own:
   ```javascript
   const GEMINI_API_KEY = 'YOUR_API_KEY_HERE';
   ```

## 📖 File Descriptions

### `index.html`
The main HTML structure containing:
- Navigation bar with responsive menu
- Hero section with search tabs (Hotels, Buses, Trains, Transport)
- Hotels section with filterable cards
- Buses section with route listings
- Trains section with scenic routes
- Local transport section with fare calculator
- World destinations gallery
- AI Assistant chat interface
- Footer with newsletter signup

### `styles.css`
Complete design system including:
- CSS custom properties (variables) for theming
- Light and dark mode definitions
- Glassmorphism effects with backdrop blur
- Responsive layouts and media queries
- Animation keyframes
- Component styles for all sections

### `script.js`
Core functionality:
- Theme toggle with localStorage persistence
- Navigation scroll effects
- Search tab switching
- Counter animations (stats)
- Scroll-triggered animations
- Hotel and destination filters
- Fare calculator logic
- Button ripple effects

### `gemini.js`
AI assistant integration:
- API connection for travel guidance
- Chat UI management
- Message formatting (markdown support)
- Typing indicators
- Suggestion chip handling

## 🎨 Theme Customization

### Colors
The theme uses CSS custom properties for easy customization:

```css
:root {
    --primary: #8b5cf6;        /* Main purple */
    --primary-light: #a78bfa;  /* Light purple */
    --primary-dark: #7c3aed;   /* Dark purple */
    --secondary: #c084fc;      /* Secondary violet */
    --accent: #a855f7;         /* Accent color */
}
```

### Changing Theme Colors
1. Open `styles.css`
2. Modify the color values in `:root` for light mode
3. Modify values in `[data-theme="dark"]` for dark mode

## 🔧 Configuration

### AI Assistant Setup
1. Get an API key from [Google AI Studio](https://aistudio.google.com/)
2. Open `gemini.js`
3. Update the API key:
```javascript
const GEMINI_API_KEY = 'your-api-key-here';
```

### Adding New Destinations
Add new destination cards in `index.html`:
```html
<div class="destination-card" data-continent="continent-name">
    <div class="dest-image">
        <img src="image-url" alt="Destination Name">
        <div class="dest-overlay">
            <span class="dest-country">Country</span>
            <h3>Destination Name</h3>
            <div class="dest-info">
                <span>🌡️ Weather</span>
                <span>💰 Budget Range</span>
            </div>
        </div>
    </div>
</div>
```

## 📱 Responsive Design

The platform is fully responsive with breakpoints:
- **Desktop**: 1280px+ (full layout)
- **Tablet**: 768px - 1279px (adjusted grid)
- **Mobile**: Below 768px (stacked layout, hamburger menu)

## 🌐 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ⚠️ Internet Explorer (not supported)

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, Flexbox, Grid, Animations
- **JavaScript (ES6+)** - Async/await, Fetch API, IntersectionObserver
- **Google Fonts** - Inter, Outfit, Playfair Display
- **Gemini API** - For the AI travel assistant feature

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Contact

- Website: [tripzverse.in](https://tripzverse.in)
- Email: contact@tripzverse.in

---

Made with ❤️ by Tripzverse Team
