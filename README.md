# 🧰 Work Experience Tracker

A beautiful and intuitive React application for tracking and showcasing your professional work experience. Built with modern design principles, smooth animations, and a focus on user experience.

## ✨ Features

- **🎨 Modern & Beautiful UI**
  - Clean, minimal design with gradient backgrounds
  - Smooth animations and transitions
  - Responsive layout that works on all devices
  - Eye-friendly color scheme with professional aesthetics

- **📊 Smart Experience Management**
  - Real-time calculations: Automatically calculates total work experience
  - Company autocomplete: Integrated with Clearbit API for company logos and details
  - **Job titles autocomplete: Fast local search + JSearch API for comprehensive position suggestions**
  - **Location autocomplete: Smart city suggestions with 300+ major cities worldwide**
  - Flexible date handling: Support for current positions and precise duration calculations
  - Achievement tracking: Add and manage key accomplishments for each role

- **🚀 Enhanced User Experience**
  - Interactive forms: Intuitive form with validation and smart defaults
  - Dynamic content: Add, edit, and remove experiences with smooth animations
  - Professional timeline: Visual representation of your career journey
  - Export-ready format: Clean layout perfect for screenshots and presentations

- **🎯 Key Capabilities**
  - Track multiple work experiences across different companies
  - Automatic company logo fetching and branding
  - Location and role-based organization
  - Achievement highlighting with bullet points
  - Total experience calculation across all positions
  - Professional summary cards with statistics

## 🏗️ Technical Stack

- **React 19.1.0** – Latest React with modern hooks and features
- **Tailwind CSS** – Utility-first CSS framework for rapid styling
- **Lucide React** – Beautiful and consistent icons
- **Clearbit API** – Company data and logo integration
- **JSearch API** – Job titles and position data for comprehensive autocomplete
- **GeoDB Cities API** – City data for location autocomplete (with local fallback)
- **JSON Configuration** – External job titles and cities data for maintainability
- **Modern JavaScript** – ES6+ features and best practices

## 📸 Preview

The application features:

