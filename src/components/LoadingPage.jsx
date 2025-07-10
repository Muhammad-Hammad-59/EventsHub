// // components/LoadingPage.js
import { Spinner } from '@heroui/react';

const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-white to-gray-50 px-4">
      <div className="flex flex-col items-center gap-4 animate-fade-in">
        <Spinner
          classNames={{ label: "text-gray-600 mt-2 text-base" }}
          label="Loading..."
          variant="spinner"
          size="lg"
        />
        <p className="text-gray-600 text-lg font-medium">Please wait while we prepare everything...</p>
      </div>
    </div>
  );
};

export default LoadingPage;

 

// import { Spinner } from '@heroui/react';
// const LoadingPage = () => {
//   return (
//     <div className="flex items-center justify-center h-screen bg-white dark:bg-gray-900">
//       <div className="flex flex-col items-center space-y-4 animate-pulse">
//       <Spinner
//           classNames={{ label: "text-gray-600 mt-2 text-base" }}
//           label="Loading..."
//           variant="spinner"
//           size="lg"
//         />

        
//         <p className="text-gray-700 dark:text-gray-200 text-lg font-medium">Loading, please wait...</p>
//       </div>
//     </div>
//   );
// };

// export default LoadingPage;