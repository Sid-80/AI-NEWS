const backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}`
export const getNewsPublicUrl = `${backendUrl}/news`
export const signupUrl = `${backendUrl}/api/v1/user/signup`
export const signinUrl = `${backendUrl}/api/v1/user/login`
export const logoutUrl = `${backendUrl}/api/v1/user/logout`
export const verifyOtpUrl = `${backendUrl}/api/v1/user/verify-otp`;
export const forgetPasswordUrl = `${backendUrl}/api/v1/user/forget-password`;

export const healthUrl = `${backendUrl}/api/v1/user/health`
