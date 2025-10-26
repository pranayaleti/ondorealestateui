// API Configuration
const API_BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:3000/api';

// Types
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "admin" | "manager" | "owner" | "tenant";
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
  activeTenants: number;
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

export interface PropertyTenant {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  createdAt: string;
}

// Maintenance Request interfaces
export interface MaintenanceRequest {
  id: string;
  title: string;
  description: string;
  category: "plumbing" | "electrical" | "hvac" | "appliance" | "structural" | "pest_control" | "cleaning" | "other";
  priority: "low" | "medium" | "high" | "emergency";
  status: "pending" | "in_progress" | "completed" | "cancelled";
  propertyId: string;
  tenantId: string;
  managerNotes?: string; // Manager's response/notes
  assignedTo?: string; // Technician name
  createdAt: string;
  updatedAt: string;
  // Enhanced fields for manager view
  propertyTitle?: string;
  propertyAddress?: string;
  propertyCity?: string;
  tenantFirstName?: string;
  tenantLastName?: string;
  tenantEmail?: string;
  tenantPhone?: string;
}

export interface CreateMaintenanceRequestRequest {
  title: string;
  description: string;
  category: "plumbing" | "electrical" | "hvac" | "appliance" | "structural" | "pest_control" | "cleaning" | "other";
  priority?: "low" | "medium" | "high" | "emergency";
}

export interface UpdateMaintenanceRequestRequest {
  status?: "pending" | "in_progress" | "completed" | "cancelled";
  assignedTo?: string;
  managerNotes?: string;
}

export interface PublicPropertyOwner {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
}

export interface PublicPropertyManager {
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
  // Rental details
  moveInDate?: string;
  monthlyBudget?: string;
  occupants?: number;
  hasPets?: boolean;
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
  tenant?: PropertyTenant; // Tenant information if property has a tenant
}

export interface PropertyPhoto {
  id: string;
  propertyId: string;
  url: string;
  caption?: string;
  orderIndex: number;
  createdAt: string;
}

export interface PublicProperty {
  id: string;
  publicId: string;
  title: string;
  type: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state?: string;
  country: string;
  zipcode?: string;
  description?: string;
  
  // Property Details
  price?: number;
  bedrooms?: number;
  bathrooms?: number;
  sqft?: number;
  phone?: string;
  website?: string;
  leaseTerms?: string;
  fees?: string;
  availability?: string;
  rating?: number;
  reviewCount?: number;
  
  // Arrays
  amenities: string[];
  specialties: string[];
  services: string[];
  valueRanges: string[];
  
  // Contact details (without IDs)
  owner: PublicPropertyOwner;
  manager: PublicPropertyManager;
  
  // Photos
  photos: PropertyPhoto[];
  
  // Status and timestamps
  status: string;
  createdAt: string;
  updatedAt: string;
}

// Tenant Types
export interface Tenant {
  id: string;
  name: string;
  property: string;
  unit: string;
  rent: number;
  leaseStart: string;
  leaseEnd: string;
  paymentStatus: 'current' | 'overdue' | 'pending';
  // Additional details
  email: string;
  phone?: string;
  propertyType: string;
  propertyAddress: string;
  bedrooms?: number;
  bathrooms?: number;
  sqft?: number;
  propertyStatus: string;
  tenantCreatedAt: string;
  propertyCreatedAt: string;
}

export interface OwnerTenantsSummary {
  totalTenants: number;
  occupiedUnits: string;
  occupancyRate: string;
  avgRent: string;
}

export interface OwnerTenantsResponse {
  summary: OwnerTenantsSummary;
  tenants: Tenant[];
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

