export default {
    async redirects() {
      return [
        {
          source: "/",
          destination: "/usersList",
          permanent: true,
        },
      ];
    },
  };
  