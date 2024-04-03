import React, { useEffect, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Loader, Card, Form } from '../components';
const Home = () => {

  const RenderCard = ({ data, title }) => {
    if (data?.length > 0) {
      return data.map((post) => <Card key={post._id} {...post} />);
    }

    return (
      <h2 className="mt-5 font-bold text-black text-xl uppercase"> {/* Update className here */}
        {title}
      </h2>
    );
  };

  const [isLoading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchedResults, setSearchedResults] = useState(null);
  const [searchTimeout, setSearchTimeout] = useState(null);

  const fetchPosts = async () => {
    setLoading(true);

    try {
      const response = await fetch('https://shivai.onrender.com/api/v1/post', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        setAllPosts(result.data.reverse());
      }
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    //fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = allPosts.filter(
          (item) =>
            item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.prompt.toLowerCase().includes(searchText.toLowerCase())
        );
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div className="bg-[url('./assets/section.png')] bg-contain bg-no-repeat bg-center w-full h-[22rem]"></div>
      <div>
        <h1 className="mt-10 font-extrabold text-black text-2xl lg:text-5xl text-center max-w-1000px mx-auto"> {/* Update className here */}
          Explore the Wonders of SHIVAI
        </h1>
        <p className="mt-5 text-black text-2xl mx-auto text-center tracking-wider"> {/* Update className here */}
            Dive into a realm of creative wonder <br />
            with our curated showcase of SHIVAI-generated images
        </p>
        <div className='mt-10 flex justify-center'>

            <Link
            to="/create"
            className="font-inter text-xl font-medium bg-[#7C3AED] text-white px-12 py-4 rounded-lg shadow-xl hover:bg-[#5B21B6] transition duration-300"
            >
            Let's Create →
            </Link>
        </div >
        <p className="mt-6 text-black text-xl mx-auto text-center tracking-wider"> {/* Update className here */}
            Embark on a visual journey through our captivating gallery below!
        </p>
            
      </div>
      <div className="mt-16">
        <Form
          type="text"
          name="text"
          placeholder="Search something..."
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>
      <div className="mt-10">
        {isLoading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <Fragment>
            {searchText && (
              <h2 className="font-medium text-black text-xl mb-3"> {/* Update className here */}
                Showing results for:
                <span className="text-black ml-1">{searchText}</span> {/* Update className here */}
              </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
              {searchText ? (
                <RenderCard
                  data={searchedResults}
                  title="No search results found"
                />
              ) : (
                <RenderCard data={allPosts} title="No posts found" />
              )}
            </div>
          </Fragment>
        )}
      </div>
    </section>
  );
};

export default Home;