  // Generate presigned URL for profile picture upload
  async generateProfilePictureUploadUrl(fileName: string, contentType: string): Promise<{
    presignedUrl: string;
    key: string;
    publicUrl: string;
    expiresIn: number;
  }> {
    return apiRequest('/auth/profile-picture/upload-url', {
      method: 'POST',
      body: JSON.stringify({
        fileName,
        contentType,
      }),
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

  // Get public properties (no auth required)
  async getPublicProperties(): Promise<PublicProperty[]> {
    return apiRequest<PublicProperty[]>('/properties/public');
  },

  // Get property by ID
  async getProperty(id: string): Promise<Property> {
    return apiRequest<Property>(`/properties/${id}`);
  },

  // Get tenant's assigned property
  async getTenantProperty(): Promise<Property> {
    return apiRequest<Property>('/properties/tenant-property');
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

  // Generate presigned URL for S3 upload
  async generatePresignedUploadUrl(propertyId: string, fileName: string, contentType: string): Promise<{
    presignedUrl: string;
    key: string;
    publicUrl: string;
    expiresIn: number;
  }> {
    return apiRequest('/properties/photos/presigned-url', {
      method: 'POST',
      body: JSON.stringify({
        propertyId,
        fileName,
        contentType,
      }),
    });
  },

  // Upload file directly to S3 using presigned URL
  async uploadToS3(presignedUrl: string, file: File): Promise<void> {
    const response = await fetch(presignedUrl, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': file.type,
      },
    });

    if (!response.ok) {
      throw new ApiError('Failed to upload to S3', response.status);
    }
  },

  // Confirm photo upload and save to database
  async confirmPhotoUpload(propertyId: string, url: string, s3Key: string, caption?: string, orderIndex: number = 0): Promise<PropertyPhoto> {
    return apiRequest('/properties/photos/confirm', {
      method: 'POST',
      body: JSON.stringify({
        propertyId,
        url,
        s3Key,
        caption,
        orderIndex: orderIndex.toString(), // Convert to string for backend validation
      }),
    });
  },

  // Delete property photo
  async deletePhoto(photoId: string): Promise<{ message: string }> {
    return apiRequest(`/properties/photos/${photoId}`, {
      method: 'DELETE',
    });
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

  // Owner functions - get tenants from properties data
  async getOwnerTenants(): Promise<OwnerTenantsResponse> {
    // Get all properties for the owner, then filter and map tenant data
    const properties = await apiRequest<Property[]>('/properties');
    
    // Filter properties that have tenants
    const propertiesWithTenants = properties.filter(property => property.tenantId);
    
    // Map properties to tenant format
    const tenants: Tenant[] = propertiesWithTenants.map(property => {
      // Calculate lease end date (one month after move-in date)
      const moveInDate = new Date(property.createdAt);
      const leaseEndDate = new Date(moveInDate);
      leaseEndDate.setMonth(leaseEndDate.getMonth() + 1);

      return {
        id: property.tenantId!,
        name: property.tenant ? `${property.tenant.firstName} ${property.tenant.lastName}` : `Tenant ${property.tenantId!.slice(-4)}`,
        property: property.title,
        unit: `${property.type} - Unit ${property.id.slice(-4)}`,
        rent: property.price || 0,
        leaseStart: moveInDate.toISOString().split('T')[0],
        leaseEnd: leaseEndDate.toISOString().split('T')[0],
        paymentStatus: 'current' as const,
        email: property.tenant?.email || `tenant-${property.tenantId!.slice(-4)}@example.com`,
        phone: property.tenant?.phone,
        propertyType: property.type,
        propertyAddress: `${property.addressLine1}, ${property.city}`,
        bedrooms: property.bedrooms,
        bathrooms: property.bathrooms,
        sqft: property.sqft,
        propertyStatus: property.status,
        tenantCreatedAt: property.tenant?.createdAt || property.createdAt,
        propertyCreatedAt: property.createdAt
      };
    });

    // Calculate summary statistics
    const totalTenants = tenants.length;
    const totalRent = tenants.reduce((sum, tenant) => sum + (tenant.rent || 0), 0);
    const avgRent = totalTenants > 0 ? Math.round(totalRent / totalTenants) : 0;

    const occupiedUnits = totalTenants;
    const totalUnits = Math.max(occupiedUnits, 1);
    const occupancyRate = Math.round((occupiedUnits / totalUnits) * 100);

    const summary: OwnerTenantsSummary = {
      totalTenants,
      occupiedUnits: `${occupiedUnits}/${totalUnits}`,
      occupancyRate: `${occupancyRate}%`,
      avgRent: `$${avgRent.toLocaleString()}`
    };

    return {
      summary,
      tenants
    };
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

// Maintenance API functions
export const maintenanceApi = {
  // Create maintenance request (tenant only)
  async createMaintenanceRequest(data: CreateMaintenanceRequestRequest): Promise<MaintenanceRequest> {
    return apiRequest<MaintenanceRequest>('/maintenance', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Get maintenance requests for tenant
  async getTenantMaintenanceRequests(): Promise<MaintenanceRequest[]> {
    return apiRequest<MaintenanceRequest[]>('/maintenance/tenant');
  },

  // Get maintenance requests for manager
  async getManagerMaintenanceRequests(): Promise<MaintenanceRequest[]> {
    return apiRequest<MaintenanceRequest[]>('/maintenance/manager/all');
  },

  // Get maintenance request by ID
  async getMaintenanceRequestById(id: string): Promise<MaintenanceRequest> {
    return apiRequest<MaintenanceRequest>(`/maintenance/${id}`);
  },

  // Update maintenance request (manager only)
  async updateMaintenanceRequest(id: string, data: UpdateMaintenanceRequestRequest): Promise<MaintenanceRequest> {
    return apiRequest<MaintenanceRequest>(`/maintenance/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
};
