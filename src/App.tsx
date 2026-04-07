const schedule = {
  title: "CS Courses for 2018-2019"
};

const App = () => {
  return (
    <div style={styles.page}>
      <h1 style={styles.title}>{schedule.title}</h1>
    </div>
  );
};

const styles = {
  page: {
    padding: "40px",
    background: "#f8f9fb",
    minHeight: "100vh"
  },

  title: {
    fontSize: "2rem",
    fontWeight: "600",
    color: "#1a1a1a",
    borderBottom: "2px solid #e5e7eb",
    paddingBottom: "10px",
    margin: 0
  }
};

export default App;