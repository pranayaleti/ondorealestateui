// Available Technicians
export const AVAILABLE_TECHNICIANS = [
  { id: "tech-001", name: "John Smith", specialty: "Plumbing & HVAC" },
  { id: "tech-002", name: "Sarah Johnson", specialty: "Electrical" },
  { id: "tech-003", name: "Mike Davis", specialty: "General Maintenance" },
  { id: "tech-004", name: "Emily Wilson", specialty: "Appliances" },
  { id: "tech-005", name: "David Brown", specialty: "Structural & Flooring" },
  { id: "tech-006", name: "Lisa Anderson", specialty: "Pest Control" },
] as const

export const getTechnicianOptions = () => {
  return AVAILABLE_TECHNICIANS.map((tech) => ({
    value: tech.id,
    label: `${tech.name} - ${tech.specialty}`,
    name: tech.name,
  }))
}

