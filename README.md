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

# Create environment file
cp env.local.example env.local

# Configure environment variables
# Edit env.local with your credentials

# Start development server
npm run dev
```

### **Docker Deployment**

```bash
# Build and run with Docker
docker build -t doc-processor-frontend .
docker run -d -p 3000:3000 --env-file env.local doc-processor-frontend

# Or use Docker Compose from project root
cd ..
docker-compose --env-file env.local up -d --build
```

## ⚙️ Environment Variables

Create an `env.local` file with the following variables:

```bash
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 🏗️ Project Structure

```
document-processing-app-frontend/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx           # Home page
│   │   ├── upload/            # Document upload
│   │   ├── documents/         # Document history
│   │   ├── results/           # Processing results
│   │   └── report/            # Analytics dashboard
│   ├── components/            # Reusable UI components
│   │   ├── common/            # Shared components
│   │   ├── forms/             # Form components
│   │   └── ui/                # Shadcn UI components
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Utility libraries
│   ├── store/                 # Zustand state management
│   └── types/                 # TypeScript type definitions
├── public/                    # Static assets
├── Dockerfile                 # Docker configuration
├── next.config.js            # Next.js configuration
├── tailwind.config.js        # Tailwind CSS configuration
└── package.json              # Dependencies and scripts
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
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
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
docker run -d -p 3000:3000 --env-file env.local doc-processor-frontend

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
   ls -la env.local
   
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

---

**Note**: This frontend application requires the Document Processing Backend API to be running for full functionality. Ensure both services are properly configured and connected.
