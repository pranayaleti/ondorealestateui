# 🔥 OnDo - Complete Property Management Platform

A **full-stack property management platform** with backend API, frontend interface, and complete user management system featuring the beautiful OnDo branding.

## ✨ **What is OnDo?**

OnDo is a comprehensive property management solution that connects:
- **🏢 Property Management Companies** (Managers)
- **👑 Property Investors** (Owners) 
- **🏠 Renters** (Tenants)

All through a unified platform with role-based access, invitation system, and modern UI.

## 🎨 **OnDo Branding**

- **🎨 Orange-to-Red Gradient**: Beautiful `from-orange-500 to-red-800` gradient throughout
- **🔥 Modern Logo**: Circular "D" icon with OnDo text branding  
- **🎯 Single Login System**: Automatic role-based redirection
- **📱 Responsive Design**: Works perfectly on all devices

## 🏗️ **Architecture**

### **Backend (Node.js + Express + PostgreSQL)**
- **Authentication**: JWT-based with role management
- **Invitation System**: Email-based user onboarding
- **Database**: PostgreSQL with Drizzle ORM
- **API**: RESTful endpoints with TypeScript

### **Frontend (React + TypeScript + Vite)**
- **React 18** with TypeScript for type safety
- **Vite** for lightning-fast development
- **Tailwind CSS** with custom OnDo colors
- **Radix UI** for accessible components
- **React Router DOM** for navigation

## 🏗️ **Project Structure**

```
OnDo/
├── backend/                 # Node.js API Server
│   ├── src/
│   │   ├── controllers/     # API route handlers
│   │   ├── db/             # Database schema & connection
│   │   ├── middleware/     # Authentication middleware
│   │   ├── routes/         # API routes
│   │   └── types/          # TypeScript definitions
│   ├── server.ts           # Express server setup
│   └── seed.ts             # Database seeding
│
├── src/                    # React Frontend
│   ├── components/         # Reusable UI components
│   │   ├── ui/            # Base UI components (Radix UI)
│   │   ├── admin/         # Manager portal components
│   │   ├── tenant/        # Tenant portal components
│   │   └── owner/         # Owner portal components
│   ├── pages/             # Route components
│   │   ├── Login.tsx      # Single login page
│   │   ├── Signup.tsx     # Token-based signup
│   │   ├── Dashboard.tsx  # Manager dashboard
│   │   ├── Owner.tsx      # Owner portal
│   │   └── Tenant.tsx     # Tenant portal
│   ├── lib/               # Utilities and contexts
│   │   ├── auth-context.tsx # Authentication state
│   │   ├── api.ts         # API client functions
│   │   └── utils.ts       # Helper functions
│   └── hooks/             # Custom React hooks
│       └── useApi.ts      # API call hook
```

## 🎯 **Four Role System**

### **🔥 Super Admin** (Backend Seeded)
- **Purpose**: System administrator
- **Access**: Can invite managers
- **Login**: `iamharikrishnaa@gmail.com` / `Hari@123`

### **🏢 Manager** (Property Management Company)
- **Purpose**: Property management company staff
- **Access**: Can invite owners and tenants
- **Portal**: `/dashboard` - Complete admin interface
- **Features**: User management, invitation system, oversight

### **👑 Owner** (Property Investors)
- **Purpose**: Property investors and owners
- **Portal**: `/owner` - Property management interface
- **Features**: Add properties, tenant communication, financial tracking, investment metrics

### **🏠 Tenant** (Renters)
- **Purpose**: Property renters
- **Portal**: `/tenant` - Tenant interface  
- **Features**: Rent payments, maintenance requests, document access, messaging

---

## 🚀 **Quick Start**

### **Prerequisites**
- Node.js 18+
- PostgreSQL database
- Git

### **1. Backend Setup**
```bash
cd backend
npm install
cp env.example .env          # Configure your database
npm run db:push              # Setup database schema  
npm run seed                 # Create super admin
npm run dev                  # Start backend (:3000)
```

### **2. Frontend Setup**  
```bash
cd ../
npm install
cp env.example .env          # Configure API URL
npm run dev                  # Start frontend (:3001)
```

### **3. Test the System**
1. **Login**: `http://localhost:3001/login`
2. **Super Admin**: `iamharikrishnaa@gmail.com` / `Hari@123`
3. **Invite Manager**: Use admin interface
4. **Complete Signup**: Use invitation URL
5. **Test All Roles**: Manager → Owner → Tenant flow

---

## 🔥 **Key Features**

### **🔐 Authentication & Security**
- **JWT Authentication** - Secure token-based auth
- **Role-Based Access** - Four distinct user roles
- **Protected Routes** - Automatic role-based redirection
- **Session Management** - Persistent login state
- **Password Security** - Bcrypt hashing

### **📧 Invitation System**
- **Email-Based Onboarding** - Secure token invitations
- **Role Assignment** - Automatic role setup
- **Expiry Management** - 7-day default expiry
- **Duplicate Prevention** - Can't invite existing users
- **Status Tracking** - Pending → Accepted workflow

### **🎨 User Experience**
- **OnDo Branding** - Beautiful orange gradient design
- **Responsive Design** - Works on all devices
- **Loading States** - Smooth user feedback
- **Error Handling** - Comprehensive error messages
- **Toast Notifications** - Real-time feedback

---

## 📚 **Documentation**

- **[Testing Guide](TESTING-GUIDE.md)** - Complete testing instructions
- **[Deployment Guide](DEPLOYMENT-GUIDE.md)** - Production deployment
- **[Implementation Details](IMPLEMENTATION-COMPLETE.md)** - Technical overview
- **[Backend Integration](BACKEND-FRONTEND-INTEGRATION-COMPLETE.md)** - API documentation

---

## 🛠️ **Development**

### **Available Scripts**

```bash
# Frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Backend  
cd backend
npm run dev          # Start development server
npm run build        # Build TypeScript
npm run start        # Start production server
npm run db:push      # Apply database migrations
npm run seed         # Seed database with admin user
```

---

## 🚀 **Deployment**

### **Quick Deploy (Vercel + Neon)**
1. **Database**: Create PostgreSQL on [Neon](https://neon.tech)
2. **Backend**: Deploy to [Vercel](https://vercel.com)
3. **Frontend**: Deploy to [Vercel](https://vercel.com)
4. **Configure**: Set environment variables
5. **Migrate**: Run `npm run db:push` and `npm run seed`

See **[Deployment Guide](DEPLOYMENT-GUIDE.md)** for detailed instructions.

---

## 🎯 **What's Included**

✅ **Complete Backend API** - Authentication, invitations, user management  
✅ **Three Portal Interfaces** - Manager, Owner, Tenant dashboards  
✅ **Invitation System** - Email-based user onboarding  
✅ **Role Management** - Super Admin → Manager → Owner/Tenant hierarchy  
✅ **Security Features** - JWT tokens, protected routes, password hashing  
✅ **Modern UI/UX** - OnDo branding, responsive design, loading states  
✅ **TypeScript** - Full type safety across frontend and backend  
✅ **Production Ready** - Deployment guides, environment configs  

---

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🎉 **Ready to Launch!**

Your **OnDo Property Management Platform** is production-ready with:

- **🔥 Complete Full-Stack System**
- **🎨 Beautiful OnDo Branding** 
- **🔐 Secure Authentication**
- **📧 Invitation System**
- **🏢 Multi-Role Support**
- **📱 Responsive Design**

**Start building the future of property management!** 🚀

