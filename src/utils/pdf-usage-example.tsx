/**
 * Example usage of the HTML-based PDF generator for occupancy reports
 * 
 * This file demonstrates how to use the generateOccupancyReportPDF function
 * to create beautiful PDF reports from occupancy data.
 */

import { generateOccupancyReportPDF, OccupancyReportData } from './pdf-generator';

// Example: Basic usage with mock data
export async function exampleBasicUsage() {
  const reportData: OccupancyReportData = {
    propertyName: "Oak Street Apartments",
    period: "November 2025",
    summary: {
      totalUnits: 6,
      occupiedUnits: 1,
      vacantUnits: 5,
      occupancyRate: 16.7,
      averageRent: 2000,
      totalMonthlyRevenue: 2000,
      averageTenancy: 12
    },
    tenants: [
      { name: "John Smith", unit: "Unit 101", rent: 2000, moveIn: "Jan 2024", status: "Active", leaseEnd: "Dec 2024" },
      { name: "Sarah Johnson", unit: "Unit 102", rent: 1800, moveIn: "Mar 2024", status: "Active", leaseEnd: "Feb 2025" },
      { name: "Mike Davis", unit: "Unit 103", rent: 2200, moveIn: "Feb 2024", status: "Active", leaseEnd: "Jan 2025" }
    ],
    properties: [
      { name: "Oak Street Apartments", units: 2, occupied: 1, vacant: 1, occupancyRate: 50 },
      { name: "Pine View Complex", units: 2, occupied: 2, vacant: 0, occupancyRate: 100 },
      { name: "Maple Heights", units: 2, occupied: 0, vacant: 2, occupancyRate: 0 }
    ],
    trends: {
      previousMonth: 16.7,
      change: 0,
      averageTenancy: 12,
      turnoverRate: 8.3
    }
  };

  // Generate PDF using browser print (no library required)
  await generateOccupancyReportPDF(reportData, 'occupancy-report-november-2025', false);

  // Or use html2pdf.js library for better quality (requires: npm install html2pdf.js)
  // await generateOccupancyReportPDF(reportData, 'occupancy-report-november-2025', true);
}

// Example: Usage in a React component
export function ExamplePDFButton() {
  const handleExportPDF = async () => {
    const reportData: OccupancyReportData = {
      propertyName: "Oak Street Apartments",
      period: "November 2025",
      summary: {
        totalUnits: 6,
        occupiedUnits: 1,
        vacantUnits: 5,
        occupancyRate: 16.7,
        averageRent: 2000,
        totalMonthlyRevenue: 2000
      },
      tenants: [
        { name: "John Smith", unit: "Unit 101", rent: 2000, moveIn: "Jan 2024", status: "Active", leaseEnd: "Dec 2024" }
      ],
      properties: [
        { name: "Oak Street Apartments", units: 2, occupied: 1, vacant: 1, occupancyRate: 50 }
      ],
      trends: {
        previousMonth: 16.7,
        change: 0,
        turnoverRate: 8.3
      }
    };

    try {
      await generateOccupancyReportPDF(reportData, 'occupancy-report');
    } catch (error) {
      console.error('Failed to generate PDF:', error);
    }
  };

  return (
    <button onClick={handleExportPDF}>
      Export PDF Report
    </button>
  );
}

/**
 * To use html2pdf.js library for better PDF quality:
 * 
 * 1. Install the library:
 *    npm install html2pdf.js
 *    npm install --save-dev @types/html2pdf.js (if types are needed)
 * 
 * 2. Use the library option:
 *    await generateOccupancyReportPDF(data, 'report-name', true);
 * 
 * Benefits of using html2pdf.js:
 * - Better image quality
 * - More control over PDF settings
 * - Automatic download without print dialog
 * - Better handling of complex layouts
 */

