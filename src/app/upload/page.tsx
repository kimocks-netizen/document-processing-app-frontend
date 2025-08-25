// src/app/upload/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Upload, FileText, ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function UploadPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    processingMethod: 'standard',
  });
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [touched, setTouched] = useState<{[key: string]: boolean}>({});
  const router = useRouter();

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    // First Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters';
    } else if (!/^[a-zA-Z\s]+$/.test(formData.firstName.trim())) {
      newErrors.firstName = 'First name can only contain letters and spaces';
    }

    // Last Name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters';
    } else if (!/^[a-zA-Z\s]+$/.test(formData.lastName.trim())) {
      newErrors.lastName = 'Last name can only contain letters and spaces';
    }

    // Date of Birth validation
    if (!formData.dob) {
      newErrors.dob = 'Date of birth is required';
    } else {
      const dobDate = new Date(formData.dob);
      const today = new Date();
      let age = today.getFullYear() - dobDate.getFullYear();
      const monthDiff = today.getMonth() - dobDate.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dobDate.getDate())) {
        age--;
      }
      
      if (age < 0) {
        newErrors.dob = 'Date of birth cannot be in the future';
      } else if (age > 120) {
        newErrors.dob = 'Please enter a valid date of birth';
      }
    }

    // File validation
    if (!file) {
      newErrors.file = 'Please select a file to upload';
    } else {
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
        newErrors.file = 'File size must be less than 10MB';
      }
      
      const allowedTypes = ['.pdf', '.jpg', '.jpeg', '.png'];
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
      if (!allowedTypes.includes(fileExtension)) {
        newErrors.file = 'Only PDF, JPG, JPEG, and PNG files are allowed';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      // Clear file error when user selects a file
      if (errors.file) {
        setErrors(prev => ({ ...prev, file: '' }));
      }
    }
  };

  const handleBlur = (fieldName: string) => {
    setTouched(prev => ({ ...prev, [fieldName]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsUploading(true);
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('file', file!);
      formDataToSend.append('firstName', formData.firstName.trim());
      formDataToSend.append('lastName', formData.lastName.trim());
      formDataToSend.append('dob', formData.dob);
      formDataToSend.append('processingMethod', formData.processingMethod);

      const response = await fetch('http://localhost:3001/api/upload', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        const result = await response.json();
        router.push(`/results/${result.jobId}`);
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Upload failed. Please try again.';
      setErrors({ submit: errorMessage });
    } finally {
      setIsUploading(false);
    }
  };

  const getFieldError = (fieldName: string) => {
    return touched[fieldName] && errors[fieldName];
  };

  const getFieldClassName = (fieldName: string) => {
    const baseClass = "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-white transition-colors duration-200";
    const errorClass = "border-red-500 focus:border-red-500";
    const normalClass = "border-gray-300 dark:border-gray-600 focus:border-red-500";
    
    return `${baseClass} ${getFieldError(fieldName) ? errorClass : normalClass}`;
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Document Upload</h1>
        <p className="text-gray-600 dark:text-gray-400">Process your documents with AI or standard extraction</p>
      </div>
      
      <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center justify-center">
            <Upload className="w-6 h-6 mr-2 text-red-600" />
            Upload Document
          </CardTitle>
          <CardDescription>
            Select your document and processing method to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur('firstName')}
                  required
                  className={getFieldClassName('firstName')}
                />
                {getFieldError('firstName') && <p className="text-red-500 text-xs mt-1">{getFieldError('firstName')}</p>}
              </div>
              
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur('lastName')}
                  required
                  className={getFieldClassName('lastName')}
                />
                {getFieldError('lastName') && <p className="text-red-500 text-xs mt-1">{getFieldError('lastName')}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="dob" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
                onBlur={() => handleBlur('dob')}
                required
                className={getFieldClassName('dob')}
              />
              {getFieldError('dob') && <p className="text-red-500 text-xs mt-1">{getFieldError('dob')}</p>}
            </div>

            <div>
              <label htmlFor="processingMethod" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Processing Method
              </label>
              <select
                id="processingMethod"
                name="processingMethod"
                value={formData.processingMethod}
                onChange={handleInputChange}
                onBlur={() => handleBlur('processingMethod')}
                className={getFieldClassName('processingMethod')}
              >
                <option value="standard">Standard Extraction</option>
                <option value="ai">AI Extraction</option>
              </select>
              {getFieldError('processingMethod') && <p className="text-red-500 text-xs mt-1">{getFieldError('processingMethod')}</p>}
            </div>

            <div>
              <label htmlFor="file" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Document File (PDF or Image)
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md hover:border-red-400 transition-colors duration-200">
                <div className="space-y-1 text-center">
                  {file ? (
                    <div className="flex items-center justify-center">
                      {file.type.includes('image') ? <ImageIcon className="w-8 h-8 mr-2 text-red-600" /> : <FileText className="w-8 h-8 mr-2 text-red-600" />}
                      <span className="text-sm text-gray-600 dark:text-gray-300">{file.name}</span>
                    </div>
                  ) : (
                    <>
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600 dark:text-gray-400">
                        <label
                          htmlFor="file"
                          className="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-red-600 hover:text-red-500 focus-within:outline-none"
                        >
                          <span>Upload a file</span>
                          <input
                            id="file"
                            name="file"
                            type="file"
                            className="sr-only"
                            onChange={handleFileChange}
                            onBlur={() => handleBlur('file')}
                            accept=".pdf,.jpg,.jpeg,.png"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">PDF, JPG, PNG up to 10MB</p>
                    </>
                  )}
                </div>
              </div>
              {getFieldError('file') && <p className="text-red-500 text-xs mt-1">{getFieldError('file')}</p>}
            </div>

            {errors.submit && <p className="text-red-500 text-xs mt-1">{errors.submit}</p>}

            <Button
              type="submit"
              disabled={isUploading}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 transform hover:scale-105 transition-all duration-200"
            >
              {isUploading ? 'Processing...' : 'Upload Document'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
