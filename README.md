# FinTrack - Personal Finance Assistant

A comprehensive AI-powered personal finance platform built with Next.js. Your complete financial companion for investment planning, tax optimization, and wealth management with intelligent guidance.

## 🚀 Features

- **🤖 AI-Powered Conversational Coach**: Get personalized financial advice through natural language chat
- **📊 Tax Optimization Simulator**: Calculate potential tax savings with detailed recommendations
- **📝 User Registration System**: Comprehensive form to collect user profiles and preferences
- **🔐 Dashboard Authentication**: MongoDB-backed login with secure session cookies
- **� Google Sheets Integration**: Automatic data storage and management for user registrations
- **�📱 Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **🎯 Strategic Business Blueprint**: Three-phase development roadmap visualization
- **⚡ Real-time AI Integration**: Live responses powered by Google Gemini API
- **🎨 Modern UI/UX**: Clean, professional design with smooth animations
- **🔔 Success Notifications**: Beautiful success states with action buttons after form submission

## 🛠️ Technology Stack

- **Framework**: Next.js 14.0.4 (React 18)
- **Styling**: Tailwind CSS 3.3.0
- **AI Integration**: Google Gemini 2.5 Flash API
- **Data Storage**: Google Sheets API integration
- **Authentication**: Google Service Account (Environment Variables)
- **Language**: JavaScript (ES6+)
- **Architecture**: Component-based with app directory structure

## 📁 Project Structure

```
fintrack-finance-app/
├── app/
│   ├── components/          # React components
│   │   ├── Header.js        # Navigation and branding
│   │   ├── HeroSection.js   # Main landing section
│   │   ├── OpportunitySection.js
│   │   ├── SolutionSection.js
│   │   ├── DemoSection.js
│   │   ├── ConversationalCoach.js  # AI chat interface
│   │   ├── TaxSimulator.js  # Tax calculation tool
│   │   ├── BlueprintSection.js
│   │   ├── CallToActionSection.js
│   │   ├── FeatureCard.js
│   │   ├── form.js          # User registration form (5 sections)
│   │   └── Footer.js        # Site footer
│   ├── api/                 # API routes
│   │   └── submit-form/
│   │       └── route.js     # Google Sheets integration
│   ├── globals.css          # Global styles
│   ├── layout.js           # Root layout component
│   └── page.js             # Main page component
├── .env.local              # Environment variables (create from .env.example)
├── .env.example            # Environment variables template
├── test-sheets.js          # Google Sheets connection test script
├── GOOGLE_SHEETS_SETUP.md  # Detailed setup guide for Google Sheets
├── next.config.js          # Next.js configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS configuration
├── package.json            # Dependencies and scripts
├── index.html              # Static fallback/redirect page
├── serve.bat               # Development server launcher (Windows)
└── README.md                
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone or download the project**
   ```bash
   cd "finance assistant"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Copy the example file
   cp .env.example .env.local
   
   # Edit .env.local and add your API keys
   # For Gemini AI:
   NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
   
   # For Google Sheets (follow GOOGLE_SHEETS_SETUP.md for detailed setup):
   GOOGLE_SHEETS_ID=your_google_sheets_id_here
   GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL=your_service_account_email
   # ... and other Google credentials (see .env.example)
   ```

4. **Set up Google Sheets integration (optional)**
   ```bash
   # Follow the detailed guide
   cat GOOGLE_SHEETS_SETUP.md
   
   # Test your setup
   node test-sheets.js
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or use the provided batch file
   serve.bat
   ```

5. **Open your browser**
   ```
   http://localhost:3000
   ```

## 🧪 Testing Google Sheets Integration

```bash
# Test the Google Sheets connection
node test-sheets.js

