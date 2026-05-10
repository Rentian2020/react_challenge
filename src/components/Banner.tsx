import { signInWithGoogle, signOut, useAuthState } from '../utilities/firebase';

const styles = {
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "28px",
  },
  title: {
    fontSize: "26px",
    fontWeight: 600,
    color: "#111827",
    margin: 0,
    lineHeight: 1,
  },
  authBox: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginRight: "16px",
    marginTop: "20px"
  },
  welcome: {
    fontSize: "14px",
    color: "#6b7280",
  },
  signInButton: {
    padding: "7px 18px",
    borderRadius: 8,
    border: "1px solid #16a34a",
    background: "#16a34a",
    color: "#fff",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
  },
  signOutButton: {
    padding: "7px 18px",
    borderRadius: 8,
    border: "1px solid #d1d5db",
    background: "#fff",
    color: "#374151",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
  },
};

const Banner = ({ title }: { title: string }) => {
  const { user } = useAuthState();

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{title}</h1>
      <div style={styles.authBox}>
        <span style={styles.welcome}>
          Welcome, {user ? user.displayName : 'guest'}!
        </span>
        {user
          ? <button style={styles.signOutButton} onClick={signOut}>Sign Out</button>
          : <button style={styles.signInButton} onClick={signInWithGoogle}>Sign In</button>}
      </div>
    </div>
  );
};

export default Banner;