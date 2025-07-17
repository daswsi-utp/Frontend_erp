'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/UserContext';
import { FormLogin } from './components/FormLogin';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const { loginUser } = useAuth(); 
  const router = useRouter();

  return (
    <>
      <div className='container relative grid h-svh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0'>
        <div className='relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex'>
          <div className='absolute inset-0 bg-zinc-900' />
          <div className='relative z-20 flex items-center text-lg font-medium'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='mr-2 h-6 w-6'
            >
              <path d='M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3' />
            </svg>
            ERP System
          </div>
          <img
            src='https://imgs.search.brave.com/7NrHstma7gnuEz0MRiMSR8Np6AHe-oT4xecXTkpGyek/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuc2Vla2xvZ28u/Y29tL2xvZ28tcG5n/LzI4LzIvZXJwLXJr/dnYtbG9nby1wbmdf/c2Vla2xvZ28tMjg3/NzM1LnBuZw'
            className='relative m-auto w-full'
            width={301}
            height={60}
            alt='Vite'
          />
          <div className='relative z-20 mt-auto'>
            <blockquote className='space-y-2'>
              <footer className='text-sm'>ERP System</footer>
            </blockquote>
          </div>
        </div>

        <div className='lg:p-8'>
          <div className='mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[350px]'>
            <div className='flex flex-col space-y-2 text-left'>
              <h1 className='text-2xl font-semibold tracking-tight'>Iniciar Sesión</h1>
              <p className='text-sm text-muted-foreground'>
                Ingrese su número de documento para acceder al panel de control.
              </p>
            </div>
            <FormLogin
              credentials={credentials}
              setCredentials={setCredentials}
              loginUser={loginUser}
            />

          </div>
        </div>
      </div>
    </>
  );
};

export default Login;