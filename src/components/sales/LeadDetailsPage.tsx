'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Edit, 
  Mail, 
  Phone, 
  MapPin, 
  Building, 
  Briefcase, 
  DollarSign,
  Calendar,
  Clock,
  User,
  FileText,
  Flag,
  CheckCircle,
  MessageCircle
} from 'lucide-react';

const LeadDetailsPage = () => {
  const { id } = useParams();

  const leadData = {
    id: 'LD0019',
    customerName: 'ABC Elevators PVT LTD',
    source: 'Website Source',
    status: 'New',
    statusColor: 'bg-blue-100 text-blue-700',
    assignedTo: 'John Doe',
    assignedToRole: 'Sales Executive',
    createdOn: '24 Apr 2026, 10:30 AM',
    lastActivity: '25 Apr 2026, 02:15 PM',
    details: {
      customerName: 'ABC Elevators Pvt Ltd',
      phone: '9876545678',
      email: 'abc@demo.com',
      company: 'ABC Pvt. Ltd.',
      source: 'Website',
      productInterest: 'Cranes',
      estimatedRequirement: '10 Ton Gantry Crane',
      expectedOrderValue: '₹3,50,000',
      status: 'New',
      priority: 'Medium',
      address: '123, industrial area, Phase 2, Noida, Uttar Pradesh 201301',
    },
    timeline: [
      {
        title: 'Lead Created',
        description: 'Lead created by John Doe',
        date: '24 Apr 2026, 10:30 AM',
        icon: Calendar,
      },
      {
        title: 'Assigned',
        description: 'Lead assigned to John Doe',
        date: '24 Apr 2026, 11:00 AM',
        icon: User,
      },
      {
        title: 'Follow up Done (Call)',
        description: 'Spoke with client, he is interested in the project',
        date: '24 Apr 2026, 12:45 PM',
        icon: Phone,
      },
      {
        title: 'Status Updated',
        description: 'Status changed from "Pending" to "In Progress"',
        date: '24 Apr 2026, 1:00 PM',
        icon: CheckCircle,
      },
    ],
    notes: 'Client is looking for passenger elevator for their new commercial building project. Budget is flexible. Need quick Proposal.',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6 lg:p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link
              href="/leads"
              className="p-2 transition-colors rounded-lg hover:bg-gray-100"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Link>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold text-gray-900">Lead Details</h1>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${leadData.statusColor}`}>
                  {leadData.status}
                </span>
              </div>
              <p className="mt-2 text-gray-600">View complete lead information and activities</p>
            </div>
          </div>
          <Link
            href={`/leads/edit/${id}`}
            className="flex items-center gap-2 px-4 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            <Edit className="w-4 h-4" />
            Edit Lead
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-xl">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="mb-1 text-sm text-gray-500">Lead ID</p>
                  <p className="text-2xl font-bold text-gray-900">{leadData.id}</p>
                  <p className="mt-2 text-lg font-semibold text-gray-800">{leadData.customerName}</p>
                  <p className="text-sm text-gray-500">{leadData.source}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="font-semibold text-gray-900">{leadData.assignedTo}</p>
                      <p className="text-xs text-gray-500">{leadData.assignedToRole}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>Created: {leadData.createdOn}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>Last Activity: {leadData.lastActivity}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-xl">
              <h2 className="flex items-center gap-2 mb-4 text-xl font-semibold text-gray-900">
                <FileText className="w-5 h-5 text-blue-600" />
                Lead Information
              </h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Customer Name</p>
                    <p className="font-medium text-gray-900">{leadData.details.customerName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <p className="text-gray-900">{leadData.details.phone}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <p className="text-gray-900">{leadData.details.email}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Company</p>
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-gray-400" />
                      <p className="text-gray-900">{leadData.details.company}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Source</p>
                    <p className="text-gray-900">{leadData.details.source}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Product Interest</p>
                    <p className="text-gray-900">{leadData.details.productInterest}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Estimated Requirement</p>
                    <p className="text-gray-900">{leadData.details.estimatedRequirement}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Expected Order Value</p>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-gray-400" />
                      <p className="font-semibold text-gray-900">{leadData.details.expectedOrderValue}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-4 mt-4 border-t border-gray-100">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${leadData.statusColor} mt-1`}>
                      {leadData.details.status}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Priority</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Flag className="w-4 h-4 text-yellow-500" />
                      <p className="text-gray-900">{leadData.details.priority}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <div className="flex items-start gap-2 mt-1">
                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                    <p className="text-gray-900">{leadData.details.address}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-xl">
              <h2 className="flex items-center gap-2 mb-4 text-xl font-semibold text-gray-900">
                <Clock className="w-5 h-5 text-blue-600" />
                Timeline
              </h2>
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                <div className="space-y-6">
                  {leadData.timeline.map((item, index) => (
                    <div key={index} className="relative flex gap-4">
                      <div className="relative z-10">
                        <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                          <item.icon className="w-4 h-4 text-blue-600" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{item.title}</h3>
                        <p className="mt-1 text-sm text-gray-600">{item.description}</p>
                        <p className="mt-1 text-xs text-gray-400">{item.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-xl">
              <h2 className="flex items-center gap-2 mb-4 text-xl font-semibold text-gray-900">
                <MessageCircle className="w-5 h-5 text-blue-600" />
                Notes
              </h2>
              <p className="leading-relaxed text-gray-700">{leadData.notes}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadDetailsPage;