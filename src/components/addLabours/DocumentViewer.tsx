import { Button, Modal, Text, Image } from '@mantine/core';
import { FileText } from 'lucide-react';
import { useState } from 'react';

interface DocumentViewerProps {
    documents: any[];
    isOpen: boolean;
    onClose: () => void;
}

export const DocumentViewer = ({ documents, isOpen, onClose }: DocumentViewerProps) => {
    const [selectedDoc, setSelectedDoc] = useState<any>(null);

    return (
        <Modal opened={isOpen} onClose={onClose} title="View Documents" size="lg" centered>
            <div className="space-y-4">
                {/* Document List */}
                <div className="max-h-60 overflow-y-auto">
                    {documents.map((doc, index) => (
                        <div
                            key={doc.id}
                            className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-50 ${
                                selectedDoc?.id === doc.id ? 'bg-blue-50 border-blue-200' : 'border-gray-200'
                            }`}
                            onClick={() => setSelectedDoc(doc)}
                        >
                            <div className="flex items-center gap-3">
                                <FileText size={20} className="text-blue-600" />
                                <div>
                                    <Text size="sm" fw={500}>
                                        {doc.document_original_name}
                                    </Text>
                                    <Text size="xs" c="dimmed">
                                        {(doc.document_size / 1024).toFixed(2)} KB
                                    </Text>
                                </div>
                            </div>
                            <Button
                                size="xs"
                                variant="light"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    window.open(doc.document_full_url, '_blank');
                                }}
                            >
                                Open
                            </Button>
                        </div>
                    ))}
                </div>

                {/* Document Preview */}
                {selectedDoc && (
                    <div className="border rounded-lg p-4">
                        <Text size="sm" fw={500} mb="sm">
                            Preview
                        </Text>
                        {selectedDoc.document_full_url.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                            <div className="flex justify-center">
                                <Image src={selectedDoc.document_full_url} alt={selectedDoc.document_original_name} className="max-h-64 object-contain" />
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <FileText size={48} className="text-gray-400 mx-auto mb-2" />
                                <Text c="dimmed">Preview not available for this file type</Text>
                                <Button variant="light" color="blue" mt="md" onClick={() => window.open(selectedDoc.document_full_url, '_blank')}>
                                    Download File
                                </Button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </Modal>
    );
};
