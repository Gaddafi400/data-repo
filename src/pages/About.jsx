import { Link } from 'react-router-dom';
import profile from '../assets/profile.png';

const About = () => {
  return (
    <section className="text-gray-600 body-font about-us align-element">
      <div className="container mx-auto flex  py-24 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
            Welcome to Our Story
          </h1>
          <p className="mb-8 leading-relaxed text-lg">
            At Steady Variables, we are passionate about leveraging the
            transformative power of data. Our journey began with a simple idea:
            to provide accurate and reliable data solutions to the world. Today,
            we continue to pursue our mission and are proud to be your dedicated
            partner in the realm of IT Services and IT Consulting Specialties.
          </p>
          <p className="mb-8 leading-relaxed text-lg">
            The 21st century demands precise data to inform government programs,
            shape policies, drive business decisions, and gain profound insights
            into human conditions, behaviors, customer trends, and
            opportunities. Steady Variables is the answer to this demand,
            offering an array of services from data capturing to data analysis
            and data security.
          </p>
          <p className="mb-8 leading-relaxed text-lg">
            Steady Variables is more than an IT service provider; we are
            dedicated problem solvers who produce high-quality results
            accurately, quickly, and within budget. With our expertise in Data
            Solutions, Business Intelligence, and Data Science, we aim to
            catalyze positive change, regardless of your industry.
          </p>
          <p className="mb-8 leading-relaxed text-lg">
            Your data is our specialty, and we appreciate your trust in us as
            your data-driven partner. Join us in this data-driven journey toward
            a better future.
          </p>
          <div className="flex justify-center">
            <Link
              to="/contact"
              className="inline-flex text-white bg-primary-500 border-0 py-2 px-6 focus:outline-none hover-bg-primary-dark rounded text-lg"
            >
              Contact Us
            </Link>
          </div>
        </div>
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
          <img
            className="object-cover object-center rounded"
            alt="company"
            src={profile}
          />
        </div>
      </div>
    </section>
  );
};

export default About;
