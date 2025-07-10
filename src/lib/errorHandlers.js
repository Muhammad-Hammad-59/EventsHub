import { NextResponse } from "next/server";


export function handleApiError(error, context = "API Error") {
    console.error(`${context} thsi is hammad:`, error);
  
    
    // Handle custom errors with specific status codes
    if (error.statusCode) {
        
      return NextResponse.json(
        { message: error.message,
          status: error.statusCode
         },
        { status: error.statusCode }
      );
    }
    
    // Handle validation errors from mongoose or joi
    if (error.name === 'ValidationError') {
       
      return NextResponse.json(
        { message: error.message },
        { status: 400 }
      );
    }
    
    // Handle JWT errors
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
        
      return NextResponse.json(
        { 
            message: 'Authentication failed. Please login again.',
            status: 401
         },
        { status: 401 }
      );
    }

    

    if (error.name === 'CustomError') {  
         
        return NextResponse.json(
          {
            success: false,
            message: error.message,  
            status: error.statusCode   
          },
          {
            status: error.statusCode
          }
           
        );
      }

    
    // Default error handler
     
    return NextResponse.json(
        
      { 
        message: "Internal Server Error", 
        error: error.message,
        status:500
     },
      { status: 500 }
    );
  }

