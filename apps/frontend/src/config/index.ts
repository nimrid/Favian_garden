// export const BASE_BACKEND_URL =
//   process.env.NODE_ENV === 'production'
//     ? process.env.BASE_BACKEND_URL
//     : 'http://localhost:4000';

export const BASE_BACKEND_URL = 'https://favian-garden.onrender.com';

export const config = {
  BASE_BACKEND_URL: BASE_BACKEND_URL,
  GENERATE_IMAGE: `${BASE_BACKEND_URL}/api/v1/image/generate`,
  MINT: `${BASE_BACKEND_URL}/api/v1/nfts/mint`,
  MARKETPLACE: `${BASE_BACKEND_URL}/api/v1/nfts/list`,
  PURCHASE: `${BASE_BACKEND_URL}/api/v1/nfts/purchase`,
  RECENT: `${BASE_BACKEND_URL}/api/v1/nfts/recent`,
  IMAGES: `${BASE_BACKEND_URL}/api/v1/nfts/image`,
  CONFIRM: `${BASE_BACKEND_URL}/api/v1/nfts/confirm-purchase`,
  UPDATE: `${BASE_BACKEND_URL}/api/v1/nfts/update-nft-status`
};
