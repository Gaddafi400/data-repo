import { redirect, Form } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Card, SectionTitle, Portfolio, Carousel, Finder } from '../components';
import location from '../assets/location.png';
import people from '../assets/people.png';
import btnarrow from '../assets/btnarrow.png';
import finder from '../assets/finder.png';
import { customFetch } from '../utils';
import { useGlobalContext } from '../context';

// eslint-disable-next-line react-refresh/only-export-components
export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const url = '/guest/newsletter';

  try {
    const response = await customFetch.post(url, data);

    if (response.data?.responseCode === 201) {
      toast.success('Thank you for subscribing!');
    } else {
      toast.error('Failed to subscribe. Please try again later.');
    }
    return redirect('/');
  } catch (error) {
    if (error.response.status === 400) {
      toast.error(error.response.data?.data[0]);
    } else {
      toast.error(error.message);
    }
    return error;
  }
};

const Landing = () => {
  const { knowledge } = useGlobalContext();

  return (
    <div>
      <section className="first-section">
        <div className="px-4">
          <Card
            title="Data Repository"
            imageUrl={location}
            description="
        Our platform serves as a comprehensive data repository where users 
        can easily access a wealth of valuable information on topics 
        ranging from the economy and the environment to education and more."
          />
        </div>
      </section>

      <section className="second-section">
        <div className="px-4">
          <Finder
            title="Market Finder"
            imageUrl={finder}
            description="
            Our platform serves as a comprehensive data repository 
            where users can easily access a wealth of valuable information 
            on topics ranging from the economy and the environment to 
            education and more. "
            position="right"
          />
          <SectionTitle
            title="Uncommon Knowledge"
            subtitle="Collect vital data and thought-provoking insights into meaningful subjects."
          />
        </div>
      </section>

      <section className="third-section">
        <Carousel data={knowledge} />
      </section>

      <section className="fourth-section">
        <div className="px-4">
          <h1 className="text-slate-800 font-semibold text-center text-3xl sm:text-4xl">
            Stay updated with Data Insights
          </h1>

          <Form className="flex align-element" method="POST">
            <input
              type="email"
              placeholder="Email address"
              name="email"
              id="email"
              required
              className="bg-gray-50 border border-primary-300 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full"
            />

            <button type="submit" className="text-white ">
              subscribe now
            </button>
          </Form>
          <Portfolio />
        </div>
      </section>

      <section className="fifth-section">
        <div className="xl:rounded-[35px] rounded-[25px] last-card">
          <div className="last-card-content">
            <p className="text-white font-semibold">
              Your Reliable Platform For Seamless Search
            </p>

            <div
              className="bg-white cursor-pointer button"
              onClick={(e) => {
                e.preventDefault();
                const targetElement = document.getElementById('hero');
                const { top, left } = targetElement.getBoundingClientRect(); //get position on screen
                window.scrollTo({
                  top: top + window.scrollY,
                  left: left + window.scrollX,
                  behavior: 'smooth',
                });
              }}
            >
              <span className="text-slate-800 font-base">Start Now</span>
              <div className="w-[25px] h-[25px] bg-primary-600 rounded-full">
                <img
                  src={btnarrow}
                  alt="btnarrow"
                  className="object-cover w-[20] h-[20]"
                />
              </div>
            </div>
          </div>
          <img src={people} alt="people" className="object-cover people" />
        </div>
      </section>
    </div>
  );
};

export default Landing;
