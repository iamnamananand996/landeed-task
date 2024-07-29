'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import FormPage from '../components/FormPage';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const Form: React.FC = () => {
  const [config, setConfig] = useState<any>(null);
  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState({});
  const router = useRouter();

  useEffect(() => {
    axios.get(`${API_URL}/api/config`).then(response => {
      setConfig(response.data);
    });
  }, []);

  console.log('this page');

  useEffect(() => {
    if (config) {
      const timeout = setTimeout(() => {
        setPage(0);
        setFormData({});
      }, config.timeout * 60 * 1000);

      return () => clearTimeout(timeout);
    }
  }, [config]);

  if (!config) return <div>Loading...</div>;

  const handleSubmit = ({ formData }: any) => {
    if (page === config.pages.length - 1) {
      axios.post(`${API_URL}/api/submit`, formData).then(response => {
        console.log('response', response);

        // router.push('/success');
      });
    } else {
      setFormData({ ...formData, ...formData });
      setPage(page + 1);
    }
  };

  return (
    <div>
      <h1>{config.pages[page].title}</h1>
      <FormPage
        schema={config.pages[page]}
        onSubmit={handleSubmit}
        formData={formData}
      />
    </div>
  );
};

export default Form;
