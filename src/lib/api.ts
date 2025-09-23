// API Configuration
const API_BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:3000/api';

// Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'super_admin' | 'manager' | 'owner' | 'tenant';
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
  mobile?: string;
  password: string;
}

export interface SignupResponse {
  message: string;
  token: string;
  user: User & { mobile?: string };
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
