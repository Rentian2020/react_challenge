const styles = {
  title: {
    fontSize: "26px",
    fontWeight: 600,
    marginBottom: "28px",
    color: "#111827",
  },
};

const Banner = ({ title }: { title: string }) => (
  <h1 style={styles.title}>{title}</h1>
);

export default Banner;