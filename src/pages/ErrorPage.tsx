import React from "react";
import ErrorDisplay from "@/components/ui/ErrorDisplay";

const ErrorPage = () => {
  return (
    <ErrorDisplay 
      code="404"
      title="Lost in the Archive"
      message="The masterpiece you are seeking is currently unavailable or has been relocated to our private collection."
      showHome={true}
      showBack={true}
    />
  );
};

export default ErrorPage;
