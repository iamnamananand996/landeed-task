'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import FormPage from '../../components/FormPage';

const Form: React.FC = () => {
  const [config, setConfig] = useState<any>(null);
  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState({});
  const router = useRouter();

  useEffect(() => {
    axios.get('/api/config').then(response => {
      setConfig(response.data);
    });
  }, []);

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
      axios.post('/api/submit', formData).then(() => {
        router.push('/success');
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
