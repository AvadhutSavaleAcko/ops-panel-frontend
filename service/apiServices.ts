import axios from "axios";

export let headers: any = {
  "Content-Type": "application/json",
  Accept: "application/json",
  "Accept-Language": "en-US",
  "Cache-Control": "no-cache",
  "x-journey-version": "v3"
};

const fetchConfig = (payload: any) => {
  // const url = "http://localhost:3001/sdui/api/v1/next-node";
  // const url = "http://10.210.38.77:3000/sdui/api/v1/next-node";
  const url = `${process.env.SDUI_API_SERVICE}/next-node`;
  // const url = "https://auto-buy-sdui-service-uat.internal.ackodev.com/sdui/api/v1/next-node";
  return new Promise((resolve, reject) => {
    axios
      .post(url, payload, { headers: headers, withCredentials: true })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const sendOTPApi = (payload: any) => {
  const { token, ...restPayload } = payload;
  const url = `${process.env.SDUI_API_SERVICE}/send-otp`;
  // const url = "http://localhost:3001/sdui/api/v1/send-otp";
  // const url = "http://10.210.39.223:3000/sdui/api/v1/next-node"
  // const url = "https://auto-buy-sdui-service-uat.internal.ackodev.com/sdui/api/v1/next-node";
  const apiPayload = {
    journey: "ops_panel",
    data: {
      ...restPayload
    }
  };

  headers = {
    "x-captcha-token": token,
    ...headers
  };

  return new Promise((resolve, reject) => {
    axios
      .post(url, apiPayload, { withCredentials: true, headers: headers })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const sendOtpMOApi = (payload) => {
  // custom cookie setting
  document.cookie = "sendotp=true; path=/";
  const url = `${process.env.HOST_URL}/motororchestrator/api/v2/send-otp`;
  const { token, ...restPayload } = payload;
  // const url = `${process.env.SDUI_API_SERVICE}/send-otp`;
  // const url = "http://localhost:3001/sdui/api/v1/send-otp";
  // const url = "http://10.210.39.223:3000/sdui/api/v1/next-node"
  // const url = "https://auto-buy-sdui-service-uat.internal.ackodev.com/sdui/api/v1/next-node";
  // const apiPayload = {
  //   phone: restPayload?.phone,
  // };

  headers = {
    ...headers,
    "x-captcha-token": token
  };

  console.log({ headers });

  return new Promise((resolve, reject) => {
    axios
      .post(url, restPayload, { headers: headers, withCredentials: true })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const verifyOtpMoApi = (payload) => {
  const url = `${process.env.HOST_URL}/motororchestrator/api/v2/verify-otp`;
  // const url = `${process.env.SDUI_API_SERVICE}/send-otp`;
  // const url = "http://localhost:3001/sdui/api/v1/send-otp";
  // const url = "http://10.210.39.223:3000/sdui/api/v1/next-node"
  // const url = "https://auto-buy-sdui-service-uat.internal.ackodev.com/sdui/api/v1/next-node";

  return new Promise((resolve, reject) => {
    axios
      .post(url, payload, { withCredentials: true, headers: headers })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const sendR2D2Api = (payload: any) => {
  const url = `${process.env.HOST_URL}/api/r2d2/`;
  return new Promise((resolve, reject) => {
    axios
      .post(url, payload, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log({ error });
        //suppress axios network error in local and dev
        if (
          error?.code === "ERR_NETWORK" &&
          process.env.ENVIRONMENT?.toLowerCase() !== "production"
        ) {
          resolve(null);
        }
        reject(error);
      });
  });
};

export const consolelog = (log) => {
  return fetch("/api/falcon/log", {
    method: "POST",
    body: JSON.stringify({ log }),
    headers: {
      "Content-Type": "application/json"
    }
  });
};

// marking this as readinly api
const checkoutApi = async (proposalEkey) => {
  const url = `${process.env.SDUI_API_SERVICE}/checkout`;
  const bodyData = {
    data: {
      proposal_ekey: proposalEkey
    }
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bodyData)
    });

    if (!response.ok) {
      throw new Error(`Error in checkout API`);
    }

    const result = await response.json();
    console.log("Response:", result);
    return result;
  } catch (error) {
    console.error(error);
  }
};

const fetchChallan = async (payload) => {
  const { registration_number } = payload;

  try {
    const response = await fetch(
      `${process.env.HOST_URL}/vas/api/v1/challans/?registration-number=${registration_number}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          cookie: document.cookie
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Error in challan API`);
    }
    const result = await response.json();

    return result;
  } catch (error) {
    console.log("^^^^^ result", { error });
    console.error(error);
  }
};

const fetchWinbackChallanCoupon = async (payload) => {
  const { registration_number, phone } = payload;

  const url = `${process.env.HOST_URL}/motororchestrator/api/v1/proposals/challan?registration_number=${registration_number}&phone=${phone}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`Error in challan API`);
    }
    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
  }
};

export {
  fetchConfig,
  sendOTPApi,
  sendOtpMOApi,
  verifyOtpMoApi,
  sendR2D2Api,
  checkoutApi,
  fetchChallan,
  fetchWinbackChallanCoupon
};