# This will verify:
# ✅ Environment variables are set correctly
# ✅ Google Sheets API connection works
# ✅ Service account has proper permissions
# ✅ Sheet structure is correct
```

## 🔧 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🌟 Core Components

### 1. **Conversational Coach**
- Natural language financial Q&A
- Markdown-formatted AI responses
- Example prompts for user guidance
- Real-time chat interface

### 2. **Tax Optimization Simulator**
- Income and investment input forms
- AI-powered tax analysis
- Detailed saving recommendations
- Interactive results display

### 3. **User Registration System**
- Comprehensive 5-section form:
  - Personal Information (name, email, phone)
  - Professional Details (income, employment, location)
  - Financial Profile (investments, tax goals, experience)
  - Investment Preferences (risk tolerance, timeline, goals)
  - Additional Information (suggestions, newsletter signup)
- Form validation and error handling
- Success notification with action buttons
- "Connect with Us" functionality

### 4. **Google Sheets Integration**
- Automatic form data submission to Google Sheets
- Secure environment variable authentication
- Real-time data storage with timestamps
- Structured data collection for analysis

### 5. **Strategic Blueprint**
- Three-phase business development timeline
- Trust Foundation → Coach Pro → Goal Accelerator
- Responsive alternating layout
- Progress indicators

### 6. **Modern UI Features**
- Gradient backgrounds and glass morphism effects
- Smooth transitions and animations
- Mobile-first responsive design
- Professional typography (Inter font)
- Dynamic form states and notifications

## 🔐 Environment Variables

The application uses environment variables for secure API configuration:

```env
# Gemini AI Configuration
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
NEXT_PUBLIC_API_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key

# Google Sheets Integration (for form submissions)
GOOGLE_SHEETS_ID=your_google_sheets_id_here
GOOGLE_SERVICE_ACCOUNT_TYPE=service_account
GOOGLE_SERVICE_ACCOUNT_PROJECT_ID=your_project_id
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY_ID=your_private_key_id
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----"
GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_SERVICE_ACCOUNT_CLIENT_ID=your_client_id
GOOGLE_SERVICE_ACCOUNT_AUTH_URI=https://accounts.google.com/o/oauth2/auth
GOOGLE_SERVICE_ACCOUNT_TOKEN_URI=https://oauth2.googleapis.com/token

# Dashboard Auth (MongoDB)
MONGODB_URI=your_mongodb_connection_string_here
JWT_SECRET=replace_with_a_long_random_secret

# Note: NEXT_PUBLIC_ prefix exposes variables to the browser
# Server-side only variables (like Google credentials) don't need this prefix
```

## 📊 Google Sheets Setup

For detailed Google Sheets integration setup, see `GOOGLE_SHEETS_SETUP.md`:

1. **Create Google Cloud Project**
2. **Enable Google Sheets API**
3. **Create Service Account**
4. **Set up Google Sheet with proper headers**
5. **Configure environment variables**
6. **Test connection with `node test-sheets.js`**

## 📱 Browser Compatibility

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms
- **Netlify**: Compatible with static export
- **Railway**: Full-stack deployment
- **Heroku**: Container or buildpack deployment

## 🛡️ Security Notes

- API keys are stored in environment variables
- Client-side variables use `NEXT_PUBLIC_` prefix for browser access
- Google Service Account credentials are server-side only
- Sensitive data never committed to version control
- `.env.local` and service account files excluded from git
- All secrets removed from git history for GitHub compliance

## 📝 Data Collection

The registration form collects:
- **Personal**: Name, email, phone number
- **Professional**: Annual income, employment type, city
- **Financial**: Current investments, tax saving goals, experience level
- **Preferences**: Risk tolerance, investment horizon, primary goals
- **Additional**: User suggestions and newsletter preferences

All data is automatically saved to Google Sheets with timestamps for analysis and follow-up.

## 🎯 Performance Features

- **Server-side rendering** with Next.js
- **Optimized components** for fast loading
- **Responsive images** and lazy loading
- **CSS optimization** with Tailwind
- **Progressive enhancement** for better UX

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

© 2025 FinTrack. AI-powered personal finance assistant for comprehensive wealth management.

## 📞 Support

For questions, issues, or feature requests:
- Review `GOOGLE_SHEETS_SETUP.md` for integration setup
- Run `node test-sheets.js` to test Google Sheets connection
- Check the demo section for live examples
- Review component documentation in the code
- Open an issue for bug reports
- Contact support through the application form

## 🆕 Recent Updates

- ✅ **Rebranded** from tax optimizer to comprehensive finance assistant
- ✅ **Added** comprehensive 5-section user registration form
- ✅ **Integrated** Google Sheets for automatic data collection
- ✅ **Implemented** success notifications with action buttons
- ✅ **Secured** authentication with environment variables
- ✅ **GitHub compliant** - removed all secrets and large files

---

**<center>Built with ❤️ using Next.js, AI, and Google Sheets</center>**
