import api from "../configs/api";
import { getCookie } from "../utils/cookie";

const getNewTokens = async () => {
  const refreshToken = getCookie("refreshToken");
  if (!refreshToken) return;
  try {
    const responce = await api.post("/auth/check-refresh-token", {
      refreshToken,
    });
    return { responce };
  } catch (error) {
    return { error };
  }
};

export { getNewTokens };