- Header section with gradient branding and clear navigation
- Summary card showing total experience and company count
- Experience cards with company logos, duration badges, and achievement lists
- Interactive forms with company autocomplete and date validation
- Empty state with call-to-action for first-time users

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/gitforaniket/work-exp-app.git
   cd work-experience-tracker
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Set up API keys (Optional but recommended)**
   ```bash
   # Create environment file
   echo "REACT_APP_JSEARCH_API_KEY=your_api_key_here" > .env.local
   ```
   - Get your JSearch API key from [RapidAPI JSearch](https://rapidapi.com/letscrape-6bRBa3QguO5/api/jsearch)
   - Replace `your_api_key_here` with your actual API key
   - **Note:** The app works without the API key using local job titles only
4. **Start the development server**
   ```bash
   npm start
   ```
5. **Open your browser**
   - Navigate to [http://localhost:3000](http://localhost:3000) to view the application

### Build for Production

```bash
npm run build
```
This creates an optimized production build in the `build` folder.

## 🎯 How to Use

- **Add Your First Experience**
  - Click "Add Your First Experience" or the "+" button
  - Fill in company details (autocomplete will suggest logos)
  - **Add position with smart autocomplete** (300+ local titles + API suggestions)
  - **Add location with city autocomplete** (300+ major cities worldwide)
  - Add date information
  - Include job description and key achievements

- **Manage Your Timeline**
  - View your total experience calculation
  - Edit or remove existing experiences
  - Mark current positions with the "Currently working here" checkbox

- **Track Your Growth**
  - See visual duration badges for each role
  - Monitor your career progression
  - Export or screenshot your professional timeline

## 📁 Project Structure

```
work-experience-tracker/
├── public/
│   ├── index.html               # Main HTML template
│   └── favicon.ico              # Application favicon
├── src/
│   ├── components/
│   │   ├── cards/
│   │   │   ├── ExperienceCard.js    # Individual experience display
│   │   │   └── SummaryCard.js       # Total experience summary
│   │   ├── common/
│   │   │   ├── Button.js            # Reusable button component
│   │   │   └── Input.js             # Enhanced input with icons
│   │   ├── forms/
│   │   │   └── ExperienceForm.js    # Experience input form with autocomplete
│   │   └── layout/
│   │       ├── EmptyState.js        # Empty state component
│   │       └── Header.js            # Application header
│   ├── config/
│   │   ├── jobTitles.json           # Job titles configuration (300+ positions)
│   │   └── cities.json              # Cities configuration (300+ major cities)
│   ├── hooks/
│   │   └── useExperience.js         # Custom hook for state management
│   ├── utils/
│   │   └── dateUtils.js             # Date calculation utilities
│   ├── App.js                       # Main application component
│   ├── index.css                    # Global styles and animations
│   └── index.js                     # Application entry point
├── .gitignore                      # Git ignore rules
├── package.json                     # Dependencies and scripts
├── postcss.config.js                # PostCSS configuration
├── tailwind.config.js               # Tailwind CSS configuration
└── README.md                        # Project documentation
```

## 🔧 Configuration

### **API Keys Setup**

The app uses two external APIs for enhanced functionality:

#### **JSearch API (Job Titles Autocomplete)**
- **Purpose:** Provides comprehensive job titles and position suggestions
- **Setup:** 
  1. Get API key from [RapidAPI JSearch](https://rapidapi.com/letscrape-6bRBa3QguO5/api/jsearch)
  2. Create `.env.local` file: `REACT_APP_JSEARCH_API_KEY=your_api_key_here`
- **Fallback:** App works perfectly without API using 60+ local job titles
- **Usage:** Hybrid approach - fast local search + smart API fallback

#### **Clearbit API (Company Data)**
- **Purpose:** Company logos and information
- **Setup:** No API key required (free tier)
- **Usage:** Automatic company logo fetching

#### **GeoDB Cities API (Location Autocomplete)**
- **Purpose:** Provides city data for location autocomplete
- **Setup:** No API key required (free tier)
- **Fallback:** App works perfectly without API using 300+ local cities
- **Usage:** Hybrid approach - fast local search + smart API fallback

### **Styling Configuration**
- **Tailwind CSS**
  - The project uses Tailwind CSS for styling. Configuration is in `tailwind.config.js`:
    - Content paths for purging unused styles
    - Custom theme extensions
    - Plugin configurations
- **PostCSS**
  - PostCSS configuration in `postcss.config.js` includes:
    - Tailwind CSS processing
    - Autoprefixer for browser compatibility

## 🎨 Design Features

- **Animations**
  - Fade-in animations for initial page load
  - Slide-up animations for cards and forms
  - Hover effects on interactive elements
  - Smooth transitions between states
- **Color Scheme**
  - Primary: Indigo to purple gradients
  - Secondary: Professional grays and whites
  - Accents: Green for success, red for actions
  - Backgrounds: Subtle gradients from indigo to purple
- **Typography**
  - Headings: Bold, gradient text for emphasis
  - Body: Clean, readable sans-serif
  - Labels: Medium weight for form clarity

## 🔒 Privacy & Data

- **Local storage:** All data is stored in browser memory during the session
- **No external storage:** No data is sent to external servers (except APIs)
- **API usage:** 
  - Clearbit API: Company logo fetching
  - JSearch API: Job titles autocomplete (optional, falls back to local data)
  - GeoDB Cities API: Location autocomplete (optional, falls back to local data)
- **Hybrid approach:** Fast local search + smart API fallback for comprehensive results

## 🛠️ Development

### Available Scripts

- `npm start` – Start development server
- `npm run build` – Build for production
- `npm test` – Run test suite
- `npm run eject` – Eject from Create React App

### Project Cleanup

The project has been cleaned up to remove unnecessary files:
- Removed empty `App.css` file
- Removed unused `reportWebVitals.js`
- Removed `.DS_Store` files
- Removed `.vite` directory (not needed for Create React App)
- Organized job titles and cities in external JSON configuration

### Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Acknowledgments

- Clearbit for company data and logos
- JSearch API for comprehensive job titles data
- GeoDB Cities API for location autocomplete
- Lucide for beautiful icons
- Tailwind CSS for the styling framework
- React team for the amazing framework

## 📧 Contact

- Aniket Anil Kumar - [GitHub Profile](https://github.com/gitforaniket)
- Project Link: [https://github.com/gitforaniket/work-exp-app](https://github.com/gitforaniket/work-exp-app)

---

Built with ❤️ using React and modern web technologies

## 🧪 Running & Writing Tests

This project uses **Jest** and **React Testing Library** for unit testing.

### Test Directory Structure

All test files are placed in a single `src/__tests__` directory. For example:

```
src/__tests__/Button.test.js
src/__tests__/Input.test.js
src/__tests__/Header.test.js
src/__tests__/ExperienceCard.test.js
src/__tests__/SummaryCard.test.js
src/__tests__/EmptyState.test.js
src/__tests__/ExperienceForm.test.js
```

### Running Tests

To run all tests:

```bash
npm test
```

or

```bash
yarn test
```

This will run all test files matching `*.test.js` in the project.

### Writing Tests
- Use [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for rendering and interacting with components.
- Use [Jest](https://jestjs.io/docs/getting-started) for assertions and mocking.
- Place new test files in the `src/__tests__` directory.

### Test Coverage

To generate a test coverage report, run:

```bash
npm test -- --coverage
```

This will output a summary in the terminal and generate a detailed HTML report in the `coverage/` directory. Open `coverage/lcov-report/index.html` in your browser to view the full coverage report.

## 🚀 Deployment to GitHub Pages

This app can be deployed to GitHub Pages using the following commands:

```bash
npm run deploy
```

This will build the app and publish it to the `gh-pages` branch. Your app will be live at:

https://gitforaniket.github.io/work-exp-app/

If you make changes, just run `npm run deploy` again to update the live site.