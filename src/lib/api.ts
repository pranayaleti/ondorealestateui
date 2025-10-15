// API Configuration
const API_BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL || 'https://ondorealestateserver.onrender.com/api';

// Types
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "manager" | "owner" | "tenant";
  phone?: string;
  address?: string;
  profilePicture?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  user: User;
}

export interface InviteRequest {
  email: string;
  role: 'manager' | 'owner' | 'tenant';
}

export interface InviteResponse {
  message: string;
  invitationId: string;
  token: string;
  expiresAt: string;
  inviteUrl: string;
}

export interface InvitationDetails {
  email: string;
  role: 'manager' | 'owner' | 'tenant';
  expiresAt: string;
}

export interface SignupRequest {
  token: string;
  firstName: string;
  lastName: string;
  phone?: string;
  address?: string;
  profilePicture?: string;
  password: string;
}

export interface SignupResponse {
  message: string;
  token: string;
  user: User;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface ChangePasswordResponse {
  message: string;
}

export interface UpdateProfileRequest {
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  address?: string;
  profilePicture?: string;
}

export interface UpdateProfileResponse {
  message: string;
  user: User;
}

export interface PortfolioStats {
  propertiesOwned: number;
  totalUnits: number;
  portfolioValue: number;
  formattedPortfolioValue: string;
}

export interface ManagerPortfolioStats {
  propertiesManaged: number;
  totalUnits: number;
  activeTenants: number;
  monthlyRevenue: number;
  formattedMonthlyRevenue: string;
  occupancyRate: number;
}

export interface InvitedUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'owner' | 'tenant';
  createdAt: string;
  invitedBy: string;
  propertyCount: number;
  isActive: boolean;
}

// Property Types
export interface PropertyOwner {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface PropertyManager {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
}

export interface LeadSubmissionRequest {
  propertyId: string;
  tenantName: string;
  tenantEmail: string;
  tenantPhone: string;
  message?: string;
}

export interface LeadSubmissionResponse {
  message: string;
  leadId: string;
}

export interface Lead {
  id: string;
  propertyId: string;
  tenantName: string;
  tenantEmail: string;
  tenantPhone: string;
  message?: string;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'closed';
  source: string;
  createdAt: string;
  updatedAt: string;
  // Property information
  propertyTitle: string;
  propertyType: string;
  propertyAddress: string;
  propertyCity: string;
  // Owner information
  ownerFirstName?: string;
  ownerLastName?: string;
  ownerEmail?: string;
}

export interface Property {
  id: string;
  ownerId: string;
  tenantId?: string;
  title: string;
  type: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state?: string;
  country: string;
  zipcode?: string;
  latitude?: string;
  longitude?: string;
  description?: string;
  
  // Property Details
  price?: number; // Monthly rent price
  bedrooms?: number;
  bathrooms?: number;
  sqft?: number; // Square footage
  
  // Contact & Business Info
  phone?: string;
  website?: string;
  
  // Property Management Details
  leaseTerms?: string;
  fees?: string; // Management fees, leasing fees, etc.
  availability?: string; // e.g., "Immediate", "Available Jan 1"
  
  // Rating & Reviews
  rating?: number; // e.g., 4.85
  reviewCount?: number;
  
  // Amenities and Services (arrays)
  amenities?: string[]; // Array of amenity keys
  specialties?: string[];
  services?: string[];
  valueRanges?: string[];
  
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
  photos?: PropertyPhoto[];
  owner?: PropertyOwner; // Only available for managers
  manager?: PropertyManager; // Property manager contact details
}

export interface PropertyPhoto {
  id: string;
  propertyId: string;
  url: string;
  caption?: string;
  orderIndex: number;
  createdAt: string;
}

export interface PropertyAmenity {
  amenityId: string;
  value?: string;
  key: string;
  label: string;
}

export interface Amenity {
  id: string;
  key: string;
  label: string;
}

export interface CreatePropertyRequest {
  title: string;
  type: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state?: string;
  country: string;
  zipcode?: string;
  latitude?: string;
  longitude?: string;
  description?: string;
  amenityIds?: string[];
}

// API Error Class
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public errors?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Base API function
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  // Add auth token if available
  const token = tokenManager.getToken();
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new ApiError(
        data.message || 'An error occurred',
        response.status,
        data.errors
      );
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError('Network error', 0);
  }
}

