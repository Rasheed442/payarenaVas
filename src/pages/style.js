export const styles = (theme) => ({
  faqPage: {
    marginTop: 50,
    marginBottom: 70,
    "& .faq-wrapper": {
      maxWidth: 960,
      margin: "auto",
      display: "flex",
      flexWrap: "wrap",
      "& > div": {
        flex: "0 0 50%",
        [theme.breakpoints.mdDown]: {
          flexBasis: "100%",
        },
      },
    },
  },
});
