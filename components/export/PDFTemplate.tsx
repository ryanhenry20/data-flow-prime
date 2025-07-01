'use client';

import React from 'react';
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Font,
    Image,
} from '@react-pdf/renderer';
import { format } from 'date-fns';

// Register fonts for better typography
Font.register({
    family: 'Inter',
    fonts: [
        {
            src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyeMZg.woff2',
        },
        {
            src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuDyeMZg.woff2',
            fontWeight: 600,
        },
        {
            src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuBCeMZg.woff2',
            fontWeight: 700,
        },
    ],
});

// PDF Styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        padding: 40,
        fontFamily: 'Inter',
        fontSize: 10,
        lineHeight: 1.4,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30,
        paddingBottom: 20,
        borderBottom: '2px solid #e5e7eb',
    },
    title: {
        fontSize: 24,
        fontWeight: 700,
        color: '#111827',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 12,
        color: '#6b7280',
        marginBottom: 2,
    },
    metadata: {
        fontSize: 8,
        color: '#9ca3af',
        textAlign: 'right',
    },
    section: {
        marginBottom: 25,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 600,
        color: '#374151',
        marginBottom: 12,
        paddingBottom: 6,
        borderBottom: '1px solid #e5e7eb',
    },
    table: {
        width: 'auto',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#e5e7eb',
        borderRightWidth: 0,
        borderBottomWidth: 0,
    },
    tableRow: {
        margin: 'auto',
        flexDirection: 'row',
    },
    tableColHeader: {
        width: '16.66%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#e5e7eb',
        borderLeftWidth: 0,
        borderTopWidth: 0,
        backgroundColor: '#f9fafb',
        padding: 8,
    },
    tableCol: {
        width: '16.66%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#e5e7eb',
        borderLeftWidth: 0,
        borderTopWidth: 0,
        padding: 8,
    },
    tableCellHeader: {
        fontSize: 9,
        fontWeight: 600,
        color: '#374151',
    },
    tableCell: {
        fontSize: 8,
        color: '#6b7280',
    },
    kpiGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    kpiCard: {
        width: '23%',
        padding: 15,
        backgroundColor: '#f8fafc',
        borderRadius: 8,
        border: '1px solid #e2e8f0',
    },
    kpiValue: {
        fontSize: 18,
        fontWeight: 700,
        color: '#1e293b',
        marginBottom: 4,
    },
    kpiLabel: {
        fontSize: 9,
        color: '#64748b',
        marginBottom: 2,
    },
    kpiChange: {
        fontSize: 8,
        color: '#059669',
    },
    summary: {
        backgroundColor: '#f0f9ff',
        padding: 15,
        borderRadius: 8,
        border: '1px solid #bae6fd',
        marginBottom: 20,
    },
    summaryTitle: {
        fontSize: 12,
        fontWeight: 600,
        color: '#0c4a6e',
        marginBottom: 8,
    },
    summaryText: {
        fontSize: 9,
        color: '#0369a1',
        lineHeight: 1.5,
    },
    footer: {
        position: 'absolute',
        bottom: 30,
        left: 40,
        right: 40,
        textAlign: 'center',
        color: '#9ca3af',
        fontSize: 8,
        paddingTop: 10,
        borderTop: '1px solid #e5e7eb',
    },
    badge: {
        backgroundColor: '#dbeafe',
        color: '#1d4ed8',
        padding: '2 6',
        borderRadius: 4,
        fontSize: 7,
        fontWeight: 600,
    },
    alertBadge: {
        backgroundColor: '#fef2f2',
        color: '#dc2626',
        padding: '2 6',
        borderRadius: 4,
        fontSize: 7,
        fontWeight: 600,
    },
    successBadge: {
        backgroundColor: '#f0fdf4',
        color: '#16a34a',
        padding: '2 6',
        borderRadius: 4,
        fontSize: 7,
        fontWeight: 600,
    },
});

interface PDFTemplateProps {
    reportData: {
        title: string;
        dateRange: { start: Date; end: Date };
        kpis: Array<{
            label: string;
            value: string;
            change?: string;
            trend?: 'up' | 'down' | 'neutral';
        }>;
        tableData: Array<Record<string, any>>;
        tableHeaders: string[];
        summary?: string;
        insights?: string[];
    };
    type: 'analytics' | 'users' | 'custom';
}

