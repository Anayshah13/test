import type { StudentProfile, EmployerProfile, Application } from "./types"

// Simple localStorage wrapper for demo purposes
export const storage = {
  // User management
  getCurrentUser: (): (StudentProfile | EmployerProfile) | null => {
    if (typeof window === "undefined") return null
    const user = localStorage.getItem("currentUser")
    return user ? JSON.parse(user) : null
  },

  setCurrentUser: (user: StudentProfile | EmployerProfile) => {
    if (typeof window === "undefined") return
    localStorage.setItem("currentUser", JSON.stringify(user))
  },

  clearCurrentUser: () => {
    if (typeof window === "undefined") return
    localStorage.removeItem("currentUser")
  },

  // Applications
  getApplications: (): Application[] => {
    if (typeof window === "undefined") return []
    const apps = localStorage.getItem("applications")
    if (!apps) return []
    try {
      const parsed: Application[] = JSON.parse(apps)
      // Normalize date fields that were stringified
      return parsed.map((a) => ({
        ...a,
        appliedAt: a.appliedAt ? new Date(a.appliedAt as unknown as string) : new Date(),
      }))
    } catch {
      return []
    }
  },

  addApplication: (application: Application) => {
    if (typeof window === "undefined") return
    const apps = storage.getApplications()
    apps.push(application)
    localStorage.setItem("applications", JSON.stringify(apps))
  },

  updateApplication: (id: string, updates: Partial<Application>) => {
    if (typeof window === "undefined") return
    const apps = storage.getApplications()
    const index = apps.findIndex((app) => app.id === id)
    if (index !== -1) {
      apps[index] = { ...apps[index], ...updates }
      localStorage.setItem("applications", JSON.stringify(apps))
    }
  },
}
