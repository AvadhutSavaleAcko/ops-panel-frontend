import React, { useEffect } from "react";
import Error from "@components/Error";

function ErrorPage({ error }: any) {
  useEffect(() => {
    const clientError = error || "Client Side Error occurred";

    // Log the error to New Relic
    if (window?.newrelic) {
      window.newrelic.noticeError(clientError, {
        name: "Client Side Error"
      });
    }
  }, [error]);

  return <Error />;
}

export default ErrorPage;