export const PDFTemplate: React.FC<PDFTemplateProps> = ({
    reportData,
    type,
}) => {
    const formatTableValue = (value: any): string => {
        if (value === null || value === undefined) return 'N/A';
        if (typeof value === 'object') return JSON.stringify(value);
        if (typeof value === 'number') return value.toLocaleString();
        if (typeof value === 'boolean') return value ? 'Yes' : 'No';
        return String(value);
    };

    const getReportIcon = (type: string) => {
        switch (type) {
            case 'analytics':
                return '📊';
            case 'users':
                return '👥';
            default:
                return '📋';
        }
    };

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.title}>
                            {getReportIcon(type)} {reportData.title}
                        </Text>
                        <Text style={styles.subtitle}>
                            Data Flow Prime Analytics Report
                        </Text>
                        <Text style={styles.subtitle}>
                            {format(reportData.dateRange.start, 'MMM dd, yyyy')}{' '}
                            - {format(reportData.dateRange.end, 'MMM dd, yyyy')}
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.metadata}>
                            Generated:{' '}
                            {format(new Date(), 'MMM dd, yyyy HH:mm')}
                        </Text>
                        <Text style={styles.metadata}>
                            Data Flow Prime v1.0
                        </Text>
                        <Text style={styles.metadata}>
                            Report ID:{' '}
                            {Math.random()
                                .toString(36)
                                .substr(2, 9)
                                .toUpperCase()}
                        </Text>
                    </View>
                </View>

                {/* KPI Section */}
                {reportData.kpis.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>
                            Key Performance Indicators
                        </Text>
                        <View style={styles.kpiGrid}>
                            {reportData.kpis.slice(0, 4).map((kpi, index) => (
                                <View key={index} style={styles.kpiCard}>
                                    <Text style={styles.kpiLabel}>
                                        {kpi.label}
                                    </Text>
                                    <Text style={styles.kpiValue}>
                                        {kpi.value}
                                    </Text>
                                    {kpi.change && (
                                        <Text style={styles.kpiChange}>
                                            {kpi.change}
                                        </Text>
                                    )}
                                </View>
                            ))}
                        </View>
                    </View>
                )}

                {/* Summary Section */}
                {reportData.summary && (
                    <View style={styles.section}>
                        <View style={styles.summary}>
                            <Text style={styles.summaryTitle}>
                                Executive Summary
                            </Text>
                            <Text style={styles.summaryText}>
                                {reportData.summary}
                            </Text>
                        </View>
                    </View>
                )}

                {/* Data Table */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Detailed Data</Text>
                    <View style={styles.table}>
                        {/* Table Headers */}
                        <View style={styles.tableRow}>
                            {reportData.tableHeaders.map((header, index) => (
                                <View key={index} style={styles.tableColHeader}>
                                    <Text style={styles.tableCellHeader}>
                                        {header}
                                    </Text>
                                </View>
                            ))}
                        </View>

                        {/* Table Rows */}
                        {reportData.tableData
                            .slice(0, 20)
                            .map((row, rowIndex) => (
                                <View key={rowIndex} style={styles.tableRow}>
                                    {reportData.tableHeaders.map(
                                        (header, colIndex) => (
                                            <View
                                                key={colIndex}
                                                style={styles.tableCol}>
                                                <Text style={styles.tableCell}>
                                                    {formatTableValue(
                                                        row[
                                                            header
                                                                .toLowerCase()
                                                                .replace(
                                                                    /\s+/g,
                                                                    '_'
                                                                )
                                                        ]
                                                    )}
                                                </Text>
                                            </View>
                                        )
                                    )}
                                </View>
                            ))}
                    </View>

                    {reportData.tableData.length > 20 && (
                        <Text
                            style={{
                                ...styles.tableCell,
                                marginTop: 10,
                                fontStyle: 'italic',
                            }}>
                            Showing first 20 rows of{' '}
                            {reportData.tableData.length} total records. For
                            complete data, please refer to the CSV export.
                        </Text>
                    )}
                </View>

                {/* Insights Section */}
                {reportData.insights && reportData.insights.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Key Insights</Text>
                        {reportData.insights.map((insight, index) => (
                            <View
                                key={index}
                                style={{
                                    marginBottom: 8,
                                    flexDirection: 'row',
                                }}>
                                <Text style={styles.badge}>#{index + 1}</Text>
                                <Text
                                    style={{
                                        ...styles.summaryText,
                                        marginLeft: 8,
                                        flex: 1,
                                    }}>
                                    {insight}
                                </Text>
                            </View>
                        ))}
                    </View>
                )}

                {/* Footer */}
                <Text style={styles.footer}>
                    This report was automatically generated by Data Flow Prime
                    Analytics Platform. For questions or support, please contact
                    your analytics team.
                </Text>
            </Page>
        </Document>
    );
};

// Export hook for generating PDFs
export const usePDFExport = () => {
    const generatePDF = async (
        reportData: PDFTemplateProps['reportData'],
        type: PDFTemplateProps['type']
    ) => {
        try {
            const { pdf } = await import('@react-pdf/renderer');
            const blob = await pdf(
                <PDFTemplate reportData={reportData} type={type} />
            ).toBlob();

            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${reportData.title
                .replace(/\s+/g, '_')
                .toLowerCase()}_${format(new Date(), 'yyyy-MM-dd')}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

            return true;
        } catch (error) {
            console.error('PDF generation failed:', error);
            return false;
        }
    };

    return { generatePDF };
};
