# Document Processing Frontend

A modern, responsive Next.js frontend application for processing documents with AI-powered and standard OCR extraction methods. Built with TypeScript, Tailwind CSS, and Shadcn UI components.

## 🚀 Features

- **AI-Powered Document Processing**: Google Gemini integration for intelligent text extraction
- **Standard OCR Processing**: Tesseract-based extraction for scanned documents
- **Multi-Format Support**: Handles PDF, PNG, JPG, JPEG files
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark Mode**: Built-in dark/light theme switching
- **Real-time Processing**: WebSocket integration for live updates
- **File Management**: Secure upload and storage with Supabase
- **Analytics Dashboard**: Comprehensive reporting and insights
- **Comparison Tools**: Side-by-side AI vs Standard extraction analysis
- **Smart Environment Detection**: Automatically switches between local and production APIs

## 🛠️ Tech Stack

- **Framework**: Next.js 14.2.5 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **Icons**: Lucide React
- **State Management**: Zustand
- **Database**: Supabase (PostgreSQL)
- **File Storage**: Supabase Storage
- **PDF Generation**: html2pdf.js
- **Containerization**: Docker

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- Docker (for containerized deployment)
- Supabase account and project
- Backend API service running

## 🔧 Installation

### **Local Development**

```bash
# Clone the repository
git clone <repository-url>
cd document-processing-app-frontend

# Install dependencies
npm install

# Create environment file for local development
cp .env.example .env.local

# Configure environment variables in .env.local
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Start development server
npm run dev
```

### **Production Deployment (Vercel)**

The application automatically detects production environments and uses the correct backend API:

1. **Deploy to Vercel** - The app automatically detects Vercel and uses `https://backend-document-processing-app.fly.dev`
2. **No environment variables needed** - Smart detection handles everything
3. **Works out of the box** - Just deploy and it works!

### **Docker Deployment**

```bash
# Build and run with Docker
docker build -t doc-processor-frontend .
docker run -d -p 3000:3000 --env-file env.production doc-processor-frontend

# Or use Docker Compose from project root
cd ..
docker-compose --env-file env.production up -d --build
```

## ⚙️ Environment Variables

### **Local Development (.env.local)**
```bash
# Only needed for local development
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### **Production (Automatic)**
- **No environment variables needed** in Vercel
- **Automatically detects** production domains
- **Uses Fly.io backend** (`https://backend-document-processing-app.fly.dev`)

### **Smart Environment Detection**

The application automatically detects your environment:

- **🏠 Localhost**: Uses `http://localhost:3001`
- **🚀 Vercel**: Automatically uses `https://backend-document-processing-app.fly.dev`
- **🌐 Any Production Domain**: Automatically uses Fly.io backend
- **🔧 Manual Override**: Environment variables (only for localhost)

## 🏗️ Project Structure

