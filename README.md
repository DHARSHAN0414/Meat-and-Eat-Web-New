# Meat & Eat - Professional E-commerce Platform

A modern, professional e-commerce platform built with React.js and Tailwind CSS for premium meat delivery services.

## 🚀 Features

### Customer Frontend
- **Modern Authentication**: Secure login/signup with form validation
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Professional UI/UX**: Clean, modern interface with smooth animations
- **Product Catalog**: Browse and filter premium meat products
- **Shopping Cart**: Add/remove items with real-time updates
- **User Dashboard**: Account management and order history
- **Admin Access**: Seamless navigation to admin panel

### Admin Backend
- **Secure Admin Login**: Protected admin authentication
- **Dashboard Overview**: Statistics, charts, and analytics
- **Product Management**: Add, edit, delete products
- **Order Management**: Process and track customer orders
- **Customer Support**: Handle inquiries and support tickets
- **Inventory Management**: Monitor stock levels
- **Analytics & Reports**: Business insights and data visualization

## 🛠️ Technology Stack

- **Frontend**: React.js 18
- **Styling**: Tailwind CSS 3
- **Routing**: React Router DOM 6
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Charts**: Chart.js with React Chart.js 2
- **State Management**: React Context API
- **Build Tool**: Create React App

## 📦 Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm start
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## 🎯 Demo Credentials

### Customer Login
- **Email**: demo@meatandeat.com
- **Password**: demo123

### Admin Login
- **Email**: admin@meatandeat.com
- **Password**: admin123

## 📱 Pages & Routes

### Customer Routes
- `/` - Login/Signup page
- `/home` - Landing page with hero section
- `/products` - Product catalog
- `/cart` - Shopping cart
- `/dashboard` - User account dashboard

### Admin Routes
- `/admin` - Admin login
- `/admin/dashboard` - Admin management panel

## 🎨 Design Features

- **Professional Color Scheme**: Primary red (#ef4444) with complementary colors
- **Typography**: Inter font family for modern readability
- **Animations**: Smooth transitions and micro-interactions
- **Responsive**: Mobile-first design with breakpoints
- **Accessibility**: WCAG compliant with proper contrast ratios
- **Performance**: Optimized images and lazy loading

## 🔧 Customization

### Colors
Update `tailwind.config.js` to modify the color scheme:
```javascript
colors: {
  primary: {
    50: '#fef2f2',
    // ... other shades
    900: '#7f1d1d',
  }
}
```

### Components
All components are modular and can be easily customized:
- `src/components/` - Reusable UI components
- `src/pages/` - Page components
- `src/context/` - State management

## 📊 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.js       # Navigation component
│   └── Footer.js       # Footer component
├── context/            # React Context providers
│   ├── AuthContext.js  # Authentication state
│   └── CartContext.js  # Shopping cart state
├── pages/              # Page components
│   ├── Login.js        # Authentication page
│   ├── Home.js         # Landing page
│   └── index.js        # Other pages
├── App.js              # Main app component
├── index.js            # App entry point
└── index.css           # Global styles with Tailwind
```

## 🚀 Deployment

The application can be deployed to any static hosting service:

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Deploy the `build` folder** to your hosting service

### Recommended Hosting Services
- Vercel
- Netlify
- AWS S3 + CloudFront
- GitHub Pages

## 🔒 Security Features

- **Input Validation**: Client-side form validation
- **Session Management**: Secure session handling
- **Protected Routes**: Admin routes require authentication
- **XSS Protection**: React's built-in XSS protection
- **CSRF Protection**: Token-based protection

## 📈 Performance Optimizations

- **Code Splitting**: Lazy loading of components
- **Image Optimization**: Responsive images with proper sizing
- **Bundle Optimization**: Tree shaking and minification
- **Caching**: Browser caching for static assets
- **CDN Ready**: Optimized for CDN deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Email: support@meatandeat.com
- Documentation: [Project Wiki]
- Issues: [GitHub Issues]

---

**Built with ❤️ using React.js and Tailwind CSS**
