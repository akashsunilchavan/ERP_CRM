export interface StoredFile {
  fileId: string;
  fileName: string;
}

export interface Folder {
  folderId: string;
  folderName: string;
  files: StoredFile[];
  subfolders?: Folder[];
}

export interface RequiredDocument {
  documentId: string;
  documentName: string;
}

export interface Deadline {
  date: string;
  description: string;
  amountDue: string | null;
  paymentStatus: string | null;
  lateFee: string | null;
  requiredDocument: string | null;
}

export interface FilingStatus {
  status: "Pending" | "Approved";
  dueDate: string;
  remarks?: string;
}

export interface Company {
  companyId: string;
  companyName: string;
}

export interface CompanyData extends Company {
  requiredDocuments: RequiredDocument[];
  deadlines: Deadline[];
  folders: Folder[];
  filingStatus: FilingStatus[];
}

export const companyData: CompanyData[] = [
  {
    companyId: "compA",
    companyName: "Tech Innovations Inc.",
    requiredDocuments: [
      { documentId: "doc2A", documentName: "Tax Return.docx" },
      { documentId: "doc1B", documentName: "Marketing Budget.csv" },
      { documentId: "doc2B", documentName: "Client Contracts.pdf" },
      { documentId: "doc1B", documentName: "Marketing Budget.csv" },
      { documentId: "doc2B", documentName: "Client Contracts.pdf" },
      { documentId: "doc2B", documentName: "Client Contracts.pdf" },
    ],
    deadlines: [
      { date: "2025-03-15", description: "Deadline", amountDue: "$1,200", paymentStatus: "Pending", lateFee: "$50", requiredDocument: "Bookkeeping Report.pdf" },
      { date: "2025-04-01", description: "Deadline", amountDue: "$3,500", paymentStatus: "Paid", lateFee: null, requiredDocument: null },
    ],
    filingStatus: [
      { status: "Pending", dueDate: "2025-03-15", remarks: "Awaiting payment" },
      { status: "Approved", dueDate: "2025-04-01", remarks: "Confirmed and processed" }
    ],
    folders: [
      { 
        folderId: "fA1", 
        folderName: "VAT Filing", 
        files: [
          { fileId: "fileA4", fileName: "result_2024.pdf" },
          { fileId: "fileA1", fileName: "vat_2024.pdf" },
          { fileId: "fileA2", fileName: "tax_report2024.pdf" },
          { fileId: "fileA3", fileName: "refund_2024.pdf" }
        ],
        subfolders: [
          {
            folderId: "subfA1-1",
            folderName: "Subfolder Example",
            files: [{ fileId: "subfileA1", fileName: "subfile_example.pdf" }],
            subfolders: [
              {
                folderId: "subfA1-1-1",
                folderName: "Nested Subfolder 1",
                files: [{ fileId: "subfileA1-1", fileName: "deep_nested_file.pdf" }]
              }
            ]
          }
        ]
      },
      { 
        folderId: "fA2", 
        folderName: "Corporate Tax Filing", 
        files: [
          { fileId: "fileA1", fileName: "result_2024.pdf" },
          { fileId: "fileA21", fileName: "vat_2024.pdf" },
          { fileId: "fileA31", fileName: "tax_report2024.pdf" },
          { fileId: "fileA51", fileName: "refund_2024.pdf" }
        ],
        subfolders: [
          {
            folderId: "subfA2-1",
            folderName: "Q1 Reports",
            files: [{ fileId: "q1_tax", fileName: "q1_tax_report.pdf" }]
          }
        ]
      },
      { 
        folderId: "fA3", 
        folderName: "Accounting & Bookkeeping", 
        files: [{ fileId: "fileA3", fileName: "ledger.xlsx" }],
        subfolders: [
          {
            folderId: "subfA3-1",
            folderName: "Invoices",
            files: [{ fileId: "inv_2024", fileName: "invoice_list.pdf" }]
          }
        ]
      },
    ],
  },
  {
    companyId: "compB",
    companyName: "Global Marketing Solutions",
    requiredDocuments: [
      { documentId: "doc1B", documentName: "Marketing Budget.csv" },
      { documentId: "doc2B", documentName: "Client Contracts.pdf" },
      { documentId: "doc1B", documentName: "Marketing Budget.csv" },
      { documentId: "doc2B", documentName: "Client Contracts.pdf" },
      { documentId: "doc1B", documentName: "Marketing Budget.csv" },
      { documentId: "doc2B", documentName: "Client Contracts.pdf" },
    ],
    deadlines: [
      { date: "2025-06-10", description: "Deadline", amountDue: "$800", paymentStatus: "Pending", lateFee: null, requiredDocument: "Advertising Invoice.pdf" },
    ],
    filingStatus: [
      { status: "Pending", dueDate: "2025-06-10", remarks: "Awaiting confirmation" },
      { status: "Approved", dueDate: "2025-05-12", remarks: "Payment received" },
    ],
    folders: [
      { 
        folderId: "fB1", 
        folderName: "VAT Filing", 
        files: [{ fileId: "fileB1", fileName: "marketing_vat.pdf" }],
        subfolders: [
          {
            folderId: "subfB1-1",
            folderName: "Reports",
            files: [{ fileId: "fileB1-1", fileName: "q2_report.pdf" }]
          }
        ]
      },
      { folderId: "fB2", folderName: "Corporate Tax Filing", files: [{ fileId: "fileB2", fileName: "q1_tax.docx" }] },
      { folderId: "fB3", folderName: "Accounting & Bookkeeping", files: [{ fileId: "fileB3", fileName: "accounts_2024.xlsx" }] },
    ],
  }
];