```
document-processing-app-frontend/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx           # Root layout with theme provider
│   │   ├── page.tsx             # Home page with hero section
│   │   ├── globals.css          # Global Tailwind CSS styles
│   │   ├── favicon.ico          # App favicon
│   │   ├── upload/              # Document upload form
│   │   ├── documents/           # Document history view
│   │   ├── results/             # Processing results with comparison
│   │   ├── report/              # Analytics dashboard
│   │   └── api/                 # API routes
│   │       ├── health/          # Health check endpoint
│   │       └── upload/          # Upload endpoint
│   ├── components/              # Reusable UI components
│   │   ├── common/              # Shared components
│   │   │   ├── Navbar.tsx       # Navigation with mobile menu
│   │   │   ├── Footer.tsx       # Application footer
│   │   │   ├── ProgressBar.tsx  # Progress indicators
│   │   │   └── ErrorBanner.tsx  # Error display
│   │   ├── forms/               # Form components
│   │   │   └── UploadForm.tsx   # Document upload form
│   │   ├── results/             # Results display components
│   │   │   ├── StandardPanel.tsx # Standard extraction results
│   │   │   ├── AIPanel.tsx      # AI extraction results
│   │   │   └── CompareView.tsx  # Side-by-side comparison
│   │   ├── ui/                  # Shadcn UI components
│   │   │   ├── button.tsx       # Button component
│   │   │   ├── card.tsx         # Card component
│   │   │   ├── input.tsx        # Input component
│   │   │   └── tabs.tsx         # Tabs component
│   │   ├── Modal.tsx            # Reusable modal component
│   │   └── Layout.tsx           # Page layout wrapper
│   ├── store/                   # Zustand state management
│   │   ├── index.ts             # Store configuration
│   │   ├── hooks.ts             # Typed store hooks
│   │   └── slices/              # State slices
│   │       ├── jobSlice.ts      # Job processing state
│   │       ├── resultsSlice.ts  # Results and filtering state
│   │       ├── themeSlice.ts    # Theme preferences
│   │       └── uploadSlice.ts   # Upload progress state
│   ├── hooks/                   # Custom React hooks
│   │   ├── useSupabase.ts       # Supabase client hook
│   │   ├── useThemeToggle.ts    # Theme switching hook
│   │   └── useWebSocket.ts      # WebSocket connection hook
│   ├── layout/                  # Layout and theme configuration
│   │   ├── ThemeContext.tsx     # Theme context provider
│   │   ├── Providers.tsx        # App providers wrapper
│   │   └── palettes.ts          # Color palette definitions
│   ├── lib/                     # Utility libraries
│   │   ├── api.ts               # API client functions
│   │   ├── constants.ts         # Application constants
│   │   ├── mappers.ts           # Data transformation utilities
│   │   ├── utils.ts             # General utility functions
│   │   └── env.ts               # Environment detection utilities
│   └── types/                   # TypeScript type definitions
│       └── html2pdf.d.ts        # html2pdf.js type declarations
├── public/                      # Static assets
│   ├── file.svg                 # File icon
│   ├── globe.svg                # Globe icon
│   ├── next.svg                 # Next.js logo
│   ├── vercel.svg               # Vercel logo
│   └── window.svg               # Window icon
├── Dockerfile                   # Docker configuration
├── next.config.js               # Next.js configuration
├── tailwind.config.js           # Tailwind CSS configuration
├── postcss.config.js            # PostCSS configuration
├── tsconfig.json                # TypeScript configuration
├── eslint.config.mjs            # ESLint configuration
├── package.json                  # Dependencies and scripts
├── package-lock.json            # Locked dependency versions
├── vercel.json                  # Vercel configuration
├── .gitignore                   # Git ignore rules
├── plans.txt                    # Development plans
├── README.md                    # This file
└── tree.txt                     # File structure
```

## 📱 Pages & Features

### **Home Page (`/`)**
- Hero section with app overview
- Feature highlights (AI, Standard, Multiple Formats)
- Quick action buttons (Upload Document, View Results)
- Responsive design with hover effects

### **Upload Page (`/upload`)**
- Document upload form with validation
- Processing method selection (AI vs Standard)
- Real-time form validation
- File type and size restrictions
- Progress indicators

### **Documents Page (`/documents`)**
- Document processing history
- Pagination (5 items per page)
- Processing method display
- Hover effects and responsive design

### **Results Page (`/results`)**
- Processing results with pagination
- Filtering by AI/Standard extraction
- Sorting by date
- Comparison modal for AI vs Standard
- Delete functionality with confirmation

### **Report Page (`/report`)**
- Analytics dashboard with pie charts
- AI vs Standard extraction statistics
- Total document counts and percentages
- PDF report generation
- Export functionality

## 🎨 UI Components

### **Shadcn UI Integration**
- **Button**: Consistent button styling with variants
- **Card**: Information display containers
- **Input**: Form input fields with validation
- **Modal**: Overlay dialogs for user interaction
- **Tabs**: Content organization

### **Custom Components**
- **Navbar**: Responsive navigation with mobile menu
- **Footer**: Application footer with links and information
- **Toast**: Notification system for user feedback
- **ProgressBar**: Upload and processing indicators
- **EnvironmentBanner**: Shows current environment and API

## 🔄 State Management

### **Zustand Stores**
- **jobSlice**: Document processing job management
- **resultsSlice**: Processing results and filtering
- **themeSlice**: Dark/light mode preferences
- **uploadSlice**: File upload state and progress

## 📊 Data Flow

1. **Upload**: User selects file and processing method
2. **Processing**: Backend processes document with AI or OCR
3. **Storage**: Results stored in Supabase database
4. **Display**: Frontend fetches and displays results
5. **Comparison**: Side-by-side analysis of extraction methods
6. **Analytics**: Comprehensive reporting and insights

## 🚀 Development

### **Available Scripts**

```bash
npm run dev              # Start development server
npm run dev:local        # Start with local backend (localhost:3001)
npm run dev:prod         # Start with production backend (Fly.io)
npm run build            # Build for production
npm run build:local      # Build for local development
npm run build:prod       # Build for production
npm run start            # Start production server
npm run start:local      # Start with local configuration
npm run start:prod       # Start with production configuration
npm run lint             # Run ESLint
npm run type-check       # TypeScript type checking
```

### **Code Quality**

- **ESLint**: Code linting and formatting
- **TypeScript**: Static type checking
- **Prettier**: Code formatting (via ESLint)
- **Husky**: Git hooks for pre-commit checks

## 🐳 Docker Configuration

### **Dockerfile Features**
- **Multi-stage build**: Optimized for production
- **Alpine base**: Lightweight container image
- **Non-root user**: Security best practices
- **Health checks**: Container monitoring

### **Docker Commands**

```bash
# Build image
docker build -t doc-processor-frontend .

# Run container
docker run -d -p 3000:3000 --env-file env.production doc-processor-frontend

# View logs
docker logs <container_name>

# Stop container
docker stop <container_name>
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e
```

## 🔧 Troubleshooting

### **Common Issues**

1. **Build Failures**
   ```bash
   # Clear Next.js cache
   rm -rf .next
   
   # Reinstall dependencies
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Environment Variables**
   ```bash
   # Verify env.local exists
   ls -la .env.local
   
   # Check variable loading
   echo $NEXT_PUBLIC_API_URL
   ```

3. **Port Conflicts**
   ```bash
   # Check port usage
   lsof -i :3000
   
   # Kill conflicting process
   kill -9 <PID>
   ```

4. **API URL Issues**
   ```bash
   # Check browser console for API URL logs
   # Should show: "Current API URL: https://backend-document-processing-app.fly.dev"
   ```

### **Development Server Issues**

```bash
# Clear cache and restart
rm -rf .next
pkill -f "next dev"
npm run dev

# Check for background processes
ps aux | grep "next dev"
```

## 📱 Mobile Compatibility

- **Responsive Design**: Mobile-first approach
- **Touch Interactions**: Optimized for touch devices
- **Progressive Web App**: PWA capabilities
- **Cross-Browser**: Modern browser support

## 🌐 Browser Support

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

## 🚀 Performance

- **Code Splitting**: Automatic route-based splitting
- **Image Optimization**: Next.js Image component
- **Lazy Loading**: Dynamic imports for heavy components
- **Bundle Analysis**: Webpack bundle analyzer

## 🔒 Security

- **Environment Variables**: Secure configuration management
- **Input Validation**: Client and server-side validation
- **CORS**: Proper cross-origin configuration
- **File Upload**: Secure file handling and validation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For issues and questions:
- Check the troubleshooting section
- Review browser console for errors
- Verify environment variables
- Ensure backend service is running
- Check environment banner for current API URL

## 🌍 Environment Detection

The application automatically detects your environment and uses the appropriate backend:

### **Automatic Detection**
- **🏠 Localhost**: `http://localhost:3001`
- **🚀 Vercel**: `https://backend-document-processing-app.fly.dev`
- **🌐 Any Production Domain**: `https://backend-document-processing-app.fly.dev`

### **No Configuration Needed**
- **Just deploy to Vercel** - it works automatically
- **No environment variables** needed in production
- **Smart detection** handles everything

---

**Note**: This frontend application requires the Document Processing Backend API to be running for full functionality. The backend is automatically detected and connected based on your deployment environment.
