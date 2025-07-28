"use client";
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const Administra = () => {
    const router = useRouter();

    useEffect(() => {
      const token = Cookies.get('token'); // Ahora desde la cookie
      console.log("token en administra (cookie):", token);
      if (!token) {
        router.push('/login');
      }
    }, [router]);

    return (
      <main className="flex flex-row">
        ECOMMERCE DE DENGEL
      </main>
    );
};

export default Administra;
