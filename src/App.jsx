import { useEffect, useState } from 'react';
import './App.css';
import TanstackTable from './TanstackTable';
import { CSVLink } from 'react-csv';
function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('lord of the rings');
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);
  const [searchTriggered, setSearchTriggered] = useState(true);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  useEffect(() => {
    if (!searchTriggered && searchQuery === debouncedQuery) return;

    setLoading(true);
    fetch(`https://openlibrary.org/search.json?q=${debouncedQuery}`)
      .then((res) => res.json())
      .then((data) => {
        const result = data.docs.map((book) => ({
          ...book,
          author_name: book.author_name ? book.author_name[0] : '-',
          author_birth_date: book.author_birth_date || '-',
          author_top_work: book.author_key ? book.author_key[0] : '-',
          subject: book.subject ? book.subject[0] : '-',
          ratings_average: book.ratings_average || '-',
        }));
        setData(result);
        setLoading(false);
        setSearchTriggered(false);
      })
      .catch(() => {
        setLoading(false);
        setSearchTriggered(false);
      });
  }, [debouncedQuery, searchTriggered]);

  const handleSearch = () => {
    setSearchTriggered(true);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  if (loading) {
    return (
      <div
        style={{ textAlign: 'center', marginTop: '15rem', fontSize: '1.5rem' }}
      >
        Loading data...
      </div>
    );
  }

  return (
    <>
      <div className="App">
        <input
          className="input"
          type="text"
          placeholder="Search by Author"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSearch}>Search</button>
        <div style={{ margin: '10px 0' }}>
          <CSVLink
            data={data}
            headers={[
              { label: 'Ratings Average', key: 'ratings_average' },
              { label: 'Author Name', key: 'author_name' },
              { label: 'Title', key: 'title' },
              { label: 'First Publish Year', key: 'first_publish_year' },
              { label: 'Subject', key: 'subject' },
              { label: 'Author Birth Date', key: 'author_birth_date' },
              { label: 'Author Top Work', key: 'author_top_work' },
            ]}
            filename="books.csv"
            className="btn btn-primary"
            target="_blank"
          >
            Download CSV
          </CSVLink>
        </div>

        {data.length > 0 ? (
          <TanstackTable data={data} />
        ) : (
          <div
            style={{
              textAlign: 'center',
              marginTop: '2rem',
              fontSize: '1.5rem',
            }}
          >
            No data found with given search
          </div>
        )}
      </div>
    </>
  );
}

export default App;
