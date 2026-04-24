import Banner from './components/Banner';
import TermPage from './components/TermPage';
import { useJsonQuery } from './utilities/fetch';

const URL = "https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php";

type Course = {
  term: string;
  number: string;
  meets: string;
  title: string;
};

type Schedule = {
  title: string;
  courses: Record<string, Course>;
};


const App = () => {
  const [json, isLoading, error] = useJsonQuery(URL);

  if (error) return <h1>Error loading schedule: {`${error}`}</h1>;
  if (isLoading) return <h1>Loading schedule...</h1>;
  if (!json) return <h1>No schedule data found</h1>;

  const schedule = json as Schedule;

  return (
    <div>
      <Banner title={schedule.title} />
      <TermPage courses={schedule.courses} />
    </div>
  );
};

export default App;