// Auth API functions
export const authApi = {
  // Login
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    return apiRequest<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  // Get current user
  async me(): Promise<User> {
    return apiRequest<User>('/auth/me');
  },

  // Send invitation
  async invite(inviteData: InviteRequest): Promise<InviteResponse> {
    return apiRequest<InviteResponse>('/auth/invite', {
      method: 'POST',
      body: JSON.stringify(inviteData),
    });
  },

  // Get invitation details by token
  async getInvitation(token: string): Promise<InvitationDetails> {
    return apiRequest<InvitationDetails>(`/auth/invitation/${token}`);
  },

  // Complete signup with invitation token
  async signup(signupData: SignupRequest): Promise<SignupResponse> {
    return apiRequest<SignupResponse>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(signupData),
    });
  },

  // Change password for authenticated user
  async changePassword(passwordData: ChangePasswordRequest): Promise<ChangePasswordResponse> {
    return apiRequest<ChangePasswordResponse>('/password/change-password', {
      method: 'POST',
      body: JSON.stringify(passwordData),
    });
  },

  // Update user profile
  async updateProfile(profileData: UpdateProfileRequest): Promise<UpdateProfileResponse> {
    return apiRequest<UpdateProfileResponse>('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  },

  // Get portfolio statistics for owners
  async getPortfolioStats(): Promise<PortfolioStats> {
    return apiRequest<PortfolioStats>('/auth/portfolio-stats');
  },

  // Get users invited by the current manager
  async getInvitedUsers(): Promise<InvitedUser[]> {
    return apiRequest<InvitedUser[]>('/auth/invited-users');
  },

  // Update user status (enable/disable)
  async updateUserStatus(userId: string, isActive: boolean): Promise<{ message: string; user: any }> {
    return apiRequest<{ message: string; user: any }>(`/auth/users/${userId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ isActive }),
    });
  },
};

// Token management
export const tokenManager = {
  getToken(): string | null {
    // Check sessionStorage first (new method)
    let token = sessionStorage.getItem('ondoToken');
    console.log("tokenManager.getToken - sessionStorage:", token ? "found" : "not found");
    if (token) return token;
    
    // Fallback to localStorage (old method)
    token = localStorage.getItem('ondoToken');
    console.log("tokenManager.getToken - localStorage ondoToken:", token ? "found" : "not found");
    if (token) {
      // Migrate to sessionStorage
      sessionStorage.setItem('ondoToken', token);
      localStorage.removeItem('ondoToken');
      console.log("tokenManager.getToken - migrated from localStorage ondoToken");
      return token;
    }
    
    // Check for old token key
    token = localStorage.getItem('token');
    console.log("tokenManager.getToken - localStorage token:", token ? "found" : "not found");
    if (token) {
      // Migrate to sessionStorage with new key
      sessionStorage.setItem('ondoToken', token);
      localStorage.removeItem('token');
      console.log("tokenManager.getToken - migrated from localStorage token");
      return token;
    }
    
    console.log("tokenManager.getToken - no token found");
    return null;
  },

  setToken(token: string): void {
    console.log("tokenManager.setToken - storing token");
    sessionStorage.setItem('ondoToken', token);
    console.log("tokenManager.setToken - stored, verifying:", sessionStorage.getItem('ondoToken') ? "success" : "failed");
  },

  removeToken(): void {
    console.log("tokenManager.removeToken");
    sessionStorage.removeItem('ondoToken');
    localStorage.removeItem('ondoToken');
    localStorage.removeItem('token');
  },

  isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  },
};

// Property API functions
export const propertyApi = {
  // Get all properties
  async getProperties(): Promise<Property[]> {
    return apiRequest<Property[]>('/properties');
  },

  // Get property by ID
  async getProperty(id: string): Promise<Property> {
    return apiRequest<Property>(`/properties/${id}`);
  },

  // Create new property
  async createProperty(propertyData: CreatePropertyRequest): Promise<Property> {
    return apiRequest<Property>('/properties', {
      method: 'POST',
      body: JSON.stringify(propertyData),
    });
  },

  // Update property
  async updateProperty(id: string, propertyData: Partial<CreatePropertyRequest>): Promise<Property> {
    return apiRequest<Property>(`/properties/${id}`, {
      method: 'PUT',
      body: JSON.stringify(propertyData),
    });
  },

  // Delete property
  async deleteProperty(id: string): Promise<{ message: string }> {
    return apiRequest<{ message: string }>(`/properties/${id}`, {
      method: 'DELETE',
    });
  },

  // Upload property photo
  async uploadPhoto(propertyId: string, file: File, caption?: string, orderIndex: number = 0): Promise<PropertyPhoto> {
    const formData = new FormData();
    formData.append('photo', file);
    formData.append('propertyId', propertyId);
    formData.append('orderIndex', orderIndex.toString());
    if (caption) {
      formData.append('caption', caption);
    }

    const token = tokenManager.getToken();
    const response = await fetch(`${API_BASE_URL}/properties/photos`, {
      method: 'POST',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: formData,
    });

    const data = await response.json();
    if (!response.ok) {
      throw new ApiError(data.message || 'Upload failed', response.status, data.errors);
    }

    return data;
  },

  // Get all amenities
  async getAmenities(): Promise<Amenity[]> {
    return apiRequest<Amenity[]>('/properties/amenities/list');
  },

  // Manager functions

  async updatePropertyStatus(propertyId: string, status: 'approved' | 'rejected', comment?: string): Promise<Property> {
    return apiRequest<Property>(`/properties/${propertyId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status, comment }),
    });
  },
};

// Lead API functions
export const leadApi = {
  // Submit lead (public API - no authentication required)
  async submitLead(leadData: LeadSubmissionRequest): Promise<LeadSubmissionResponse> {
    const response = await fetch(`${API_BASE_URL}/leads/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(leadData),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new ApiError(data.message || 'Lead submission failed', response.status, data.errors);
    }

    return data;
  },

  // Get manager leads (authenticated)
  async getManagerLeads(): Promise<Lead[]> {
    return apiRequest<Lead[]>('/leads');
  },

  // Update lead status (authenticated)
  async updateLeadStatus(leadId: string, status: Lead['status']): Promise<{ message: string; lead: Lead }> {
    return apiRequest<{ message: string; lead: Lead }>(`/leads/${leadId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  },
};
