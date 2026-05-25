'use client';
import React, { useState } from 'react';
import {
    LayoutDashboard,
    Users,
    Home,
    UserCheck,
    Settings,
    Bell,
    LogOut,
    TrendingUp,
    TrendingDown,
    Activity,
    DollarSign,
    BarChart3,
    FileText,
    AlertCircle,
    CheckCircle,
    Clock,
    Eye,
    Edit,
    Trash2,
    Plus,
    X,
    Search,
    Filter,
    ChevronLeft,
    ChevronRight,
    Building2,
    Mail,
    Phone,
    Calendar,
    Hash,
    ToggleLeft,
    ToggleRight,
} from 'lucide-react';
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode } from 'react';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState<any>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    // Company data
    const [companies, setCompanies] = useState([
        {
            id: 1,
            name: 'ABC Pvt. Ltd.',
            code: 'CMP001',
            contact: 'John',
            email: 'john@abc.com',
            phone: '+91 9876543210',
            status: 'Active',
            date: '2028-04-01',
            departments: ['Sales', 'Production', 'Quality', 'PPC', 'Store', 'Maintenance']
        },
        {
            id: 2,
            name: 'XYZ Industries',
            code: 'CMP002',
            contact: 'Amit',
            email: 'amit@xyz.com',
            phone: '+91 9876543211',
            status: 'Inactive',
            date: '2026-03-15',
            departments: ['Sales', 'Production', 'Quality']
        },
        {
            id: 3,
            name: 'Tech Corp',
            code: 'CMP003',
            contact: 'Neha',
            email: 'neha@techcorp.com',
            phone: '+91 9876543212',
            status: 'Active',
            date: '2026-02-10',
            departments: ['Sales', 'Production', 'Quality', 'PPC', 'Store']
        },
        {
            id: 4,
            name: 'Green Fields Ltd.',
            code: 'CMP004',
            contact: 'Rajesh',
            email: 'rajesh@greenfields.com',
            phone: '+91 9876543213',
            status: 'Active',
            date: '2026-01-20',
            departments: ['Sales', 'Production', 'Quality']
        },
        {
            id: 5,
            name: 'Harvest Agro',
            code: 'CMP005',
            contact: 'Priya',
            email: 'priya@harvestagro.com',
            phone: '+91 9876543214',
            status: 'Inactive',
            date: '2025-12-05',
            departments: ['Sales', 'Production', 'Quality', 'PPC']
        },
    ]);

    const departmentsList = ['Sales', 'Production', 'Quality', 'PPC', 'Store', 'Maintenance'];

    const handleEdit = (company: any) => {
        setSelectedCompany(company);
        setIsEditModalOpen(true);
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this company?')) {
            setCompanies(companies.filter((company: { id: number; }) => company.id !== id));
        }
    };

    const handleUpdate = () => {
        setCompanies(companies.map((company: { id: any; }) => 
            company.id === selectedCompany.id ? selectedCompany : company
        ));
        setIsEditModalOpen(false);
    };

    const handleStatusToggle = () => {
        setSelectedCompany({
            ...selectedCompany,
            status: selectedCompany.status === 'Active' ? 'Inactive' : 'Active'
        });
    };

    const handleDepartmentToggle = (dept: string) => {
        if (selectedCompany.departments.includes(dept)) {
            setSelectedCompany({
                ...selectedCompany,
                departments: selectedCompany.departments.filter((d: string) => d !== dept)
            });
        } else {
            setSelectedCompany({
                ...selectedCompany,
                departments: [...selectedCompany.departments, dept]
            });
        }
    };

    // Filter companies based on search
    const filteredCompanies = companies.filter((company: { name: string; code: string; contact: string; }) =>
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.contact.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination
    const itemsPerPage = 5;
    const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);
    const paginatedCompanies = filteredCompanies.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const EditCompanyModal = () => {
        if (!isEditModalOpen || !selectedCompany) return null;

        return (
            <div className="fixed inset-0 z-50 overflow-y-auto">
                <div className="flex items-center justify-center min-h-screen px-4">
                    {/* Backdrop */}
                    <div className="fixed inset-0 transition-opacity bg-black bg-opacity-50" onClick={() => setIsEditModalOpen(false)}></div>

                    {/* Modal */}
                    <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <h2 className="text-2xl font-semibold text-gray-900">Edit Company</h2>
                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="text-gray-400 transition-colors hover:text-gray-600"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Form */}
                        <div className="p-6 space-y-6">
                            {/* Company Name */}
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Company Name
                                </label>
                                <input
                                    type="text"
                                    value={selectedCompany.name}
                                    onChange={(e) => setSelectedCompany({ ...selectedCompany, name: e.target.value })}
                                    className="w-full px-4 py-2 transition-colors border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter company name"
                                />
                            </div>

                            {/* Code */}
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Code
                                </label>
                                <input
                                    type="text"
                                    value={selectedCompany.code}
                                    onChange={(e) => setSelectedCompany({ ...selectedCompany, code: e.target.value })}
                                    className="w-full px-4 py-2 transition-colors border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter company code"
                                />
                            </div>

                            {/* Status with Toggle */}
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Status
                                </label>
                                <div className="flex items-center space-x-3">
                                    <button
                                        onClick={handleStatusToggle}
                                        className="flex items-center px-4 py-2 space-x-2 transition-colors rounded-lg"
                                    >
                                        {selectedCompany.status === 'Active' ? (
                                            <>
                                                <ToggleRight className="w-6 h-6 text-green-600" />
                                                <span className="font-medium text-green-600">Active</span>
                                            </>
                                        ) : (
                                            <>
                                                <ToggleLeft className="w-6 h-6 text-gray-400" />
                                                <span className="font-medium text-gray-600">Inactive</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Date */}
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Date
                                </label>
                                <input
                                    type="date"
                                    value={selectedCompany.date}
                                    onChange={(e) => setSelectedCompany({ ...selectedCompany, date: e.target.value })}
                                    className="w-full px-4 py-2 transition-colors border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            {/* Departments */}
                            <div>
                                <label className="block mb-3 text-sm font-medium text-gray-700">
                                    Departments
                                </label>
                                <div className="flex flex-wrap gap-3">
                                    {departmentsList.map((dept) => (
                                        <button
                                            key={dept}
                                            onClick={() => handleDepartmentToggle(dept)}
                                            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                                                selectedCompany.departments.includes(dept)
                                                    ? 'bg-blue-600 text-white shadow-md transform scale-105'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                        >
                                            {dept}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="flex justify-end p-6 space-x-3 border-t border-gray-200">
                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="px-6 py-2 font-medium text-gray-700 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdate}
                                className="px-6 py-2 font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const stats = [
        {
            label: 'Total Companies',
            value: companies.length,
            change: '+12%',
            isIncrease: true,
            icon: Building2,
            color: 'bg-blue-500',
        },
        {
            label: 'Active Companies',
            value: companies.filter((c: { status: string; }) => c.status === 'Active').length,
            change: '+5%',
            isIncrease: true,
            icon: CheckCircle,
            color: 'bg-green-500',
        },
        {
            label: 'Total Departments',
            value: '12',
            change: '+2%',
            isIncrease: true,
            icon: LayoutDashboard,
            color: 'bg-purple-500',
        },
        {
            label: 'Total Staff',
            value: '124',
            change: '+8%',
            isIncrease: true,
            icon: Users,
            color: 'bg-orange-500',
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="flex-1">
                <main className="p-6">
                    {activeTab === 'overview' && (
                        <div className="space-y-6">
                            {/* Stats Cards */}
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                                {stats.map((stat, index) => (
                                    <div key={index} className="p-6 transition-shadow bg-white border border-gray-100 shadow-sm rounded-xl hover:shadow-md">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <p className="mb-2 text-sm text-gray-600">{stat.label}</p>
                                                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                                            </div>
                                            <div className={`${stat.color} p-3 rounded-lg`}>
                                                <stat.icon className="w-6 h-6 text-white" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Company Management Section */}
                            <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-xl">
                                {/* Header */}
                                <div className="p-6 border-b border-gray-200">
                                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                        <div>
                                            <h3 className="text-xl font-semibold text-gray-900">Company Management</h3>
                                            <p className="mt-1 text-sm text-gray-500">Manage and oversee all registered companies</p>
                                        </div>
                                        {/* <button className="flex items-center px-4 py-2 space-x-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700">
                                            <Plus className="w-5 h-5" />
                                            <span>Add Company</span>
                                        </button> */}
                                    </div>
                                </div>

                                {/* Search and Filter */}
                                <div className="p-6 border-b border-gray-200 bg-gray-50">
                                    <div className="flex flex-col gap-4 sm:flex-row">
                                        <div className="relative flex-1">
                                            <Search className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                                            <input
                                                type="text"
                                                placeholder="Search by company name, code or contact..."
                                                value={searchTerm}
                                                onChange={(e) => {
                                                    setSearchTerm(e.target.value);
                                                    setCurrentPage(1);
                                                }}
                                                className="w-full py-2 pl-10 pr-4 transition-colors border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        </div>
                                        <button className="flex items-center px-4 py-2 space-x-2 transition-colors border border-gray-300 rounded-lg hover:bg-gray-100">
                                            <Filter className="w-5 h-5 text-gray-600" />
                                            <span>Filter</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Table */}
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="border-b border-gray-200 bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Company</th>
                                                <th className="px-6 py-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Code</th>
                                                <th className="px-6 py-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Contact</th>
                                                <th className="px-6 py-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Status</th>
                                                <th className="px-6 py-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Date</th>
                                                <th className="px-6 py-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {paginatedCompanies.map((company: { id: Key | null | undefined; name: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; code: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; contact: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; status: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<AwaitedReactNode> | null | undefined; date: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; }) => (
                                                <tr key={company.id} className="transition-colors hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="flex items-center justify-center w-8 h-8 mr-3 bg-blue-100 rounded-lg">
                                                                <Building2 className="w-4 h-4 text-blue-600" />
                                                            </div>
                                                            <span className="text-sm font-medium text-gray-900">{company.name}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className="text-sm text-gray-600">{company.code}</span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className="text-sm text-gray-600">{company.contact}</span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                                                            company.status === 'Active' 
                                                                ? 'bg-green-100 text-green-800' 
                                                                : 'bg-red-100 text-red-800'
                                                        }`}>
                                                            {company.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className="text-sm text-gray-600">{company.date}</span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex space-x-2">
                                                            <button
                                                                onClick={() => handleEdit(company)}
                                                                className="p-2 text-blue-600 transition-colors rounded-lg hover:bg-blue-50"
                                                                title="View"
                                                            >
                                                                <Eye className="w-5 h-5" />
                                                            </button>
                                                            <button
                                                                onClick={() => handleEdit(company)}
                                                                className="p-2 text-green-600 transition-colors rounded-lg hover:bg-green-50"
                                                                title="Edit"
                                                            >
                                                                <Edit className="w-5 h-5" />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete(company.id)}
                                                                className="p-2 text-red-600 transition-colors rounded-lg hover:bg-red-50"
                                                                title="Delete"
                                                            >
                                                                <Trash2 className="w-5 h-5" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50">
                                        <div className="text-sm text-gray-600">
                                            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredCompanies.length)} of {filteredCompanies.length} entries
                                        </div>
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                                disabled={currentPage === 1}
                                                className="p-2 transition-colors border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                <ChevronLeft className="w-5 h-5" />
                                            </button>
                                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                                <button
                                                    key={page}
                                                    onClick={() => setCurrentPage(page)}
                                                    className={`px-3 py-1 rounded-lg transition-colors ${
                                                        currentPage === page
                                                            ? 'bg-blue-600 text-white'
                                                            : 'border border-gray-300 hover:bg-gray-100'
                                                    }`}
                                                >
                                                    {page}
                                                </button>
                                            ))}
                                            <button
                                                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                                disabled={currentPage === totalPages}
                                                className="p-2 transition-colors border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                <ChevronRight className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab !== 'overview' && (
                        <div className="p-12 text-center bg-white border border-gray-100 shadow-sm rounded-xl">
                            <p className="text-gray-600">Content for {activeTab} will be displayed here</p>
                        </div>
                    )}

                    {/* Edit Company Modal */}
                    <EditCompanyModal />
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;