// eslint-disable-next-line import/no-anonymous-default-export
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
  