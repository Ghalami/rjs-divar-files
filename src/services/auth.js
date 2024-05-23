import api from "./../configs/api";

const sendOtp = async (mobile) => {
  try {
    const responce = await api.post("/auth/send-otp", { mobile });
    return { responce };
  } catch (error) {
    return { error };
  }
};

const checkOtp = async (mobile, code) => {
  try {
    const responce = await api.post("/auth/check-otp", { mobile, code });
    return { responce };
  } catch (error) {
    return { error };
  }
};

export { sendOtp, checkOtp };
