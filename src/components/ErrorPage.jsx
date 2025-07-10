// components/ErrorPage.js
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const ErrorPage = ({ message = "Something went wrong.", onRetry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex items-center  justify-center h-screen bg-gradient-to-br from-white to-gray-50 px-4"
    >
      <div className="text-center max-w-md w-full bg-white shadow-lg border border-red-100 rounded-3xl p-8">
        <div className="flex justify-center mb-4">
          <ExclamationTriangleIcon className="h-12 w-12 text-accent" />
        </div>
        <h2 className="text-2xl font-bold text-accent mb-2">Oops! Something went wrong</h2>
        <p className="text-gray-600 mb-6">
          {message}
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center px-6 py-2 rounded-full bg-red-500 text-white font-medium shadow hover:bg-red-600 transition-colors"
          >
            Try Again
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default ErrorPage;


// // // components/ErrorPage.js
// import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
// import { motion } from 'framer-motion';

// const ErrorPage = ({ message = "Something went wrong.", onRetry }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, scale: 0.95 }}
//       animate={{ opacity: 1, scale: 1 }}
//       transition={{ duration: 0.3 }}
//       className="flex items-center justify-center h-screen bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-950 px-4"
//     >
//       <div className="text-center max-w-md w-full bg-white dark:bg-gray-900 shadow-2xl border border-gray-200 dark:border-gray-800 rounded-3xl p-8">
//         <div className="flex justify-center mb-4">
//           <ExclamationTriangleIcon className="h-12 w-12 text-red-500" />
//         </div>
//         <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Oops! An error occurred</h2>
//         <p className="text-gray-600 dark:text-gray-300 mb-6">
//           {message}
//         </p>
//         {onRetry && (
//           <button
//             onClick={onRetry}
//             className="inline-flex items-center px-6 py-2 rounded-full bg-red-500 text-white font-medium shadow hover:bg-red-600 transition-colors"
//           >
//             Try Again
//           </button>
//         )}
//       </div>
//     </motion.div>
//   );
// };

// export default ErrorPage;
