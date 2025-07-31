'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-navy-50 via-white to-patriot-50 px-4">
      <div className="max-w-2xl w-full text-center">
        <motion.div
          initial={prefersReducedMotion ? {} : { scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={prefersReducedMotion ? {} : { duration: 0.3 }}
        >
          {/* Error Icon */}
          <div className="mb-8 flex justify-center">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-12 h-12 text-red-600" aria-hidden="true" />
            </div>
          </div>

          {/* Error Message */}
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-navy mb-4">
            Something went wrong!
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-lg mx-auto">
            We apologize for the inconvenience. An unexpected error has occurred. 
            Please try refreshing the page or return to the homepage.
          </p>

          {/* Error Details (Development Only) */}
          {process.env.NODE_ENV === 'development' && (
            <details className="mb-8 text-left max-w-lg mx-auto">
              <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700 transition-colors">
                Error details (Development only)
              </summary>
              <pre className="mt-4 p-4 bg-gray-100 rounded-lg text-xs overflow-auto">
                {error.message}
                {error.stack && (
                  <>
                    {'\n\n'}
                    {error.stack}
                  </>
                )}
              </pre>
            </details>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center" role="group" aria-label="Error recovery actions">
            <Button
              onClick={reset}
              className="bg-patriot hover:bg-patriot-dark text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 focus:ring-2 focus:ring-offset-2 focus:ring-patriot"
              aria-label="Try again and refresh the page"
            >
              <RefreshCw className="w-5 h-5" aria-hidden="true" />
              Try Again
            </Button>
            
            <Link href="/" passHref legacyBehavior>
              <Button
                variant="outline"
                className="border-2 border-navy text-navy hover:bg-navy hover:text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 focus:ring-2 focus:ring-offset-2 focus:ring-navy"
                aria-label="Return to homepage"
              >
                <Home className="w-5 h-5" aria-hidden="true" />
                Go to Homepage
              </Button>
            </Link>
          </div>

          {/* Support Information */}
          <div className="mt-12 p-6 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              If this problem persists, please contact our support team at{' '}
              <a 
                href="mailto:support@americanfaithacademy.org" 
                className="text-patriot hover:text-patriot-dark underline focus:ring-2 focus:ring-offset-2 focus:ring-patriot rounded"
              >
                support@americanfaithacademy.org
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}